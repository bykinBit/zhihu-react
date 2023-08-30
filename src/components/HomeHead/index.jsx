import { useMemo } from "react";
import "./index.less";
import hdImg from "@/assets/image/client-user.png";
export default function HomeHead(props) {
  const { today } = props;
  let time = useMemo(() => {
    const [_, month, day] = today.match(/^\d{4}(\d{2})(\d{2})$/);
    const area = [
      "零",
      "一",
      "二",
      "三",
      "四",
      "五",
      "六",
      "七",
      "八",
      "九",
      "十",
      "十一",
      "十二",
    ];
    return {
      month: area[+month] + "月",
      day,
    };
  }, [today]);
  return (
    <header className="home-head">
      <div className="info">
        <div className="time">
          <span>{time.day}</span>
          <span>{time.month}</span>
        </div>
        <h2 className="title">知乎日报</h2>
      </div>
      <div className="picture">
        <img src={hdImg} />
      </div>
    </header>
  );
}
