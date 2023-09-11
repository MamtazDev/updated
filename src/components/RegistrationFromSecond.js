import Link from "next/link";
import React, { useRef, useState } from "react";
import styles from "@/styles/Register.module.css";
import RegistrationVerificationModal from "@/utils/modals/RegistrationVerificationModal";

const RegistrationFromSecond = ({ setRegisterForm, setUserRegistrationInfo, userRegistrationInfo, error, setError }) => {
  const registerButton = useRef(null);

  const [userAgreement, setUserAgreement] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const companyAddress = form.companyAddress.value;
    const city = form.city.value;
    const zipCode = Number(form.zipCode.value);
    const province = form.province.value;
    const businessName = form.businessName.value;
    const countryCode = form.countryCode.value;
    const number = form.number.value;

    const data = {
      name,
      companyAddress,
      city,
      zipCode,
      province,
      businessName,
      phoneNumber: countryCode + " " + number,

    }

    if (userAgreement) {
      setUserRegistrationInfo({ ...userRegistrationInfo, ...data })
      const userData = { ...userRegistrationInfo, ...data }

      fetch("https://turkey-tm-server.onrender.com/api/v1/users/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(userData)
      })

        .then(res => res.json())
        .then(resData => {
          if (resData.status === 200) {
            registerButton.current.click();
            setError("")
          }
        })
      return
    }

    else {
      setError("Please accept user agreement!")
    }

  };



  return (
    <>
      <form
        className={styles.registerFormSecondContainer}
        onSubmit={handleSubmit}
      >
        <div>
          <h6>Register</h6>
          <p style={{ marginBottom: "30px" }}>
            Already have an account? <Link href="signin">Login</Link>
          </p>
          <div>
            <label for="exampleInputEmail1" className="form-label">
              Full Name<span>*</span>
            </label>
            <input type="text" className="form-control" placeholder="Full name " name="name" required />
          </div>
          <div>
            <label for="exampleInputPassword1" className="form-label">
              Company Address<span>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Company address"
              name="companyAddress"
              required
            />
          </div>
          <div className="d-flex gap-3">
            <div>
              <label for="exampleInputPassword1" className="form-label">
                City<span>*</span>
              </label>
              <input type="text" className="form-control" placeholder="City" name="city" required />
            </div>
            <div>
              <label for="exampleInputPassword1" className="form-label">
                Zip code<span>*</span>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Zip/postal code"
                name="zipCode"
                required
              />
            </div>
          </div>

          <div className="d-flex gap-3">
            <div className="w-100">
              <label for="exampleInputPassword1" className="form-label">
                Province<span>*</span>
              </label>
              <input type="text" className="form-control" placeholder="Province" name="province" required />
            </div>
            <div className="w-100">
              <label for="exampleInputPassword1" className="form-label">
                Business Name<span>*</span>
              </label>
              {/* <input type="text" className="form-control" placeholder="Country" /> */}
              <select
                className={`form-select w-100 ${styles.selectInput}`}
                aria-label="Default select example"
                name="businessName"
                required
              >
                <option selected value="" style={{ color: "#94959B" }}>
                  Business Name
                </option>
                <option value="USA">Business one</option>
                <option value="Germany">Business two</option>
                <option value="Italy">Business Three</option>
              </select>
            </div>
          </div>
          <div className="w-100">
            <label for="exampleInputPassword1" className="form-label">
              Phone Number<span>*</span>
            </label>
            <div className="d-flex  gap-2" style={{ marginBottom: "45px" }}>
              <select
                className={`form-select w-25 ${styles.selectInput}`}
                aria-label="Default select example"
                name="countryCode"
              >
                <option selected value="+45">+45</option>
                <option value="+880">+880</option>
                <option value="+65">+65</option>
                <option value="+91">+91</option>
              </select>
              <input
                type="number"
                className="form-control w-75"
                style={{ marginBottom: "unset" }}
                placeholder="Phone number"
                name="number"
                required
              />
            </div>
          </div>
          <p className="text-danger">{error}</p>
          <div className="d-flex gap-2 align-items-center mb-3">
            <input type="checkbox" className="mb-0" onClick={() => setUserAgreement(!userAgreement)} />
            <p className={`mb-0 ${styles.agreementText}`}>
              I agree to the <Link href="#">User agreement</Link> and{" "}
              <Link href="#">Privacy policy</Link>
            </p>
          </div>
          <div className="d-flex gap-5">
            <button
              type="submit"
              style={{ backgroundColor: "#F2F2F2", color: "#222" }}
              onClick={() => setRegisterForm((prev) => prev - 1)}
            >
              Back
            </button>
            <button type="submit">Register</button>

          </div>
        </div>
      </form>

      <button
        className="btn btn-primary d-none"
        data-bs-target="#exampleModalToggle"
        data-bs-toggle="modal"
        ref={registerButton}
      >
        Open first modal
      </button>
      <RegistrationVerificationModal userRegistrationInfo={userRegistrationInfo} />
    </>
  );
};

export default RegistrationFromSecond;
