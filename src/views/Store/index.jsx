import { connect } from "react-redux";
import "./index.less";
import NavBarAgain from "@/components/NavBarAgain";
import NewsItem from "@/components/NewsItem";
import action from "@/store/action";
import { SwipeAction, Toast } from "antd-mobile";
import { useEffect } from "react";
import { removeStore } from "@/api";
function Store(props) {
  const { storeList, queryStoreListAsync, removeStoreItemById } = props;
  useEffect(() => {
    if (!storeList) queryStoreListAsync();
  }, []);
  const handleRemove = async (id) => {
    try {
      let { code } = await removeStore(id);
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
      removeStoreItemById(id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="store">
      <NavBarAgain title="我的收藏" />
      {storeList ? (
        <div className="box">
          {storeList.map((item) => {
            let { id } = item;
            return (
              <SwipeAction
                key={id}
                rightActions={[
                  {
                    key: "delete",
                    text: "删除",
                    color: "danger",
                    onClick: handleRemove.bind(null, id),
                  },
                ]}
              >
                <NewsItem info={{ ...item, id: item.newsId }} />
              </SwipeAction>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
export default connect((state) => state.store, action.store)(Store);
