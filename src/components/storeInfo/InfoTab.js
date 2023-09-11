import React, { useState } from "react";
import Item from "../Item";
import { storeItems } from "@/utils/datas/items";
import ContactInfo from "../SellerStore/ContactInfo/ContactInfo";

const InfoTab = () => {
  const [step, setStep] = useState(0);
  const tabs = [
    {
      name: "Products",
    },
    {
      name: "Categories ",
    },
    {
      name: "Profile ",
    },
    {
      name: "Chat now ",
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
          {step === 0 && <Item items={storeItems} />}

          {step === 1 && <UploadProduct />}
          {step === 3 && <UploadProduct />}
          {step === 2 && <ContactInfo />}
        </div>
      </div>
    </div>
  );
};

export default InfoTab;
