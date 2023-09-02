import { connect } from "react-redux";
import action from "@/store/action";
import NavBarAgain from "@/components/NavBarAgain";
import "./index.less";
import { Link } from "react-router-dom";
import { RightOutline } from "antd-mobile-icons";
import { Toast } from "antd-mobile";
function Personal(props) {
  const { info, clearUserInfo, clearStoreList, navigate } = props;
  const signOut = () => {
    clearUserInfo();
    clearStoreList();
    localStorage.clear();
    Toast.show({
      icon: "success",
      content: "您已安全退出！",
    });
    navigate("/login?to=/personal", { replace: true });
  };
  return (
    <div className="personal-box">
      <NavBarAgain title="个人中心" />
      <div className="baseInfo">
        <Link to="/update">
          <img className="pic" src={info?.avatar} />
          <p className="name">{info?.name || "你好嘎嘎"}</p>
        </Link>
      </div>
      <div>
        <Link to="/store" className="tab">
          我的收藏
          <RightOutline />
        </Link>
        <div className="tab" onClick={signOut}>
          退出登录
          <RightOutline />
        </div>
      </div>
    </div>
  );
}
export default connect((state) => state.base, {
  clearUserInfo: action.base.clearUserInfo,
  clearStoreList: action.store.clearStoreList,
})(Personal);
