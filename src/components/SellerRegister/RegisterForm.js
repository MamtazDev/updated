import RegistrationSuccess from "@/utils/modals/RegistrationSuccess";
import Link from "next/link";
import React, { useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { usePostStoreRequestMutation } from "@/redux/features/stores/storeApi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const { register, handleSubmit } = useForm()
  const { user } = useContext(AuthContext);
  const closeModalRef = useRef(null);
  const router = useRouter()

  const [postStoreRequest] = usePostStoreRequestMutation()

  const uploadImagesToImageBB = async (files) => {
    let images = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=932ae96b4af949bccda61ebea8105393",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      images.push(data?.data?.url);
    }
    return images;
  };


  const handleRegister = async (data) => {

    const image1 = await uploadImagesToImageBB(data?.business_registration_certificate)
    const image2 = await uploadImagesToImageBB(data?.kdv_certificate)

    const registerData = {
      user: user?._id,
      store_name: data?.store_name,
      company_address: {
        country: data?.country,
        province: data?.province,
        city: data?.city,
        address: data?.address,
        postal_code: data?.postal_code,
      },
      business_information: {
        business_registration_certificate: image1[0],
        business_certificate_number: data?.business_certificate_number,
        company_website: data?.company_website,
      },
      tax_information: {
        kdv_number: data?.kdv_number,
        kdv_certificate: image2[0],
      },
    }


    const options = {
      data: registerData
    }
    const result = await postStoreRequest(options)
    console.log(result)
    if (result?.data?.status === true) {
      toast.success("Selling Request Successfully")
      router.push("/seller-store")
    } else {
      toast.error("Selling Request unsuccessfully")
    }
  }


  return (
    <div className="sr_form">
      <div className="container">
        <p className="title">Please fill in this form</p>
        <form onSubmit={...handleSubmit(handleRegister)}>
          {/* Company Address part */}
          <div className="form_gap">
            <p className="subtitle">Company Address</p>
            <div className="row">
              <div className="col-12 col-md-6">
                <div>
                  <label>
                    Country <span>*</span>
                  </label>
                  <input {...register("country", { required: true })}
                    className="px-2" type="text" placeholder="Country" />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div>
                  <label>
                    Province <span>*</span>
                  </label>
                  <input {...register("province", { required: true })} className="px-2" type="text" placeholder="Province" />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div>
                  <label>
                    City <span>*</span>
                  </label>
                  <input {...register("city", { required: true })} className="px-2" type="text" placeholder="City" />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div>
                  <label>
                    Address <span>*</span>
                  </label>
                  <input {...register("address", { required: true })} className="px-2" type="text" placeholder="City" />
                </div>
              </div>
              <div className="col-12">
                <div>
                  <label>
                    Postalcode <span>*</span>
                  </label>
                  <input {...register("postal_code", { required: true })}
                    className="px-2"
                    type="text"
                    placeholder="Postalcode"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Business information part */}
          <div className="form_gap">
            <p className="subtitle">Business information </p>
            <div className="row">
              <div className="col-12">
                <div>
                  <label>
                    Business name <span>*</span>
                  </label>
                  <input {...register("store_name", { required: true })} className="px-2" type="text" placeholder="Country" />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div>
                  <label>
                    Business registration Certificate <span>*</span>
                  </label>
                  <input {...register("business_registration_certificate", { required: true })}
                    className="px-2" type="file" />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div>
                  <label>
                    Business certificate Number <span>*</span>
                  </label>
                  <input {...register("business_certificate_number", { required: true })}
                    className="px-2"
                    type="text"
                    placeholder="Business certificate number"
                  />
                </div>
              </div>
              <div className="col-12">
                <div>
                  <label>
                    Company website <span>*</span>
                  </label>
                  <input {...register("company_website", { required: true })}
                    className="px-2"
                    type="text"
                    placeholder="Company website"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Tax information part */}
          <div className="form_gap">
            <p className="subtitle">Tax information </p>
            <div className="row">
              <div className="col-12 col-md-6">
                <div>
                  <label>
                    KDV Number <span>*</span>
                  </label>
                  <input {...register("kdv_number", { required: true })}
                    className="px-2"
                    type="number"
                    placeholder="KDV Number"
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div>
                  <label>
                    KDV certificate <span>*</span>
                  </label>
                  <input {...register("kdv_certificate", { required: true })} className="px-2" type="file" />
                </div>
              </div>
            </div>
            <div className="d-flex gap-1 align-items-center">
              <input
                style={{ width: "unset" }}
                type="checkbox"
                className="mb-0"
              />
              <p className="agree">
                I agree to Turkeytrademarket{" "}
                <Link href="#"> Terms and conditions</Link>{" "}
              </p>
            </div>
          </div>
          <div className="text-center">
            <button
              // onClick={sellerStatusAdd}
              className=" submit_btn"
              type="submit"
            // data-bs-toggle="modal"
            // data-bs-target="#exampleModal"
            >
              Submit
            </button>
          </div>
        </form>

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
                  ref={closeModalRef}
                  style={{ position: "absolute", right: "40px" }}
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
                <RegistrationSuccess closeModalRef={closeModalRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
