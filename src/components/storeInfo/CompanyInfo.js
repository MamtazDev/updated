import React from "react";
import logo from "../../../public/assets/infp-page-logo.png";
import certificate from "../../../public/assets/certificate.png";

const CompanyInfo = () => {
  return (
    <div className="info">
      <div className="container">
        <div className="row align-items-center mb-5">
          <div className="col-12 col-lg-6">
            <h3>Company info</h3>
            <p style={{ fontWeight: "600" }}>
              SteelManufacturer AB: Your Trusted Steel Partner
            </p>{" "}
            <br /> <br />
            <p>
              At SteelManufacturer AB, we take pride in being a leading steel
              manufacturing company, offering top-quality steel products to
              diverse industries. With a strong commitment to excellence,
              sustainability, and customer satisfaction, we strive to be your
              reliable and trusted steel partner. <br /> <br />
              Our wide range of steel products, including structural steel,
              pipes, sheets, and customized components, caters to the unique
              needs of various sectors. Our skilled team of engineers ensures
              precision and durability in every piece of steel we produce.{" "}
              <br /> <br />
              We believe in responsible business practices, minimizing our
              environmental impact, and contributing positively to the
              communities
            </p>
          </div>
          <div className="col-12 col-lg-6 text-center">
            <img className="img-fluid" src={logo.src} alt="" />
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-12 col-lg-6">
            <div className="d-flex gap-4">
              <img className="img-fluid" src={certificate.src} alt="" />
              <img className="img-fluid" src={certificate.src} alt="" />
              <img className="img-fluid" src={certificate.src} alt="" />
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <iframe
              width="100%"
              height="264"
              src="https://www.youtube.com/embed/G6OM4ECF3D8?si=c-OjrYWm3p2G7Wo9"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
