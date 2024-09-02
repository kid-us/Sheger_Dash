import Nav from "../Dashboard/Nav";
import Sidebar from "../Dashboard/Sidebar";
import SmallNavbar from "../Dashboard/SmallNav";
import { ChangeEvent, useRef, useState } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Loader from "../Button/Loader";
import Button from "../Button/Button";
import axios from "axios";
import baseUrl from "../../services/request";
import useBrands from "../../hooks/useBrands";
import useCategories from "../../hooks/useCategories";

const schema = z.object({
  description: z.string().min(10, {
    message: "Description required and must be grater than 10 chars.",
  }),
  price: z.string().min(1, {
    message: "Price required.",
  }),
  quantity: z.string().min(1, {
    message: "Quantity required.",
  }),
  category: z.string().min(1, {
    message: "Categories required.",
  }),
  brand: z.string().min(1, {
    message: "Brand required.",
  }),
  sizeStart: z.string().min(1, {
    message: "Start size required.",
  }),
  sizeEnd: z.string().min(1, {
    message: "End size required.",
  }),
  name: z
    .string()
    .min(4, { message: "Name required and must be greater than 4 chars.." }),
});

type FormData = z.infer<typeof schema>;

const Uploads = () => {
  // const access_token = localStorage.getItem("token");

  const [title] = useState<string>("Upload");
  useDocumentTitle(title);

  const { brands } = useBrands();
  const { categories } = useCategories();

  const inputRef = useRef<HTMLInputElement>(null);

  const [loader, setLoader] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  // Shoes Picture
  const [shoesImage, setShoesImage] = useState<File | null>(null);
  const [optionalImg1, setOptionalImg1] = useState<File | null>(null);
  const [optionalImg2, setOptionalImg2] = useState<File | null>(null);
  const [optionalImg3, setOptionalImg3] = useState<File | null>(null);
  const [optionalImg4, setOptionalImg4] = useState<File | null>(null);
  const [optionalImg5, setOptionalImg5] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  //  Handle Shoes file Change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const cover = e.target.files[0];
      const previewURL = URL.createObjectURL(cover);
      setShoesImage(cover);
      setPreview(previewURL);
    }
  };

  // Handle shoes file Removed
  const handleFileRemoved = () => {
    setPreview("");
    setPreview("");
    setShoesImage(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // Optional Image
  const handleOptionalFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    fileNumber: number
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const img = e.target.files[0];
      if (fileNumber === 1) {
        setOptionalImg1(img);
      } else if (fileNumber === 2) {
        setOptionalImg2(img);
      } else if (fileNumber === 3) {
        setOptionalImg3(img);
      } else if (fileNumber === 4) {
        setOptionalImg4(img);
      } else if (fileNumber === 5) {
        setOptionalImg5(img);
      }
    }
  };

  // Submit Form
  const onSubmit = (data: FieldValues) => {
    // Shoes Validation
    if (shoesImage === null) {
      setError(true);
      return;
    }

    setError(false);
    setLoader(true);

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("stock", data.quantity);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("brand", data.brand);
    formData.append("size_range", data.sizeStart + "-" + data.sizeEnd);
    formData.append("description", data.description);
    // Images
    formData.append("main_img", shoesImage);
    if (optionalImg1) formData.append("optional_img1", optionalImg1);
    if (optionalImg2) formData.append("optional_img2", optionalImg2);
    if (optionalImg3) formData.append("optional_img3", optionalImg3);
    if (optionalImg4) formData.append("optional_img4", optionalImg4);
    if (optionalImg5) formData.append("optional_img5", optionalImg5);

    axios
      .post(`${baseUrl}store/create-item`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        setLoader(false);
        console.error(error);
      });
  };

  return (
    <>
      <div className="relative lg:grid md:grid grid-cols-11">
        {/* Small device Navbar */}
        <SmallNavbar active="Upload" />
        {/* Sidebar */}
        <div className="lg:col-span-2 w-full">
          {/* <div className=""> */}
          <Sidebar active="Upload" />
          {/* </div> */}
        </div>
        <div className="lg:col-span-9 md:col-span-10 lg:p-8 p-3">
          {/* Nav */}
          <Nav />

          {/* Upload */}
          <div className="flex my-8 justify-between">
            <p className="text-black font-poppins text-xl">Upload Shoes</p>

            {success && (
              <p className="rounded bg-green-500 text-white shadow w-96 text-center p-1">
                Shoes product uploaded successfully!
              </p>
            )}
          </div>
          <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="lg:grid grid-cols-2 gap-x-10">
              {/* Image */}
              <div>
                {/* Main Picture */}
                <div className={``}>
                  <p className="text-gray-600">Shoes main Image</p>
                  {!preview && (
                    <div
                      className={`border rounded bg-white shadow shadow-zinc-900 h- p-1 my-2`}
                    >
                      <input
                        ref={inputRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        name="upload-file"
                        id="upload-file"
                        onChange={handleFileChange}
                      />
                      {!preview && (
                        <label htmlFor="upload-file" className="cursor-pointer">
                          <div className="flex flex-col text-center px-10 py-8">
                            <i className="bi-cloud-arrow-up-fill text-5xl text-black"></i>
                            <p className="text-gray-800 uppercase">Upload</p>
                          </div>
                        </label>
                      )}
                    </div>
                  )}

                  {/* Image Preview */}
                  <div className="relative my-2">
                    {preview && (
                      <>
                        <img
                          src={preview}
                          alt={`preview`}
                          className="h-72 w-full object-contain border rounded-lg"
                        />

                        <div
                          onClick={() => handleFileRemoved()}
                          className="absolute -top-2 right-3 z-10"
                        >
                          <p className="bi-x bg-red-700 shadow shadow-zinc-900 h-6 w-6 pt-1 rounded-full text-center cursor-pointer text-white text-sm"></p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                {error && (
                  <p className="text-red-500 text-sm mt-3">
                    Please upload main shoes image.
                  </p>
                )}

                {/* Optional Images */}
                <div>
                  <label
                    htmlFor="name"
                    className="text-gray-500 text-sm block mb-3"
                  >
                    Optional Images choose 5 optional images
                  </label>
                  {/* 1 */}
                  <input
                    type="file"
                    className={`pt-2 ps-2 w-full ${
                      optionalImg1 !== null ? "bg-green-500" : "bg-white"
                    } rounded h-11 shadow shadow-zinc-900 mb-3`}
                    accept="image/*"
                    name="upload-file"
                    onChange={(e) => handleOptionalFileChange(e, 1)}
                  />
                  {/* 2 */}
                  <input
                    type="file"
                    className={`pt-2 ps-2 w-full ${
                      optionalImg2 !== null ? "bg-green-500" : "bg-white"
                    } rounded h-11 shadow shadow-zinc-900 mb-3`}
                    accept="image/*"
                    name="upload-file"
                    onChange={(e) => handleOptionalFileChange(e, 2)}
                  />
                  {/* 3 */}
                  <input
                    type="file"
                    className={`pt-2 ps-2 w-full ${
                      optionalImg3 !== null ? "bg-green-500" : "bg-white"
                    } rounded h-11 shadow shadow-zinc-900 mb-3`}
                    accept="image/*"
                    name="upload-file"
                    onChange={(e) => handleOptionalFileChange(e, 3)}
                  />
                  {/* 4 */}
                  <input
                    type="file"
                    className={`pt-2 ps-2 w-full ${
                      optionalImg4 !== null ? "bg-green-500" : "bg-white"
                    } rounded h-11 shadow shadow-zinc-900 mb-3`}
                    accept="image/*"
                    name="upload-file"
                    onChange={(e) => handleOptionalFileChange(e, 4)}
                  />
                  {/* 5 */}
                  <input
                    type="file"
                    className={`pt-2 ps-2 w-full ${
                      optionalImg5 !== null ? "bg-green-500" : "bg-white"
                    } rounded h-11 shadow shadow-zinc-900 mb-3`}
                    accept="image/*"
                    name="upload-file"
                    onChange={(e) => handleOptionalFileChange(e, 5)}
                  />
                </div>

                <div className="mt-4 text-center">
                  {loader ? <Loader /> : <Button label="Upload" />}
                </div>
              </div>
              {/* Forms */}
              <div>
                {/* Name */}
                <div className="">
                  <label htmlFor="name" className="text-gray-500 text-sm">
                    Name
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    name="name"
                    className={`focus:outline-none px-4 h-11 rounded shadow shadow-zinc-900 placeholder:text-gray-500 text-md w-full my-2`}
                  />

                  {errors.name && (
                    <p className="text-xs mb-2 text-red-700 rounded">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Quantity */}
                <div className="">
                  <label htmlFor="quantity" className="text-gray-500 text-sm">
                    Stock
                  </label>
                  <input
                    {...register("quantity")}
                    type="text"
                    name="quantity"
                    className={`focus:outline-none px-4 h-11 rounded shadow shadow-zinc-900 placeholder:text-gray-500 text-md w-full my-2`}
                  />

                  {errors.quantity && (
                    <p className="text-xs mb-2 text-red-700 rounded">
                      {errors.quantity.message}
                    </p>
                  )}
                </div>
                {/* Price */}
                <div className="">
                  <label htmlFor="price" className="text-gray-500 text-sm">
                    Price
                  </label>
                  <input
                    {...register("price")}
                    type="text"
                    name="price"
                    className={`focus:outline-none px-4 h-11 rounded shadow shadow-zinc-900 placeholder:text-gray-500 text-md w-full my-2`}
                  />

                  {errors.price && (
                    <p className="text-xs mb-2 text-red-700 rounded">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                {/* Category and Brand */}
                <div className="grid grid-cols-2 gap-x-5">
                  {/* Category */}
                  <div className="">
                    <label
                      htmlFor="sizeStart"
                      className="text-gray-500 text-sm"
                    >
                      Category
                    </label>
                    <select
                      {...register("category")}
                      name="category"
                      className={`focus:outline-none px-4 h-11 rounded shadow shadow-zinc-900 placeholder:text-gray-500 text-md w-full my-2 font-poppins`}
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.category_names}>
                          {c.category_names}
                        </option>
                      ))}
                    </select>

                    {errors.category && (
                      <p className="text-xs mb-2 text-red-700 rounded">
                        {errors.category.message}
                      </p>
                    )}
                  </div>
                  {/* Brand */}
                  <div className="">
                    <label
                      htmlFor="sizeStart"
                      className="text-gray-500 text-sm"
                    >
                      Brand
                    </label>
                    <select
                      {...register("brand")}
                      name="brand"
                      className={`focus:outline-none px-4 h-11 rounded shadow shadow-zinc-900 placeholder:text-gray-500 text-md w-full my-2 font-poppins`}
                    >
                      {brands.map((b) => (
                        <option key={b.id} value={b.brand_names}>
                          {b.brand_names}
                        </option>
                      ))}
                    </select>

                    {errors.brand && (
                      <p className="text-xs mb-2 text-red-700 rounded">
                        {errors.brand.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Size */}
                <div className="grid grid-cols-2 gap-x-5">
                  {/* Start */}
                  <div className="">
                    <label
                      htmlFor="sizeStart"
                      className="text-gray-500 text-sm"
                    >
                      Size from
                    </label>
                    <input
                      {...register("sizeStart")}
                      type="text"
                      name="sizeStart"
                      className={`focus:outline-none px-4 h-11 rounded shadow shadow-zinc-900 placeholder:text-gray-500 text-md w-full my-2`}
                    />

                    {errors.sizeStart && (
                      <p className="text-xs mb-2 text-red-700 rounded">
                        {errors.sizeStart.message}
                      </p>
                    )}
                  </div>
                  {/* End */}
                  <div className="">
                    <label htmlFor="sizeEnd" className="text-gray-500 text-sm">
                      Size to
                    </label>
                    <input
                      {...register("sizeEnd")}
                      type="text"
                      name="sizeEnd"
                      className={`focus:outline-none px-4 h-11 rounded shadow shadow-zinc-900 placeholder:text-gray-500 text-md w-full my-2`}
                    />

                    {errors.sizeEnd && (
                      <p className="text-xs mb-2 text-red-700 rounded">
                        {errors.sizeEnd.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="">
                  <label
                    htmlFor="description"
                    className="text-gray-500 text-sm"
                  >
                    Description
                  </label>
                  <textarea
                    {...register("description")}
                    name="description"
                    className="h-28 font-poppins resize-none bg-white shadow shadow-zinc-900 focus:outline-none rounded mt-3 w-full px-4 pt-2"
                  ></textarea>

                  {errors.description && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Uploads;
