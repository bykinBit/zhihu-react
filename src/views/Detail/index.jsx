import { Badge } from "antd-mobile";
import {
  LeftOutline,
  StarOutline,
  MessageOutline,
  MoreOutline,
} from "antd-mobile-icons";
import "./index.less";
export default function Detail(props) {
  const { navigate } = props;
  return (
    <div className="detail-box">
      <div className="content"></div>
      <div className="tab-bar">
        <div
          className="back"
          onClick={() => {
            navigate(-1);
          }}
        >
          <LeftOutline />
        </div>
        <div className="icons">
          <Badge content="128">
            <MessageOutline />
          </Badge>
          <Badge content="18">
            <MessageOutline />
          </Badge>
          <span className="stored">
            <StarOutline />
          </span>
          <span>
            <MoreOutline />
          </span>
        </div>
      </div>
    </div>
  );
}
