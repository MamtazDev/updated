import Item from "@/components/Item";
import { useGetProductsByStoreQuery } from "@/redux/features/products/productApi";
import Pagination from "@/utils/Pagination";
import { storeItems } from "@/utils/datas/items";
import React from "react";

const StoreOverview = ({ store }) => {
  const { data, isLoading, isError, refetch } = useGetProductsByStoreQuery(store?._id)
  return (
    <div>
      <Item items={data?.data} />
      <Pagination />
    </div>
  );
};

export default StoreOverview;
