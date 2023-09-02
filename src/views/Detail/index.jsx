import { Badge, Toast } from "antd-mobile";
import {
  LeftOutline,
  StarOutline,
  MessageOutline,
  MoreOutline,
  LikeOutline,
} from "antd-mobile-icons";
import "./index.less";
import { useEffect, useMemo, useState } from "react";
import { queryStoryExtra, queryNewsInfo, storeNews, removeStore } from "@/api";
import { flushSync } from "react-dom";
import { connect } from "react-redux";
import action from "@/store/action";
function Detail(props) {
  let {
    navigate,
    location,
    params,
    queryStoreListAsync,
    queryUserInfoAsync,
    removeStoreItemById,
    storeList,
    info: userInfo,
    newsList,
  } = props;
  let [info, setInfo] = useState(null);
  let [extra, setExtra] = useState(null);
  let link;
  const handleStyle = (result) => {
    link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = result?.css[0];
    document.head.appendChild(link);
  };
  const handleImage = (result) => {
    let image = new Image();
    image.src = result?.image;
    let imgEl = document.querySelector(".img-place-holder");
    image.onload = () => {
      imgEl.appendChild(image);
    };
    image.onerror = () => {
      let parentImg = imgEl.parentNode;
      parentImg.parentNode.removeChild(image);
    };
    let title = document.querySelector(".question-title");
    title.innerHTML = result?.title;
  };
  //获取详情
  useEffect(() => {
    (async () => {
      try {
        const result = await queryNewsInfo(params.id);
        flushSync(() => {
          setInfo(result);
          handleStyle(result);
        });
        handleImage(result);
      } catch (error) {
        console.log(error);
      }
    })();
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  //获取详情其他信息
  useEffect(() => {
    (async () => {
      try {
        const extraRes = await queryStoryExtra(params.id);
        setExtra(extraRes);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  //处理底部收藏
  useEffect(() => {
    (async () => {
      if (!userInfo) {
        let { info } = await queryUserInfoAsync();
        userInfo = info;
      }
      if (userInfo && !storeList) {
        let { storeList } = await queryStoreListAsync();
        storeList = storeList;
      }
    })();
  }, []);
  let isStore = useMemo(() => {
    if (!storeList) return false;
    return storeList.some((item) => {
      return +item.newsId === +params.id;
    });
  }, [storeList, params]);
  const handleStore = async () => {
    if (!userInfo) {
      //未登录
      Toast.show({
        icon: "fail",
        content: "请先登录！",
      });
      navigate(`/login?to=${location.pathname}`, { replace: true });
      return;
    }
    //已经登录，移除收藏
    if (isStore) {
      let item = storeList.find((its) => its.newsId === params.id);
      let { code } = await removeStore(item.id);
      if (+code !== 0) {
        Toast.show({
          icon: "fail",
          content: "操作失败！",
        });
        return;
      }
      Toast.show({
        icon: "success",
        content: "操作成功！",
      });
      removeStoreItemById(item.id);
      return;
    }
    //收藏
    try {
      let storeItem = newsList.find((item) => +item.id === +params.id);
      let { code } = await storeNews(storeItem);
      if (+code !== 0) {
        Toast.show({
          icon: "fail",
          content: "收藏失败",
        });
        return;
      }
      Toast.show({
        icon: "success",
        content: "收藏成功",
      });
      queryStoreListAsync();
      return;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="detail-box">
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html: info?.body,
        }}
      ></div>
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
          <Badge content={!extra ? 0 : extra.comments}>
            <MessageOutline />
          </Badge>
          <Badge content={!extra ? 0 : extra.popularity}>
            <LikeOutline />
          </Badge>
          <span className={isStore ? "stored" : ""} onClick={handleStore}>
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
export default connect(
  (state) => {
    return {
      ...state.base,
      ...state.store,
    };
  },
  {
    ...action.base,
    ...action.store,
  }
)(Detail);
