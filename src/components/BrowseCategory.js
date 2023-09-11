import React from "react";
import arrow from "../../public/assets/arrow.png";
import furniture from "../../public/assets/furnitures.png";
import electronic from "../../public/assets/electronic.png";
import construction from "../../public/assets/construction.png";
import sports from "../../public/assets/sports.png";
import machinary from "../../public/assets/machinary.png";
import food from "../../public/assets/food.png";
import Link from "next/link";

const BrowseCategory = ({ categories }) => {
  // const categories = [
  //   {
  //     pic: furniture,
  //     name: "Furniture & Home <br/> Decor",
  //     slug: "Furniture-HomeDecor",
  //   },
  //   {
  //     pic: electronic,
  //     name: "Electronic <br/> Components",
  //     slug: "Electronic-Components",
  //   },
  //   {
  //     pic: construction,
  //     name: "Construction",
  //     slug: "Construction",
  //   },
  //   {
  //     pic: sports,
  //     name: "Sports & Outdoors",
  //     slug: "Sports-Outdoors",
  //   },
  //   {
  //     pic: machinary,
  //     name: "Machinery & <br/> Equipment",
  //     slug: "Machinery-Equipment",
  //   },
  //   {
  //     pic: food,
  //     name: "Food, Household & <br/> Pets",
  //     slug: "Food-Household-Pets",
  //   },
  // ];
  return (
    <div className="browse">
      <h5>Browse Categories</h5>
      {categories.map((category, index) => (
        <Link
          href={`/category/${category?._id}`}
          style={{ gap: "20px", cursor: "pointer", textDecoration: "none" }}
          className="result d-flex align-items-center justify-content-between"
          key={index}
        >
          <div style={{ gap: "20px" }} className="d-flex align-items-center">
            <img className="" src={category.image} alt="" style={{ width: "50px" }} />
            <p dangerouslySetInnerHTML={{ __html: category.cate_name }} />
          </div>
          <img src={arrow.src} alt="" />
        </Link>
      ))}
    </div>
  );
};

export default BrowseCategory;
