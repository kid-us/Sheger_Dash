import z from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../services/request";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Button from "../Button/Button";
import Loader from "../Button/Loader";

const schema = z.object({
  password: z.string().min(1, {
    message: "Password required.",
  }),
  username: z.string().min(1, { message: "Username required" }),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const [title] = useState("Login");
  useDocumentTitle(title);

  const navigate = useNavigate();

  const [loader, setLoader] = useState<boolean>(false);
  const [loginError, setLoginError] = useState(false);
  const [passwordType, setPasswordType] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    setLoader(true);

    const logData = {
      username: data.username,
      password: data.password,
    };

    axios
      .post(`${baseUrl}admin/login`, logData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        localStorage.setItem("token", response.data.access_token);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
        setLoginError(true);
      });
  };

  return (
    <div className="bg h-[100dvh] w-full">
      <div className="container mx-auto flex justify-center items-center h-full">
        <div className="lg:w-[40%] bg2 rounded p-10 lg:mx-0 mx-2">
          <p className="font-poppins">Welcome back Admin</p>
          <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
            {loginError && (
              <p className="text-sm text-white mb-5 bg-red-700 rounded ps-2 py-2 text-center bi-heartbreak font-poppins">
                &nbsp; Invalid username and Password.
              </p>
            )}
            {/* Username */}
            <div className="bg-white rounded-md overflow-hidden lg:mb-4 mb-4 grid grid-cols-13 h-14 shadow shadow-zinc-900">
              <div className="col-span-2">
                <p className="bi-person-fill text-2xl text-center pt-3"></p>
              </div>
              <div className="col-span-11 border-l w-full">
                <input
                  {...register("username")}
                  type="text"
                  name="username"
                  className={`focus:outline-none px-3 h-full placeholder:text-gray-400 text-md w-full`}
                  placeholder="Username"
                />
              </div>
            </div>
            {errors.username && (
              <p className="text-xs mb-5 text-red-700 rounded ps-2">
                {errors.username.message}
              </p>
            )}

            {/* Password */}
            <div className="bg-white rounded-md lg:mb-4 mb-4 grid grid-cols-13 h-14 shadow shadow-zinc-900">
              <div className="col-span-2">
                <p className="bi-lock-fill text-2xl text-center pt-3"></p>
              </div>
              <div className="col-span-9 border-l border-r w-full">
                <input
                  {...register("password")}
                  type={!passwordType ? "text" : "password"}
                  name="password"
                  className={`focus:outline-none px-3 h-full placeholder:text-gray-400 text-md w-full`}
                  placeholder="Password"
                />
              </div>
              <div
                onClick={() => setPasswordType(!passwordType)}
                className="col-span-2 cursor-pointer pt-3"
              >
                <p
                  className={` ${
                    passwordType ? "bi-eye-fill" : "bi-eye-slash-fill"
                  } text-xl pt-1 text-center`}
                ></p>
              </div>
            </div>

            {errors.password && (
              <p className="text-xs text-white mb-5 bg-red-700 rounded ps-2 py-1">
                {errors.password.message}
              </p>
            )}

            <div className="mt-8 text-center">
              {loader ? <Loader /> : <Button label="Login" />}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
