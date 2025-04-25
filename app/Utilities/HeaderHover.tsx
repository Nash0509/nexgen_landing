import React from "react";
import Hoverdata from "./Hoverdata";

const HeaderHover = (item: { item: string }) => {
  return (
    <div>
      <Hoverdata hoveredItem={item.item.split(" ")[0]} />
    </div>
  );
};

export default HeaderHover;
