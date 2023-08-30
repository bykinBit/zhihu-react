import { NavBar } from "antd-mobile";
import PropTypes from "prop-types";
export default function NavBarAgain(props) {
  let { title } = props;
  return <NavBar>{title}</NavBar>;
}
defaultProps = {
  title: "个人中心",
};
NavBarAgain.propTypes = {
  title: PropTypes.string,
};
