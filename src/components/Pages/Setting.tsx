import Nav from "../Dashboard/Nav";
import Sidebar from "../Dashboard/Sidebar";
import SmallNavbar from "../Dashboard/SmallNav";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import baseUrl from "../../services/request";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Loader from "../Button/Loader";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  password: z.string({
    message: "Old Password required.",
  }),
  oldPassword: z.string().min(4, {
    message: "New Password required and must be 4 characters long.",
  }),
});

type FormData = z.infer<typeof schema>;

const Setting = () => {
  const [title] = useState("Setting");
  useDocumentTitle(title);

  const navigate = useNavigate();

  const access_token = localStorage.getItem("token");

  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState(true);
  const [updateError, setUpdateError] = useState("");
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    setLoader(true);

    const updateData = {
      old_password: data.oldPassword,
      new_password: data.password,
    };

    axios
      .put(`${baseUrl}admin/change-password`, updateData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then(() => {
        localStorage.clear();
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
        setUpdateError("Something went wrong!");
      });
  };

  return (
    <>
      <div className="relative lg:grid md:grid grid-cols-11">
        {/* Small device Navbar */}
        <SmallNavbar active="Setting" />
        {/* Sidebar */}
        <div className="lg:col-span-2 w-full">
          {/* <div className=""> */}
          <Sidebar active="Setting" />
          {/* </div> */}
        </div>
        <div className="lg:col-span-9 md:col-span-10 lg:p-8">
          {/* Nav */}
          <Nav />
          <div className="lg:grid grid-cols-2 bg2 rounded lg:p-8 lg:mx-0 mx-1 p-5 mt-10">
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="font-poppins mb-5 text-xl">
                Update your credentials
              </p>
              {/* Update error */}
              {updateError !== "" && (
                <div className="relative">
                  <p className="bg-red-600 rounded px-1 py-[2px] text-white font-poppins text-sm mb-3">
                    <span className="bi-exclamation-triangle-fill me-4"></span>
                    {updateError}
                  </p>
                </div>
              )}

              {/* Old Password */}
              <div className="mb-5 relative">
                <label
                  className="text-sm text-gray-700 block font-poppins"
                  htmlFor="oldPassword"
                >
                  Old Password
                </label>
                <div className="grid grid-cols-12 bg-white mt-2 rounded shadow shadow-zinc-900 overflow-hidden">
                  <div className="col-span-11">
                    <input
                      {...register("oldPassword")}
                      type={passwordType ? "password" : "text"}
                      name="oldPassword"
                      className="text-black font-poppins w-full py-4 focus:outline-none ps-3"
                    />
                  </div>
                  <p
                    onClick={() => {
                      setShowPassword(!showPassword);
                      setPasswordType(!passwordType);
                    }}
                    className={`${
                      showPassword ? "bi-eye" : "bi-eye-slash"
                    } cursor-pointer text-black text-center text-lg pt-4 border-l border-gray-300`}
                  ></p>
                </div>
                {errors.oldPassword && (
                  <p className="font-poppins text-red-600 text-xs mt-2 rounded py-[2px]">
                    {errors.oldPassword.message}
                  </p>
                )}
              </div>

              {/* NewPassword */}
              <div className="mb-10 relative">
                <label
                  className="text-sm text-gray-700 block font-poppins"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="grid grid-cols-12 bg-white mt-2 rounded shadow shadow-zinc-900 overflow-hidden">
                  <div className="col-span-11">
                    <input
                      {...register("password")}
                      type={passwordType ? "password" : "text"}
                      name="password"
                      className="text-black font-poppins w-full py-4 focus:outline-none ps-3"
                    />
                  </div>
                  <p
                    onClick={() => {
                      setShowPassword(!showPassword);
                      setPasswordType(!passwordType);
                    }}
                    className={`${
                      showPassword ? "bi-eye" : "bi-eye-slash"
                    } cursor-pointer text-black text-center text-lg pt-4 border-l border-gray-300`}
                  ></p>
                </div>
                {errors.password && (
                  <p className="font-poppins text-red-600 text-xs mt-2 rounded py-[2px]">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Button */}
              {loader ? <Loader /> : <Button label="Update" />}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
