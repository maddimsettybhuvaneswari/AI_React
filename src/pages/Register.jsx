import React, { useState } from "react";
import Dashboard from "./Dashboard";
import API from "../Services/api";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobilenumber] = useState("");
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const handleSignup = async () => {
    if (!name) {
      toast.error("Please Enter a Name");
    }
    if (!email) {
      toast.error("Please Enter a Email");
    }
    if (!mobileNumber) {
      toast.error("Please Enter a mobileNumber");
    }
    if (!password) {
      toast.error("Please Create a password");
    }
    if (email) {
      const res = await API.post("/api/emailExistorNot/", { email });
      if (res.data.status_code === 1) {
        toast.error(
          "The Email is already Exists, Please try with another Email",
        );
      } else {
        const res = await API.post("/api/register/", {
          name,
          email,
          password,
          mobileNumber,
        });

        if (res.data.status_code === 1) {
          toast.success(res.data.message);
          const userId = res.data.user.id;
          localStorage.setItem("userId", userId);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          if (userId) {
            navigate("/login", {
              state: { userId: userId },
            });
          }
        } else {
          toast.error(res.data.message);
        }
      }
    }
  };
  const handleEmailFocus = () => {
    if (!email) {
      setError((prev) => ({ ...prev, email: "Email is required" }));
    } else if (!validateEmail(email)) {
      setError((prev) => ({
        ...prev,
        email: "Please enter a correct email format",
      }));
    } else {
      setError((prev) => ({ ...prev, email: "" }));
    }
  };
  return (
    <div>
      <Dashboard />
      <div className="border-0">
        <div className="flex items-center justify-center h-screen ">
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <h2 className="text-xl font-bold mb-4 text-center">SignUp</h2>
            <input
              placeholder="Enter your name"
              className="w-full border border-gray-300 px-4 py-2 mb-3 rounded-md"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Enter your Email"
              className="w-full border border-gray-300 px-4 py-2 mb-3 rounded-md"
              onChange={(e) => setEmail(e.target.value)}
              onFocus={handleEmailFocus}
            />
            {error.email && <p style={{ color: "red" }}>{error.email}</p>}
            <input
              placeholder="Enter your Number"
              className="w-full border border-gray-300 px-4 py-2 mb-3 rounded-md"
              onChange={(e) => setMobilenumber(e.target.value)}
              onFocus={handleEmailFocus}
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a new password"
              className="w-full border border-gray-300 px-4 py-2 mb-3 rounded-md"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute cursor-pointer text-gray-600 eyeIcon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
            <button
              onClick={handleSignup}
              className="w-full bg-blue-500 text-white py-2 rounded-md mb-4"
            >
              {" "}
              JOIN{" "}
            </button>
            <div>
              Already have an account <br />
              <span
                onClick={() => navigate("/login")}
                className="text-blue-500 cursor-pointer underline"
              >
                {" "}
                Please SignIn
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
