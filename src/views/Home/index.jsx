import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { Divider, DotLoading, Image, Swiper } from "antd-mobile";
import { Link } from "react-router-dom";
import HomeHead from "@/components/HomeHead";
import { queryNewsLatest, queryNewsBefore } from "@/api";
import "./index.less";
import SkeletonAgain from "../../components/SkeletonAgain";
import NewsItem from "../../components/NewsItem";
export default function Home() {
  const [today, setToday] = useState(
    dayjs().format("YYYY-MM-DD").replace(/\-/g, "")
  );
  const [bannerData, setBannerData] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const loadmore = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const { date, stories, top_stories } = await queryNewsLatest();
        setToday(date);
        setBannerData(top_stories);
        setNewsList([
          {
            date,
            stories,
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    let ob = new IntersectionObserver(async (change) => {
      let { isIntersecting } = change[0];
      if (isIntersecting) {
        try {
          const time = newsList[newsList.length - 1]["date"];
          let { date, stories } = await queryNewsBefore(time);
          newsList.push({ date, stories });
          setNewsList([...newsList]);
        } catch (error) {
          console.log(error);
        }
      }
    });
    ob.observe(loadmore.current);
    let loadmoreDom = loadmore.current;
    return () => {
      ob.unobserve(loadmoreDom);
    };
  }, [newsList]);
  return (
    <div className="home">
      {/* //头部 */}
      <HomeHead today={today} />
      {/* //轮播图 */}
      <div className="swiper-box">
        {bannerData.length > 0 ? (
          <Swiper autoplay={true} loop={true}>
            {bannerData.map((item) => {
              const { id, image, title, hint } = item;
              return (
                <Swiper.Item key={id}>
                  <Link to={{ pathname: `detail/${id}` }}>
                    <Image src={image} lazy></Image>
                    <div className="desc">
                      <h3 className="title">{title}</h3>
                      <p className="author">{hint}</p>
                    </div>
                  </Link>
                </Swiper.Item>
              );
            })}
          </Swiper>
        ) : null}
      </div>
      {/* 新闻列表 */}
      {newsList.length === 0 ? (
        <SkeletonAgain />
      ) : (
        <>
          {newsList.map((item, index) => {
            const { date, stories } = item;
            return (
              <div className="news-box" key={date}>
                {index !== 0 ? (
                  <Divider contentPosition="left">{date}</Divider>
                ) : null}
                <div className="list">
                  {stories.map((el) => (
                    <NewsItem key={el.id} info={el}></NewsItem>
                  ))}
                </div>
              </div>
            );
          })}
        </>
      )}
      <div
        className="loadmore-box"
        style={{ display: newsList.length > 0 ? "block" : "none" }}
        ref={loadmore}
      >
        加载更多
        <DotLoading />
      </div>
    </div>
  );
}
