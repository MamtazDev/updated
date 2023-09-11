import React, { useState } from "react";
import login from "../../public/assets/login-banner.png";
import checkbox from "../../public/assets/checkbox.png";
import checked from "../../public/assets/checked.png";
import Link from "next/link";
import RegistrationFromSecond from "@/components/RegistrationFromSecond";
import { useRouter } from "next/router";

const RegisterPage = () => {
  const [checkIcon, setCheckIcon] = useState(false);
  const [registerForm, setRegisterForm] = useState(1);

  const [userRegistrationInfo, setUserRegistrationInfo] = useState({});
  const [error, setError] = useState("");
  const router = useRouter()
  const isSeller = router.asPath.includes("type=seller")
  const role = isSeller ? "Seller" : "Buyer"

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;
    const repeatPassword = form.repeatPassword.value;
    const companyName = form.companyName.value;

    const data = {
      email,
      password,
      repeatPassword,
      companyName,
      role: "Seller"
    };

    if (password !== repeatPassword) {
      setError("Password doesn't Matched!");
    } else {
      setError("");
      setUserRegistrationInfo({ ...userRegistrationInfo, ...data });

      setRegisterForm((prev) => prev + 1);
    }
  };


  return (
    <div className="login">
      <div className="row m-0">
        <div className="col-12 col-lg-6 my-auto">
          {registerForm === 1 && (
            <form onSubmit={handleSubmit}>
              <div>
                <h6>Register</h6>
                <p>
                  Already have an account? <Link href="signin">Login</Link>
                </p>
                <div>
                  <label for="exampleInputEmail1" className="form-label">
                    Email<span>*</span>
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Email "
                    autoComplete="off"
                    name="email"
                    required
                  />
                </div>
                <div>
                  <label for="exampleInputPassword1" className="form-label">
                    Password<span>*</span>
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    autoComplete="off"
                    name="password"
                    required
                  />
                </div>
                <div>
                  <label for="exampleInputPassword1" className="form-label">
                    Repeat Password<span>*</span>
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    name="repeatPassword"
                    required
                  />
                </div>
                <div>
                  <label for="exampleInputPassword1" className="form-label">
                    Company Name<span>*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Company Name"
                    name="companyName"
                    required
                  />
                </div>

                <p className="text-danger">{error}</p>

                <div className="d-flex gap-5">
                  <button
                    type=""
                    style={{ backgroundColor: "#F2F2F2", color: "#909090" }}
                    disabled
                  >
                    Back
                  </button>
                  <button type="submit">Continue</button>
                </div>
              </div>
            </form>
          )}
          {registerForm === 2 && (
            <RegistrationFromSecond setRegisterForm={setRegisterForm} userRegistrationInfo={userRegistrationInfo} setUserRegistrationInfo={setUserRegistrationInfo} error={error} setError={setError} />
          )}
        </div>
        <div className="col-12 col-lg-6 p-0 mb-5 mb-lg-0   d-none d-lg-block">
          <img
            style={{ height: "100vh" }}
            className="img-fluid w-100"
            src={login.src}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
