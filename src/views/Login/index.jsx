import { useEffect, useState } from "react";
import { Form, Input, Toast } from "antd-mobile";
import { connect } from "react-redux";
import "./index.less";
import NavBarAgain from "@/components/NavBarAgain";
import ButtonAgain from "@/components/ButtonAgain";
import { validatePhone, validateCode } from "@/assets/utils/validate";
import { sendPhoneCode, login } from "@/api";
import action from "@/store/action";
const Login = function Login(props) {
  const { navigate, location, usp, queryUserInfoAsync } = props;
  const [formIns] = Form.useForm();
  const [sendText, setSendText] = useState("发送验证码");
  const [disabled, setDisabled] = useState(false);
  let timer;
  let num = 31;
  const countDown = () => {
    num--;
    if (+num === 0) {
      setSendText("重发送验证码");
      setDisabled(false);
      timer && clearInterval(timer);
      timer = null;
      return;
    }
    setSendText(`${num}秒后重试`);
  };
  const send = async () => {
    try {
      await formIns.validateFields(["phone"]);
      let { phone } = formIns.getFieldValue();
      try {
        let { code } = await sendPhoneCode(phone);
        if (+code === 0) {
          Toast.show({
            icon: "success",
            content: "验证码发送成功！",
          });
        } else {
          Toast.show({
            icon: "fail",
            content: "验证码发送失败！",
          });
        }
        setDisabled(true);
        countDown();
        if (!timer) {
          timer = setInterval(countDown, 1000);
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    return () => {
      timer && clearInterval(timer);
      timer = null;
    };
  }, []);
  const submit = async () => {
    await formIns.validateFields(["phone", "code"]);
    const { phone, code } = formIns.getFieldsValue();
    try {
      let { code: httpCode, data, msg } = await login(phone, code);
      if (+httpCode !== 0) {
        Toast.show({
          icon: "fail",
          content: msg,
        });
        formIns.resetFields(["code"]);
        return;
      }
      let { token, type = "" } = data;
      localStorage.setItem("tk", token);
      await queryUserInfoAsync(); //派发任务，同步状态信息
      Toast.show({
        icon: "success",
        content: type === 2 ? "登录成功！" : "注册成功！",
      });
      let to = usp.get("to");
      to ? navigate(to, { replace: true }) : navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login">
      <NavBarAgain title="登录/注册" />
      <Form
        layout="horizontal"
        mode="card"
        form={formIns}
        style={{ "--border-top": "none" }}
        initialValues={{
          phone: "",
          code: "",
        }}
        footer={
          <ButtonAgain block color="primary" size="middle" onClick={submit}>
            提交
          </ButtonAgain>
        }
      >
        <Form.Item
          name="phone"
          label="手机号"
          rules={[{ validator: validatePhone }]}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item
          name="code"
          label="验证码"
          rules={[{ validator: validateCode }]}
          extra={
            <ButtonAgain
              size="small"
              color="primary"
              disabled={disabled}
              onClick={send}
            >
              {sendText}
            </ButtonAgain>
          }
        >
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default connect(null, action.base)(Login);
