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
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import baseUrl from "../../services/request";
// import useDocumentTitle from "../../hooks/useDocumentTitle";
// import Button from "../Button/Button";
// import Loader from "../Button/Loader";

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
  const [title] = useState<string>("Zusebingo | Dashboard");
  useDocumentTitle(title);

  const inputRef = useRef<HTMLInputElement>(null);

  const [loader, setLoader] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  // Cover Picture
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  //  Handle Course  Cover file Change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const cover = e.target.files[0];
      const previewURL = URL.createObjectURL(cover);
      setCoverFile(cover);
      setPreview(previewURL);
    }
  };

  // Handle Course  Cover file Removed
  const handleFileRemoved = () => {
    setPreview("");
    setPreview("");
    setCoverFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const onSubmit = (data: FieldValues) => {
    // Cover page Vaidation
    if (coverFile === null) {
      setError(true);
      return;
    }

    setError(false);
    setLoader(true);
    console.log(data);
  };
  // const access_token = localStorage.getItem("token");

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
          <p className="text-black font-poppins my-8 text-xl">Upload Shoes</p>
          <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="lg:grid grid-cols-2 gap-x-10">
              {/* {loginError && (
                <p className="text-sm text-white mb-5 bg-red-700 rounded ps-2 py-2 text-center bi-heartbreak font-poppins">
                  &nbsp; Invalid username and Password.
                </p>
              )} */}

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
                          className="absolute -top-2 -left-3 z-10"
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
                    Quantity
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
              </div>

              <div>
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
                      <option value="men">Men</option>
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
                      <option value="nike">Nike</option>
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
                      Start from
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
                    className="h-24 font-poppins resize-none bg-white shadow shadow-zinc-900 focus:outline-none rounded mt-3 w-full px-4 pt-2"
                  ></textarea>

                  {errors.description && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4 text-center">
                {loader ? <Loader /> : <Button label="Upload" />}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Uploads;
