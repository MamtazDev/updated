import React, { useState } from "react";
import sms from "../../../public/assets/smsicon.png";
import star from "../../../public/assets/green-star.png";
import ProductSlider from "./ProductSlider";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setSaveProducts } from "@/redux/features/products/productSlice";
import { toast } from "react-toastify";

const ProductBanner = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(product?.images[0]);
  const dispatch = useDispatch()
  const { saveProducts } = useSelector((state) => state.product)

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleSaveProduct = () => {
    const products = localStorage.getItem("save-products") || []

    let oldProducts = []
    if (products.length) {
      oldProducts = JSON.parse(products)
    }

    const isExit = oldProducts.find((pro) => pro?._id === product?._id)
    if (isExit) {
      const allProducts = oldProducts.filter((pro) => pro?._id !== product?._id)
      localStorage.setItem("save-products", JSON.stringify(allProducts))
      dispatch(setSaveProducts(allProducts))
      toast.success("Save Product Removed")
    } else {
      localStorage.setItem("save-products", JSON.stringify([...oldProducts, product]))
      const newProducts = JSON.parse(localStorage.getItem("save-products")) || []
      dispatch(setSaveProducts(newProducts))
      toast.success("Product Save Successful")
    }
  }



  const isSaved = saveProducts.find((p) => p?._id === product?._id)
  return (
    <div className="product_banner">
      <div className="container">
        <div className="product_inner">
          <div className="row align-items-center mb-5">
            <div className="col-12 col-lg-6" >
              {selectedImage && (
                <img
                  style={{ height: "415px" }}
                  className="w-100 img-fluid"
                  src={selectedImage}
                  alt="Selected"
                />
              )}
              {/* {selectedImage && <ReactImageZoom {...zoomProps} />} */}
            </div>
            <div className="col-12 col-lg-6">
              <h4>
                {product?.title}
              </h4>
              <h5>
                € {product?.price}/ <span>piece</span>{" "}
              </h5>
              <div className="d-flex gap-3">
                <div>
                  <p>Seller</p>
                  <p>MOQ </p>
                  <p>Model nr </p>
                  <p>Lead time </p>
                </div>
                <div>
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                </div>
                <div>
                  <Link
                    style={{ marginBottom: "23px" }}
                    href="/seller-store"
                    className="text-primary fw-bold text-decoration-none d-block"
                  >
                    Coupon history{" "}
                  </Link>
                  <p style={{ fontWeight: "400" }}>{product?.moq} pieces</p>
                  <p style={{ fontWeight: "400" }}>{product?.model}</p>
                  <p style={{ fontWeight: "400" }}>15-45 days</p>
                  <p style={{ fontWeight: "400" }}>15-45 days</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-12 col-lg-6">
              <ProductSlider
                images={product?.images}
                handleImageClick={handleImageClick}
              />
            </div>
            <div className="col-12 col-lg-6">
              <div className="d-flex gap-4 justify-content-between align-items-center h-100">
                <button className="submit_btn">
                  <img src={sms.src} alt="" /> Contact Seller
                </button>
                <button onClick={() => handleSaveProduct(product)} className="savePro_btn"
                  style={{ backgroundColor: isSaved ? "orange" : "white" }} >
                  <img src={star.src} alt="" /> Save product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBanner;
