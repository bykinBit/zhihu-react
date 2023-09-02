import { NavBar } from "antd-mobile";
import PropTypes from "prop-types";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
export default function NavBarAgain(props) {
  let { title } = props;
  let navigate = useNavigate();
  let location = useLocation();
  const [usp] = useSearchParams();

  const back = () => {
    let to = usp.get("to");
    if (location.pathname === "/login" && /^\/detail\/\d+$/.test(to)) {
      navigate(to, { replace: true });
      return;
    }
    navigate(-1);
  };
  return <NavBar onBack={back}>{title}</NavBar>;
}
NavBarAgain.defaultProps = {
  title: "个人中心",
};
NavBarAgain.propTypes = {
  title: PropTypes.string,
};
