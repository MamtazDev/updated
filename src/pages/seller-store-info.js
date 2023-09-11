import CompanyForm from "@/components/SellerStore/CompanyForm";
import StoreBanner from "@/components/SellerStore/StoreBanner";
import StoreTab from "@/components/SellerStore/StoreTab";
import CompanyInfo from "@/components/storeInfo/CompanyInfo";
import InfoTab from "@/components/storeInfo/InfoTab";
import SellerStoreModal from "@/utils/modals/SellerStoreModal";
import React, { useEffect, useRef } from "react";

const sellerStoreInfo = () => {
  return (
    <div>
      <StoreBanner />
      <CompanyInfo />
      <InfoTab />
    </div>
  );
};

export default sellerStoreInfo;
