import React from "react";
import cloudes from "../../assets/clouds.png";

const Cloud = () => {
  return (
    <img
      style={{ objectFit: "contain", width: "100%", height: "100%" }}
      src={cloudes}
      alt='logo'
    />
  );
};

export default Cloud;
