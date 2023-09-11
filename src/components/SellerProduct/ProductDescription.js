import React from "react";
import description from "../../../public/assets/description-sofa.png";
import description2 from "../../../public/assets/desc-sofa2.png";

const ProductDescription = ({ product }) => {
  return (
    <div className="product_description">
      <div className="container">
        <div className="product_inner">
          <h4>Product Description </h4>

          <div>
            <h6>Product Overview:</h6>
            <p>
              {product?.description}
            </p>
          </div>

          <div>
            <h6>Features:</h6>
            <p>
              <span>High-Quality Construction:</span> Crafted with carefully
              {
                product?.features.map((feature) => (
                  <span>{feature}</span>
                ))
              }
            </p>
            <p>
              {" "}
              <span>Sleek Design:</span> Modern and timeless design that
              seamlessly fits into various interior styles.
            </p>
            <p>
              {" "}
              <span>Room for All:</span> Comfortably accommodates multiple
              individuals, perfect for family gatherings or socializing with
              friends.
            </p>
            <p>
              {" "}
              <span>Extra Plush Seat Cushions:</span> Generously stuffed seat
              cushions and backrests provide a luxurious feel and maximum
              relaxation.
            </p>
          </div>
          <img className="img-fluid" src={description.src} alt="" />
          {
            product?.packaging_and_elivery && <div className="table">
              <table>
                <tr>
                  <th>Packaging and Delivery:</th>
                </tr>
                {
                  Object.entries(product?.packaging_and_elivery).map(([key, value]) => (
                    <tr>
                      {" "}
                      <td>
                        <span>{key}:</span> {value}{" "}
                      </td>
                    </tr>
                  ))
                }

              </table>
            </div>
          }

          <p>
            Explore the comfort, elegance, and versatility of our modern corner
            sofa. Create an elegant and comfortable space in your home. Order
            today and receive this stylish addition to your interior.
          </p>
          <img className="img-fluid" src={description2.src} alt="" />
          <h6>Packaging and Delivery:</h6>
          {
            product?.packaging_and_elivery && Object.entries(product?.packaging_and_elivery).map(([key, value]) => (
              <p>
                <span>{key}:</span> {value}
              </p>
            ))
          }

          {
            product?.packaging_and_elivery && <div className="table">
              <table className="mb-0">
                {
                  Object.entries(product?.packaging_and_elivery).map(([key, value]) => (
                    <tr>
                      {" "}
                      <td>
                        <span>{key}:</span> {value}{" "}
                      </td>
                    </tr>
                  ))
                }

              </table>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
