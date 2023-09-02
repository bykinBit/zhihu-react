import { Link } from "react-router-dom";
import "./index.less";
import { Image } from "antd-mobile";
import PropTypes from "prop-types";
export default function NewsItem(props) {
  let { info } = props;
  if (!info) info = null;
  let { id, images, title, hint } = info;
  if (!images) images = [];
  return (
    <div className="news-item-box">
      <Link to={{ pathname: `/detail/${id}` }}>
        <div className="content">
          <h4 className="title">{title}</h4>
          <p className="author">{hint}</p>
        </div>
        <Image src={images[0]} lazy />
      </Link>
    </div>
  );
}
NewsItem.defaultProps = {
  info: null,
};
NewsItem.propTypes = {
  info: PropTypes.object,
};
