import { Button } from "antd-mobile";
import { useState } from "react";

export default function ButtonAgain(props) {
  const [loading, setLoading] = useState(false);
  const { children, onClick: handle } = props;
  const handleClick = async () => {
    try {
      setLoading(true);
      await handle();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <Button
      {...props}
      onClick={() => {
        handleClick();
      }}
      loading={loading}
    >
      {children}
    </Button>
  );
}
