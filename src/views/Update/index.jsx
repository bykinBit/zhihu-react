import { ImageUploader, Input, Toast } from "antd-mobile";
import "./index.less";
import { useState } from "react";
import { connect } from "react-redux";
import action from "@/store/action";
import ButtonAgain from "@/components/ButtonAgain";
import NavBarAgain from "@/components/NavBarAgain";
import { uploadImage, updateProfile } from "@/api";
function Update(props) {
  const { info, queryUserInfoAsync, navigate } = props;
  const [username, setUsername] = useState(info.name);
  const [fileList, setFileList] = useState([
    {
      url: info.avatar,
    },
  ]);
  const limitUpload = (file) => {
    if (file.size > 3 * 1024 * 1024) {
      Toast.show({ icon: "fail", content: "请选择小于 3M 的图片" });
      return null;
    }
    return file;
  };
  const uploadImg = async (file) => {
    try {
      let { code, data } = await uploadImage(file);
      if (+code !== 0) {
        Toast.show({
          icon: "fail",
          connect: "图片上传失败！",
        });
        return;
      }
      Toast.show("图片上传成功！");
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const submit = async () => {
    let avatar = fileList[0].url;
    if (!avatar) Toast.show("请上传图片！");
    if (!username) Toast.show("请输入昵称！");
    try {
      let { code } = await updateProfile(username, avatar);
      if (+code) {
        Toast.show({
          icon: "fail",
          connect: "更新信息失败！",
        });
        return;
      }
      Toast.show("更新信息成功！");
      navigate(-1);
      queryUserInfoAsync();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="update-box">
      <NavBarAgain title="修改资料" />
      <div className="form-box">
        <div className="item">
          <div className="label">头像</div>
          <ImageUploader
            accept="image/*"
            maxCount={1}
            value={fileList}
            beforeUpload={limitUpload}
            upload={uploadImg}
            onChange={setFileList}
          />
        </div>
        <div className="item">
          <div className="label">姓名</div>
          <div className="input">
            <Input
              value={username}
              onChange={(val) => setUsername(val)}
              placeholder="请输入昵称"
            />
          </div>
        </div>
        <div className="sumbit-box">
          <ButtonAgain color="primary" className="submit" onClick={submit}>
            提交
          </ButtonAgain>
        </div>
      </div>
    </div>
  );
}
export default connect((state) => state.base, action.base)(Update);
