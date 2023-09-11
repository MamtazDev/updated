import React, { useContext, useState } from "react";
import StoreOverview from "./StoreOverview/StoreOverview";
import UploadProduct from "./UploadProduct/UploadProduct";
import EditProduct from "./EditProduct/EditProduct";
import ContactInfo from "./ContactInfo/ContactInfo";
import { AuthContext } from "../context/AuthContext";
import { useGetStoreInfoBySellerIdQuery } from "@/redux/features/stores/storeApi";

const StoreTab = () => {
  const { user } = useContext(AuthContext)
  const { data } = useGetStoreInfoBySellerIdQuery(user?._id)
  const [step, setStep] = useState(0);
  const tabs = [
    {
      name: "Store overview",
    },
    {
      name: "Upload Product",
    },
    {
      name: "Edit Product",
    },
    {
      name: "Contact info",
    },
  ];
  return (
    <div className="store_tab">
      <div className="container">
        <div className="tab_container">
          <div>
            {tabs.map((tab, index) => (
              <button
                className={`${step === index && "active"} tab`}
                key={index}
                onClick={() => setStep(index)}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {step === 0 && <StoreOverview store={data?.data} />}
          {step === 1 && <UploadProduct store={data?.data} />}
          {step === 2 && <UploadProduct />}
          {step === 3 && <ContactInfo />}
        </div>
      </div>
    </div>
  );
};

export default StoreTab;
