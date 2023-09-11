import CompanyForm from "@/components/SellerStore/CompanyForm";
import StoreBanner from "@/components/SellerStore/StoreBanner";
import StoreTab from "@/components/SellerStore/StoreTab";
import SellerStoreModal from "@/utils/modals/SellerStoreModal";
import React, { useEffect, useRef } from "react";

const sellerStore = () => {
  const openModalRef = useRef(null);
  useEffect(() => {
    openModalRef.current.click();
  }, []);
  return (
    <div>
      <StoreBanner />
      <CompanyForm />
      <StoreTab />

      {/* <!-- Button trigger modal --> */}
      <button
        ref={openModalRef}
        type="button"
        className="d-none btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              {" "}
              <button
                style={{ position: "absolute", right: "40px" }}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <SellerStoreModal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default sellerStore;
