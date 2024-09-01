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

const schema = z.object({
  password: z.string().min(4, {
    message: "Password required.",
  }),
  username: z.string().min(1, { message: "Username required." }),
});

type FormData = z.infer<typeof schema>;

const Setting = () => {
  const [title] = useState("Setting");
  useDocumentTitle(title);

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
      username: data.username,
      password: data.password,
    };

    axios
      .put(`${baseUrl}/api/v2/auth/update`, updateData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then(() => {
        window.location.reload();
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
              <p className="font-poppins text-white mb-5 text-xl">
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
              {/* Email */}
              <div className="mb-5">
                <label
                  className="text-sm text-gray-500 block font-poppins"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  {...register("username")}
                  type="text"
                  name="username"
                  className="text-black font-poppins font-bold w-full py-4 mt-2 rounded focus:outline-none px-5 shadow shadow-gray-300"
                />
                {errors.username && (
                  <p className="font-poppins bg-red-600 text-xs mt-2 rounded ps-2 py-[2px] text-white">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="mb-10 relative">
                <label
                  className="text-sm text-gray-500 block font-poppins"
                  htmlFor="password"
                >
                  Password
                </label>

                <input
                  {...register("password")}
                  type={passwordType ? "password" : "text"}
                  name="password"
                  className="text-black font-poppins font-bold w-full py-4 mt-2 rounded focus:outline-none px-5 shadow shadow-gray-300"
                />
                <span
                  onClick={() => {
                    setShowPassword(!showPassword);
                    setPasswordType(!passwordType);
                  }}
                  className={`absolute ${
                    showPassword ? "bi-eye" : "bi-eye-slash"
                  } right-2 top-9 cursor-pointer text-black px-2 text-lg border-l border-gray-500`}
                ></span>
                {errors.password && (
                  <p className="font-poppins bg-red-600 text-xs mt-2 rounded ps-2 py-[2px] text-white">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Button */}
              {loader ? (
                <p className="py-3 text-black btn-bg w-full rounded flex justify-center font-poppins shadow shadow-zinc-950 chakra h-12 text-sm">
                  <span className="loader rounded"></span>
                </p>
              ) : (
                <button className="py-3 text-black btn-bg w-full rounded font-poppins shadow shadow-zinc-950 chakra h-12 text-sm">
                  Update
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
