import React, { useContext, useRef, useState } from "react";
import picIcon from "../../../public/assets/pic-icon.png";
import plusIcon from "../../../public/assets/plus-icon.png";
import videoIcon from "../../../public/assets/vedio-icon.png";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useGetStoreInfoBySellerIdQuery, usePatchStoreInfoByIdMutation } from "@/redux/features/stores/storeApi";

const CompanyForm = () => {
  const { register, handleSubmit } = useForm()
  const { isLoggedIn, isSignedIn, setIsSignedIn, sellerStatus, user } =
    useContext(AuthContext);
  const { data: store, refetch } = useGetStoreInfoBySellerIdQuery(user?._id)
  const [patchStoreInfoById, { isLoading, isSuccess, isError }] = usePatchStoreInfoByIdMutation()

  const [companyInfo, setCompanyInfo] = useState({ certificates: [] });
  const [certificate1, setCertificate1] = useState(null);
  const [certificate2, setCertificate2] = useState(null);
  const [certificate3, setCertificate3] = useState(null);
  const [logo, setLogo] = useState(null);

  // Assuming certificate1 and certificate2 are arrays of binary data
  const certificateUrl1 = URL.createObjectURL(new Blob([certificate1], { type: 'application/octet-stream' }));
  const certificateUrl2 = URL.createObjectURL(new Blob([certificate2], { type: 'application/octet-stream' }));
  const certificateUrl3 = URL.createObjectURL(new Blob([certificate3], { type: 'application/octet-stream' }));
  const logoUrl = URL.createObjectURL(new Blob([logo], { type: 'application/octet-stream' }));


  const logoInputRef = useRef();
  const videoInputRef = useRef();
  const certificate1Ref = useRef();
  const certificate2Ref = useRef();
  const certificate3Ref = useRef();

  const [isEdit, setIsEdit] = useState(false)


  console.log(logo)


  const InputChange = (e, type) => {
    if (type === "text") {
      setCompanyInfo({ ...companyInfo, [e.target.name]: e.target.value });
    }
    if (type === "file") {
      setCompanyInfo({ ...companyInfo, [e.target.name]: e.target.files[0] });
    }
  };


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
    const imagesData = await uploadImagesToImageBB([certificate1, certificate2, certificate3])


    const logoImage = await uploadImagesToImageBB([logo])


    const images = imagesData.filter(Boolean)

    const companyInfo = {
      store_info: data?.store_info,
      certificates: images,
      store_presentation_video: "https://youtu.be/G6OM4ECF3D8",
      logo: logoImage?.length && logoImage[0]
    }


    const options = {
      data: companyInfo,
      id: store?.data?._id,
    }
    const result = await patchStoreInfoById(options)
    setIsEdit(false)
    if (result?.data?.status === true) {
      refetch()
      toast.success("Store info Add Successfully")
    } else {
      toast.error("Store info add unsuccessfully")
    }
  }


  return (
    <div className="company_form">
      <div className="container">
        <form onSubmit={handleSubmit(handleRegister)}>
          {
            isEdit ? <>
              <div>
                <input
                  {...register("logo")}
                  name="logo"
                  type="file"
                  className="d-none"
                  accept="image/*"
                  ref={logoInputRef}
                  onChange={(e) => setLogo(e.target.files[0])}
                />
                <input
                  {...register("certificate1")}
                  type="file"
                  name="certificate1"
                  ref={certificate1Ref}
                  onChange={(e) => setCertificate1(e.target.files[0])}
                  className="d-none"
                />
                <input
                  {...register("certificate2")}
                  type="file"
                  name="certificate2"
                  ref={certificate2Ref}
                  onChange={(e) => setCertificate2(e.target.files[0])}
                  className="d-none"
                />
                <input
                  {...register("certificate3")}
                  type="file"
                  name="certificate3"
                  ref={certificate3Ref}
                  onChange={(e) => setCertificate3(e.target.files[0])}
                  className="d-none"
                />
                <input
                  {...register("store_presentation_video")}
                  type="file"
                  name="store_presentation_video"
                  className="d-none"
                  accept="video/mp4,video/x-m4v,video/*"
                  ref={videoInputRef}
                  onChange={(e) => InputChange(e, "file")}
                />
              </div>
              <div className="row  mb-5">
                <div className="col-12 col-lg-6 mb-5">
                  <div>
                    <label>Company info</label>
                    <textarea
                      {...register("store_info")}
                      rows="7"
                      name="store_info"
                      onChange={(e) => InputChange(e, "text")}
                      defaultValue={store?.data?.store_info && store?.data?.store_info}
                    ></textarea>
                  </div>
                </div>


                <div className="col-12 col-lg-6 mb-5">
                  <label>Logo</label>
                  {logo ? (
                    <div
                      className="input_box"
                      onClick={() => logoInputRef.current.click()}
                    >
                      <img
                        src={logoUrl}
                        alt=""
                        className="w-100 h-100"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  ) : (
                    <div
                      className="input_box"
                      onClick={() => logoInputRef.current.click()}
                    >
                      <div className="input_inner">
                        <img className="img-fluid " src={picIcon.src} alt="" />
                        <p>Drop your image here or browse</p>
                      </div>
                    </div>
                  )}
                </div>



                <div className="col-12 col-lg-6 ">
                  <label>Add Certificates</label>


                  <div className="row">
                    <div className="col-12 col-lg-4">
                      {certificate1 ? (
                        <div
                          onClick={() => certificate1Ref.current.click()}
                          className="input_box"
                        >
                          <div className="input_inner">
                            <img
                              src={certificateUrl1}
                              alt=""
                              className="w-100 h-100"
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => certificate1Ref.current.click()}
                          className="input_box"
                        >
                          <div className="input_inner">
                            <img src={plusIcon.src} alt="" />
                          </div>
                        </div>
                      )}
                    </div>


                    <div className="col-12 col-lg-4">
                      {certificate2 ? (
                        <div
                          onClick={() => certificate2Ref.current.click()}
                          className="input_box"
                        >
                          <div className="input_inner">
                            <img
                              src={certificateUrl2}

                              alt=""
                              className="w-100 h-100"
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => certificate2Ref.current.click()}
                          className="input_box"
                        >
                          <div className="input_inner">
                            <img src={plusIcon.src} alt="" />
                          </div>
                        </div>
                      )}
                    </div>


                    <div className="col-12 col-lg-4">
                      {certificate3 ? (
                        <div
                          onClick={() => certificate3Ref.current.click()}
                          className="input_box"
                        >
                          <div className="input_inner">
                            <img
                              src={certificateUrl3}
                              alt=""
                              className="w-100 h-100"
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => certificate3Ref.current.click()}
                          className="input_box"
                        >
                          <div className="input_inner">
                            <img src={plusIcon.src} alt="" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>



                <div className="col-12 col-lg-6">
                  <label>Upload a video presentation of your company</label>
                  {companyInfo.video ? (
                    <div className="input_box">
                      <div className="input_inner">
                        <video controls loop autoPlay muted className="w-100 h-100">
                          <source src={companyInfo.video} type="video/mp4" />
                        </video>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => videoInputRef.current.click()}
                      className="input_box"
                    >
                      <div className="input_inner">
                        <img src={videoIcon.src} alt="" />
                        <p>Drop your video here or browse</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </> :
              <>
                <div className="row  mb-5">
                  <div className="col-12 col-lg-6 mb-5">
                    <div>
                      <label>Company info</label>
                      <textarea
                        {...register("store_info")}
                        rows="7"
                        name="store_info"
                        disabled
                        value={store?.data?.store_info && store?.data?.store_info}
                      ></textarea>
                    </div>
                  </div>


                  <div className="col-12 col-lg-6 mb-5">
                    <label>Logo</label>
                    {store?.data?.logo ? (
                      <div
                        className="input_box"
                      >
                        <img
                          src={store?.data?.logo}
                          alt=""
                          className="w-100 h-100"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    ) : (
                      <div
                        className="input_box"
                      >
                        <div className="input_inner">
                          <img className="img-fluid " src={picIcon.src} alt="" />
                          <p>Drop your image here or browse</p>
                        </div>
                      </div>
                    )}
                  </div>



                  {/* <div className="row"> */}
                  <div className="col-12 col-lg-6 ">
                    <label>Add Certificates</label>

                    {
                      store?.data?.certificates?.length ? <div style={{ display: "flex", gap: "10px" }}>
                        {
                          store?.data?.certificates.map((cer) => (
                            <div
                              className="input_box"
                            >
                              <div className="input_inner">
                                <img
                                  src={cer}
                                  alt=""
                                  className="w-100 h-100"
                                  style={{ objectFit: "cover" }}
                                />
                              </div>
                            </div>
                          ))
                        }

                        {
                          store?.data?.certificates?.length !== 2 && (
                            <>

                              {/* <div className="" style={{ display: "flex", gap: "10px" }}> */}

                              <div
                                className="input_box"
                              >
                                <div className="input_inner">
                                  <img src={plusIcon.src} alt="" />
                                </div>
                              </div>
                              <div
                                className="input_box"
                              >
                                <div className="input_inner">
                                  <img src={plusIcon.src} alt="" />
                                </div>
                              </div>
                              {/* </div> */}


                            </>
                          )
                        }
                      </div> :

                        <div className="" style={{ display: "flex", gap: "10px" }}>
                          <div
                            className="input_box"
                          >
                            <div className="input_inner">
                              <img src={plusIcon.src} alt="" />
                            </div>
                          </div>

                          <div
                            className="input_box"
                          >
                            <div className="input_inner">
                              <img src={plusIcon.src} alt="" />
                            </div>
                          </div>
                          <div
                            className="input_box"
                          >
                            <div className="input_inner">
                              <img src={plusIcon.src} alt="" />
                            </div>
                          </div>

                        </div>
                    }

                  </div>
                  {/* </div> */}


                  <div className="col-12 col-lg-6">
                    <label>Upload a video presentation of your company</label>
                    {store?.data?.store_presentation_video ? (
                      <div className="input_box">
                        <div className="input_inner">
                          <video controls loop autoPlay muted className="w-100 h-100">
                            <source src={store?.data?.store_presentation_video} type="video/mp4" />
                          </video>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="input_box"
                      >
                        <div className="input_inner">
                          <img src={videoIcon.src} alt="" />
                          <p>Drop your video here or browse</p>
                        </div>
                      </div>
                    )}
                  </div>

                </div>


              </>


          }
          <div className="d-flex gap-4 justify-content-end align-items-center">
            <button type="submit" className="register_btn">Save</button>
            <div onClick={() => setIsEdit(!isEdit)} className="register_btn">Edit</div>
          </div>
        </form>
      </div>
    </div >
  );
};

export default CompanyForm;
