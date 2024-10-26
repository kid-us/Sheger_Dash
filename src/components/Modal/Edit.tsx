import { useEffect } from "react";
import axios from "axios";
import baseUrl from "../../services/request";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import useBrands from "../../hooks/useBrands";
import useCategories from "../../hooks/useCategories";
import Loader from "../Button/Loader";
import Button from "../Button/Button";
import { Shoes } from "../../hooks/useStock";

interface Props {
  id: string;
  onClose: () => void;
}

interface Stock {
  shoe: Shoes;
}

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

const Edit = ({ id, onClose }: Props) => {
  const [loader, setLoader] = useState<boolean>(false);

  const { brands } = useBrands();
  const { categories } = useCategories();
  const [success, setSuccess] = useState<boolean>(false);

  const access_token = localStorage.getItem("admin_token");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  //   Get Size Range
  function getSizeRange(sizeRange: string): {
    startSize: number;
    endSize: number;
  } {
    const [startSize, endSize] = sizeRange.split("-").map(Number);
    return { startSize, endSize };
  }

  // Get Stock
  useEffect(() => {
    axios
      .get<Stock>(`${baseUrl}store/get-shoe?shoe_id=${id}`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((response) => {
        const data = response.data.shoe;
        setValue("name", data.name);
        setValue("quantity", data.stock);
        setValue("price", data.price.toString());
        setValue(
          "sizeStart",
          getSizeRange(data.size_range).startSize.toString()
        );
        setValue("sizeEnd", getSizeRange(data.size_range).endSize.toString());
        setValue("category", data.category);
        setValue("brand", data.brand);
        setValue("description", data.description);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setValue]);

  // Submit Form
  const onSubmit = (data: FieldValues) => {
    setLoader(true);

    const editData = {
      name: data.name,
      stock: data.quantity,
      price: data.price,
      category: data.category,
      brand: data.brand,
      size_range: data.sizeStart + "-" + data.sizeEnd,
      description: data.description,
    };

    axios
      .put(`${baseUrl}store/edit-shoe?shoe_id=${id}`, editData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        console.log(response.data);

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
      <div className="bg-neutral-900/70 fixed top-0 w-full h-[100dvh] z-40"></div>

      <div className="fixed z-[50] w-full top-0">
        <div className="flex justify-center items-center h-[100dvh] w-full">
          <div className="lg:pt-6 py-8 px-8 bg rounded overflow-y-scroll lg:w-[60%] h-[95dvh] lg:mx-0 mx-2">
            {success && (
              <p className="fixed top-20 bi-check-circle-fill bg-green-600 text-white rounded p-1 mb-5">
                <span className="mx-2"></span>
                Product updated successfully.
              </p>
            )}

            {/* Form */}
            <div className="flex justify-between">
              <p>Edit Shoes</p>
              <button
                onClick={() => onClose()}
                className="bi-x-lg text-red-500 text-xl"
              ></button>
            </div>
            <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="lg:grid grid-cols-2 gap-x-7">
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
                      className={`focus:outline-none px-4 h-11 rounded shadow placeholder:text-gray-500 text-md w-full my-2`}
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
                      className={`focus:outline-none px-4 h-11 rounded shadow placeholder:text-gray-500 text-md w-full my-2`}
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
                      className={`focus:outline-none px-4 h-11 rounded shadow placeholder:text-gray-500 text-md w-full my-2`}
                    />

                    {errors.price && (
                      <p className="text-xs mb-2 text-red-700 rounded">
                        {errors.price.message}
                      </p>
                    )}
                  </div>

                  <div className="lg:block hidden mt-4 text-center">
                    {loader ? <Loader /> : <Button label="Upload" />}
                  </div>
                </div>
                <div>
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
                        className={`focus:outline-none px-4 h-11 rounded shadow placeholder:text-gray-500 text-md w-full my-2 font-poppins`}
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
                        className={`focus:outline-none px-4 h-11 rounded shadow placeholder:text-gray-500 text-md w-full my-2 font-poppins`}
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
                        className={`focus:outline-none px-4 h-11 rounded shadow placeholder:text-gray-500 text-md w-full my-2`}
                      />

                      {errors.sizeStart && (
                        <p className="text-xs mb-2 text-red-700 rounded">
                          {errors.sizeStart.message}
                        </p>
                      )}
                    </div>
                    {/* End */}
                    <div className="">
                      <label
                        htmlFor="sizeEnd"
                        className="text-gray-500 text-sm"
                      >
                        Size to
                      </label>
                      <input
                        {...register("sizeEnd")}
                        type="text"
                        name="sizeEnd"
                        className={`focus:outline-none px-4 h-11 rounded shadow placeholder:text-gray-500 text-md w-full my-2`}
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
                      className="h-32 font-poppins resize-none bg-white shadow focus:outline-none rounded mt-3 w-full px-4 pt-2"
                    ></textarea>

                    {errors.description && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  <div className="lg:hidden block mt-4 text-center">
                    {loader ? <Loader /> : <Button label="Upload" />}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
