import React, { useState } from "react";
import rightArrow from "../../public/assets/right-arrow.png";
import leftArrow from "../../public/assets/left-arrow.png";

const Pagination = () => {
  const [active, setActive] = useState();
  return (
    <div className="container">
      <div className="pagination">
        <img src={leftArrow.src} alt="" />
        <button>01</button>
        <button className="active">02</button>
        <button>...</button>
        <button>09</button>
        <img src={rightArrow.src} alt="" />
      </div>
    </div>
  );
};

export default Pagination;
