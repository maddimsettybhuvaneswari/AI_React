import React, { useState, useEffect } from "react";
import API from "../Services/api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
const Forgetpassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [newpassword, setNewpassword] = useState();
  const [retypepassword, setRetypepassword] = useState();
  const [error, setError] = useState("");
  const [id, setId] = useState();
  const [showPassword, setShowPassword] = useState(false);
  // const [newpassword, setNewPassword] = useState("");

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const handlePasswordFocus = async () => {
    if (!validateEmail(email)) {
      toast.error("Invalid Email");
      setError((prev) => ({
        ...prev,
        email: "Please enter a correct email format",
      }));
    }
    if (email) {
      const res = await API.post("/api/emailExistorNot/", {
        email: email,
      });
      if (res.data.status_code === 0) {
        setError((prev) => ({
          ...prev,
          email: "We don't have an account with this email address.",
        }));
      }
    }
  };
  const handleConfirm = async () => {
    if (!email) {
      toast.error("Please Enter an Email");
    }
    if (!newpassword) {
      toast.error("Please create password");
    }
    if (!retypepassword) {
      toast.error("Please Retype Password");
    }
    if (email) {
      const res = await API.post("/api/emailExistorNot/", {
        email: email,
      });

      if (res.data.status_code === 0) {
        setError((prev) => ({
          ...prev,
          email: "We don't have an account with this email address.",
        }));
        toast.error("We don't have an account with this email address.");
        return;
      }
      const userId = res.data.existemail.id;
      if (newpassword === retypepassword) {
        const res = await API.post("/api/updatepassword/", {
          id: userId,
          email,
          retypepassword,
        });
        if (res.data.status_code === 1) {
          toast.success(res.data.message);
          navigate("/login");
        }
      }
    }
  };
  const handleEnter = async () => {
    if (email) {
      if (!validateEmail(email)) {
        toast.error("Please enter a correct email format");
      }
      const res = await API.post("/api/emailExistorNot/", {
        email: email,
      });
      if (res.data.status_code === 0) {
        setError((prev) => ({
          ...prev,
          email: "We don't have an account with this email address.",
        }));
        toast.error("Invalid Email");
      }
    }
  };
  const closeforgetpassword = () => {
    navigate("/login");
  };
  return (
    <div>
      <div className="border-0">
        <div className="flex items-center justify-center h-screen ">
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <div className="forgot">
              <h2> Forgot Password</h2>
              <FaTimes
                className="cursor-pointer text-black-500"
                onClick={closeforgetpassword}
              />
            </div>
            <input
              placeholder="Enter Email"
              className="w-full border border-gray-300 px-4 py-2 mb-3 mt-4 rounded-md inputbox 
             focus:border-blue-800 focus:outline-none"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleEnter();
                }
              }}
            />
            {error.email && <p style={{ color: "red" }}>{error.email}</p>}
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              className="w-full border border-gray-300 px-4 py-2 mb-3 mt-4 rounded-md inputbox 
             focus:border-blue-800 focus:outline-none"
              onChange={(e) => {
                setNewpassword(e.target.value);
                setError("");
              }}
              onFocus={handlePasswordFocus}
            />
            <span
              className="absolute cursor-pointer text-gray-600 eyeIcon eyeIcon2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Re-type Password"
              className={`w-full px-4 py-2 mb-3 mt-4 rounded-md focus:outline-none 
    ${
      retypepassword && newpassword !== retypepassword
        ? "border-2 border-red-500"
        : "border border-gray-300"
    }`}
              onChange={(e) => {
                setRetypepassword(e.target.value);
              }}
            />
            <span
              className="absolute cursor-pointer text-gray-600 eyeIcon eyeIcon2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
            {retypepassword && newpassword !== retypepassword && (
              <p className="text-red-500">Passwords do not match</p>
            )}
            <button
              onClick={handleConfirm}
              className="w-full bg-blue-500 text-white py-2 rounded-md mb-4 mt-4 "
            >
              Confirm
            </button>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default Forgetpassword;
