import React, { useRef, useState } from "react";
import question from "../../../../public/assets/que.png";
import plusIcon from "../../../../public/assets/plus-icon.png";
import star from "../../../../public/assets/star.png";
import videoIcon from "../../../../public/assets/vedio-icon.png";
import { useGetCategoriesQuery, usePostProductMutation } from "@/redux/features/products/productApi";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const UploadProduct = ({ store }) => {
  const { data, error, isLoading, refetch } = useGetCategoriesQuery();
  const [postProduct] = usePostProductMutation()
  const { handleSubmit, register } = useForm()


  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [video, setVideo] = useState(null);


  const image1Ref = useRef();
  const image2Ref = useRef();
  const image3Ref = useRef();
  const videoInputRef = useRef();

  // Assuming certificate1 and certificate2 are arrays of binary data
  const image1Url1 = URL.createObjectURL(new Blob([image1], { type: 'application/octet-stream' }));
  const image1Url2 = URL.createObjectURL(new Blob([image2], { type: 'application/octet-stream' }));
  const image1Url3 = URL.createObjectURL(new Blob([image3], { type: 'application/octet-stream' }));
  const videoUrl = URL.createObjectURL(new Blob([video], { type: 'application/octet-stream' }));

  const [category, setCategory] = useState("")
  const [unit, setUnit] = useState("")
  const [group, setGroup] = useState("")
  const [time, setTime] = useState("days")

  // console.log(unit)

  const [productInformation, setProductInformatin] = useState({})
  const [productInfo, setProductInfo] = useState({
    key: "",
    value: "",
  })


  const handleAddProductInfo = () => {
    if (productInfo) {
      productInformation({ [productInfo?.key]: productInfo?.value })
      setProductInfo({
        key: "",
        value: "",
      })
    }
  }


  const [selectedCheckbox, setSelectedCheckbox] = useState("onePrice");
  const [inputSets, setInputSets] = useState(1);

  const handleCheckboxChange = (checkboxId) => {
    setSelectedCheckbox(checkboxId);
  };

  const handleAddMoreClick = (e) => {
    e.preventDefault();
    setInputSets((prevSets) => prevSets + 1);
  };


  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  const addTask = () => {
    if (taskText.trim() !== '') {
      setTasks([...tasks, taskText]);
      setTaskText('');
    }
  };

  const removeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
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

  const handleAddProduct = async (data) => {
    if (!unit) {
      toast.warning("Unit is Required");
      return
    }
    if (!group) {
      toast.warning("Group is Required");
      return
    }
    if (!time) {
      toast.warning("Lead Time is Required");
      return
    }

    const imagesData = await uploadImagesToImageBB([image1, image2, image3])
    const images = imagesData.filter(Boolean)

    const productData = {
      title: data?.title,
      category: category ? category : data?.data[0]?._id,
      store: store?._id,

      images: images,
      price: data?.price,
      description: data?.description,
      keyword: [data?.keyword1, data?.keyword2, data?.keyword3],
      model: data?.model,
      group: group,
      moq: data?.moq,
      unit: unit,
      lead_time: { from: data?.from, to: data?.to, time: time }
    }


    console.log(productData)





    const options = {
      data: productData
    }
    const result = await postProduct(options)
    console.log(result)
    if (result?.data?.status === true) {
      toast.success("Product Add Successfully")
    } else {
      toast.error("Product Add unsuccessfully")
    }
  }



  return (
    <div className="upload_product">
      <div className="container">
        <form onSubmit={handleSubmit(handleAddProduct)}>
          <div className="row">


            <div className="col-12 col-lg-6 ">
              <div>
                <label>
                  Product name <img src={question} alt="" />
                </label>
                <input  {...register("title", { required: true })}
                  type="text" placeholder="Product name" />
              </div>
            </div>

            <div className="col-12 col-lg-6 ">
              <div>
                <label>Product category</label>
                <select onClick={(e) => setCategory(e.target.value)} >
                  {
                    data?.data.map((cate, i) => (
                      <option key={i} value={cate?._id}>{cate?.cate_name}</option>
                    ))
                  }
                </select>
              </div>
            </div>

            <div className="col-12">
              <div>
                <label>
                  Keyword <img src={question} alt="" />
                </label>
                <input {...register("keyword1", { required: true })}
                  type="text" name="keyword1" placeholder="keyword 01" />
                <input {...register("keyword2", { required: true })}
                  type="text" name="keyword2" placeholder="keyword 02" />
                <input {...register("keyword3", { required: true })}
                  type="text" name="keyword3" placeholder="keyword 03" />
              </div>
            </div>

            <div className="col-12 col-lg-6 ">
              <div>
                <label>Model</label>
                <input
                  {...register("model", { required: true })}
                  type="text"
                  placeholder="Model No " />
              </div>
            </div>

            <div className="col-12 col-lg-6 ">
              <div>
                <label>Product group </label>
                <select onClick={(e) => setGroup(e.target.value)} required >
                  <option >Select Group</option>
                  <option value="a">A</option>
                  <option value="b">B</option>
                  <option value="c">C</option>
                  <option value="d">D</option>
                </select>
              </div>
            </div>


            <div className="col-6">
              <label>
                Product photos <span>(max 6 photos)</span>{" "}
              </label>
              <div className="row mb-5">

                <div className="col-12 col-lg-4">

                  <div className="input_box"
                    onClick={() => image1Ref?.current?.click()} >
                    <div className="input_inner">
                      {
                        image1 ? <img className="w-100 h-100" src={image1Url1} alt="" /> :
                          <img className="" src={plusIcon.src} alt="" />
                      }
                    </div>
                    <input
                      ref={image1Ref}
                      type="file"
                      name="image1"
                      onChange={(e) => setImage1(e.target.files[0])}
                      className="d-none" />
                  </div>
                  <p className="primary d-flex align-items-center justify-content-center gap-1">
                    {" "}
                    <img src={star.src} alt="" /> Primary
                  </p>
                </div>

                <div className="col-12 col-lg-4">
                  <div className="input_box"
                    onClick={() => image2Ref?.current?.click()} >

                    <div className="input_inner">
                      {
                        image2 ? <img className="w-100 h-100" src={image1Url2} alt="" /> :
                          <img className="" src={plusIcon.src} alt="" />
                      }

                    </div>
                    <input
                      ref={image2Ref}
                      type="file"
                      name="image2"
                      onChange={(e) => setImage2(e.target.files[0])}
                      className="d-none" />
                  </div>
                  <div className="d-flex justify-content-center">
                    <p className="dot_btn">1</p>
                  </div>
                </div>

                <div className="col-12 col-lg-4">
                  <div className="input_box"
                    onClick={() => image3Ref?.current?.click()} >

                    <div className="input_inner">
                      {
                        image3 ? <img className="w-100 h-100" src={image1Url3} alt="" /> :
                          <img className="" src={plusIcon.src} alt="" />
                      }

                    </div>
                    <input
                      ref={image3Ref}
                      type="file"
                      name="image3"
                      onChange={(e) => setImage3(e.target.files[0])}
                      className="d-none" />
                  </div>
                  <div className="d-flex justify-content-center">
                    {" "}
                    <p className="dot_btn">2</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 mb-5">
              <label>Upload a video presentation of your company</label>
              <div className="input_box" onClick={(e) => videoInputRef?.current?.click()} >
                <div className="input_inner">
                  {
                    video ? <video controls loop autoPlay muted className="w-100 h-100">
                      <source src={videoUrl} type="video/mp4" />
                    </video> :
                      <>
                        <img src={videoIcon.src} alt="" />
                        <p>Drop your video here or browse</p>
                      </>
                  }
                </div>

                <input
                  type="file"
                  name="video"
                  className="d-none"
                  accept="video/mp4,video/x-m4v,video/*"
                  ref={videoInputRef}
                  onChange={(e) => setVideo(e.target.files[0])}
                />
              </div>
            </div>

            <div className="col-12 col-lg-6 ">
              <div>
                <label>Unit </label>
                <select onClick={(e) => setUnit(e.target.value)} required>
                  <option >Select Unit</option>
                  <option value="a">A</option>
                  <option value="b">B</option>
                  <option value="c">C</option>
                  <option value="d">D</option>
                </select>
              </div>
            </div>

            <div className="col-12 col-lg-6 ">
              <div>
                <label>
                  MOQ <img src={question} alt="" />
                </label>
                <input  {...register("moq", { required: "MOQ is Required" })} type="text" placeholder="MOQ " />
              </div>
            </div>



            <div className="col-12 col-lg-6 ">
              <label>FOB-price</label>
              <div className="d-flex align-items-center gap-5 mb-5">
                <div className="d-flex gap-2 align-items-center">
                  <input
                    type="checkbox"
                    checked={selectedCheckbox === "ladder"}
                    onChange={() => handleCheckboxChange("ladder")}
                  />
                  <span>Ladder price</span>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <input
                    type="checkbox"
                    checked={selectedCheckbox === "onePrice"}
                    onChange={() => handleCheckboxChange("onePrice")}
                  />
                  <span>One price </span>
                </div>
              </div>

              {/* <div style={{ maxWidth: "471px" }}>
                {Array.from({ length: inputSets }).map((_, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center gap-5 mb-3"
                  >
                    <div className="d-flex gap-2 align-items-center">
                      <input
                        id={`special-${index}`}
                        className="mb-0"
                        type="number"
                      />
                      <span> Pieces</span>
                    </div>
                    <div className="d-flex gap-2 align-items-center">
                      <input
                        style={{ width: "129px" }}
                        id={`special-price-${index}`}
                        className="mb-0"
                        type="number"
                      />
                      <span style={{ whiteSpace: "nowrap" }}>euro/ piece </span>
                    </div>
                  </div>
                ))}
                {selectedCheckbox === "ladder" && (
                  <button onClick={handleAddMoreClick} className="add_btn">
                    Add more
                  </button>
                )}
              </div> */}


              <div>
                <label>Price
                </label><br />
                <input {...register("price", { required: true })} name="price" id="special" className="mb-0" type="number" />
              </div><br />


              <div>
                <label>
                  Lead time <img src={question} alt="" />
                </label>
                <div className="d-flex align-items-center gap-4 mb-5">
                  <div className="d-flex gap-4 align-items-center">
                    <input
                      {...register("from", { required: true })}
                      id="special" name="from" className="mb-0" type="number" />
                    <span> -</span>
                  </div>

                  <div className="d-flex gap-4 align-items-center">
                    <input
                      {...register("to", { required: true })}
                      id="special" name="to" className="mb-0" type="number" />
                    <select onChange={(e) => setTime(e.target.value)} id="special" className="mb-0">
                      <option value="days">days</option>
                      <option value="hours">hours</option>
                      <option value="weeks">weeks</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* <div></div>

            <div style={{ maxWidth: "471px", display: "block" }} >
              <h1>Add Product Information</h1>
              {Array.from({ length: inputSets }).map((_, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center gap-5 mb-3"
                >
                  <div className="d-flex gap-2 align-items-center">
                    <input
                      id={`special-${index}`}
                      className="mb-0"
                      type="number"
                    />
                    <span> Pieces</span>
                  </div>
                  <div className="d-flex gap-2 align-items-center">
                    <input
                      style={{ width: "129px" }}
                      id={`special-price-${index}`}
                      className="mb-0"
                      type="number"
                    />
                    <span style={{ whiteSpace: "nowrap" }}>euro/ piece </span>
                  </div>
                </div>
              ))}
              {selectedCheckbox === "ladder" && (
                <button onClick={handleAddMoreClick} className="add_btn">
                  Add more
                </button>
              )}
            </div> */}


            <div className="col-12 mb-5 pb-3">
              <div>
                <label>
                  Product details{" "}
                  <span>(Write a detailed description of your product)</span>{" "}
                </label>
                <textarea
                  {...register("description", { required: "Description is Required" })}
                  rows="16"></textarea>
              </div>
            </div>
            <div className="d-flex gap-2 justify-content-between align-items-center">
              <button type="submit" className="submit_btn" >
                Submit
              </button>
              <button className="save_btn">Save as draft</button>
            </div>
          </div>
        </form>
      </div >
    </div >
  );
};

export default UploadProduct;
