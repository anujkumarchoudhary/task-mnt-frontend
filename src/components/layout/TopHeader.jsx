// components/Header.js
import React, { useState } from "react";
import Icons from "../ui/Icons";
import Register from "../ui/form/Register";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
const TopHeader = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state?.global);
  console.log(token, "tokensdfnsdkfl");
  const [open, setOpen] = useState(false);
  console.log(open, "open");
  const handleLogout = async () => {
    localStorage.removeItem("token");
    toast.success("Logout Successfully!");
    window.location.reload();
  };

  return (
    <div>
      <div className="flex justify-center md:justify-between px-[5%] py-5 bg-[#FFFFFF] md:bg-[#020202] text-black md:text-white text-sm">
        <div className="hidden md:flex gap-6">
          <h2 className="text-lg font-bold">Task Management</h2>
        </div>
        <div className="flex gap-6">
          {token ? (
            <p onClick={handleLogout}>Logout</p>
          ) : (
            <div
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Icons name={"login"} />
              <span>{"Login"}</span>
            </div>
          )}
        </div>
      </div>
      {open && (
        <Register isRegister={open} handleClose={() => setOpen(false)} />
      )}
    </div>
  );
};

export default TopHeader;
