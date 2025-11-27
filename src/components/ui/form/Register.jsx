import React, { useState } from "react";
import InputField from "../InputField";
import Button from "../Button";
import Icons from "../Icons";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, setUser } from "@/redux/slices/userSlice";
import { toast } from "react-toastify";
import { setGlobalData } from "@/redux/slices/globalSlice";

const Register = ({ handleClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [inputVal, setInputVal] = useState({
    name: "",
    email: "",
    role: "user",
    password: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputVal({ ...inputVal, [name]: value });
  };

  const handleRegister = async () => {
    try {
      const res = await dispatch(registerUser(inputVal));

      if (res?.payload?.status === 201) {
        toast.success(res?.payload?.data?.message);
        handleClose();
      }
    } catch (err) {
      if (err.status == 404) {
        toast.error(err.response.data.message);
      }
      if (err.status == 401) {
        toast.error(err.response.data.message);
      }
    }
  };

  const handleLogin = async () => {
    try {
      const res = await dispatch(loginUser(inputVal));
      const { token, message, userInfo } = res.payload;
      console.log(res, "res.payloadJOJKSL");
      localStorage.setItem("token", token);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      dispatch(setUser(token));

      if (res.payload) {
        toast.success(res.payload.message);
        handleClose();
        window.location.reload();
      }
    } catch (err) {
      if (err.status == 404) {
        toast.error(err.response.data.message);
      }
      if (err.status == 401) {
        toast.error(err.response.data.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-10">
      <div className="relative bg-white space-y-4 p-10 rounded-lg shadow-lg w-[90%] md:w-1/2 max-w-md text-center">
        <p className="text-2xl font-bold">{isRegister ? "Sign Up" : "Login"}</p>
        <Icons
          name={"close"}
          handleClick={handleClose}
          color="#D42E1F"
          className="absolute top-4 right-4 cursor-pointer"
        />
        {isRegister && (
          <InputField
            name={"name"}
            value={inputVal.name}
            handleChange={handleChange}
            placeholder={"Name"}
          />
        )}

        <InputField
          name={"email"}
          value={inputVal.email}
          handleChange={handleChange}
          placeholder={"Email"}
        />
        <InputField
          name={"password"}
          value={inputVal.password}
          handleChange={handleChange}
          placeholder={"Password"}
        />
        <Button
          handleClick={isRegister ? handleRegister : handleLogin}
          name={isRegister ? "Register" : "Login"}
          isBorder={true}
          className={"w-full"}
        />
        <p
          onClick={() => setIsRegister((prev) => !prev)}
          className="cursor-pointer"
        >
          {isRegister
            ? "Do you need an account? Login"
            : "Do dothave an account? Register"}
        </p>
      </div>
    </div>
  );
};

export default Register;
