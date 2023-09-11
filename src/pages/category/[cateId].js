import Item from "@/components/Item";
import React, { useEffect } from "react";

const Category = ({ products }) => {
  return (
    <div className="container">
      <h3 className="text-center mt-5">
        {" "}
        {products?.length > products?.category?.cate_name}
      </h3>
      <Item items={products} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { cateId } = params;

  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URI}/products/category/${cateId}`
  );
  const data = await response.json();
  return {
    props: {
      products: data.data,
    },
  };
}

export default Category;
