import React, { useContext, useEffect } from "react";
import Link from "next/link";
import logo from "../../public/assets/logo.png";
import star from "../../public/assets/star1.png";
import message from "../../public/assets/message.png";
import user from "../../public/assets/profile.png";
import verification from "../../public/assets/verification.png";
import { AuthContext } from "./context/AuthContext";
import { useDispatch } from "react-redux";
import { setSaveProducts } from "@/redux/features/products/productSlice";


const Header = () => {
  const { sellerStatus, user } = useContext(AuthContext);
  const dispatch = useDispatch()


  useEffect(() => {
    const newProducts = JSON.parse(localStorage.getItem("save-products")) || []
    dispatch(setSaveProducts(newProducts))
  }, [])

  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand p-0" href="/">
            <img src={logo.src} alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mt-5 mt-md-0">
                <Link
                  style={{ color: "#E61C2B", fontWeight: "600" }}
                  className="nav-link p-0 d-flex align-items-center gap-1"
                  aria-current="page"
                  href="/seller-register"
                >
                  <img
                    className={user ? "d-none " : "d-block me-0"}
                    src={verification.src}
                    alt=""
                  />{" "}
                  {user ? "Start Selling" : "Verification in progress!"}
                </Link>
              </li>
              <li className="nav-item mt-5 mt-md-0">
                <Link className="nav-link p-0" aria-current="page" href="/save-products">
                  <img src={star.src} alt="" /> Saved
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link p-0" aria-current="page" href="#">
                  <img src={message.src} alt="" /> Messages
                </Link>
              </li>
              {user?._id && (
                <li className="nav-item">
                  <Link
                    className="nav-link register_btn"
                    aria-current="page"
                    href="/seller-store"
                  >
                    <img src={user?.src} alt="" />
                    {user?.name}
                  </Link>
                </li>
              )}

              {!user?._id && (
                <li className="nav-item ">
                  <Link
                    className="nav-link register_btn"
                    aria-current="page"
                    href="#"
                  >
                    <img src={user?.src} alt="" /> Sign In/ Register
                  </Link>
                  <ul className="child  ms-auto mb-2 mb-lg-0">
                    <li className="nav-item ">
                      <Link
                        className="nav-link register_btn"
                        aria-current="page"
                        href="/signin"
                      >
                        Log In
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link p-0"
                        aria-current="page"
                        href="/register"
                      >
                        Register as a Buyer
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link p-0"
                        aria-current="page"
                        href="/register?type=seller"
                      >
                        Register as a Seller
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
