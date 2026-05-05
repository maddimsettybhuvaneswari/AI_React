import React, { useState } from "react";
import API from "../Services/api";
import Dashboard from "./Dashboard";
import Forgetpassword from "./Forgetpassword";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [emailcode, setEmailcode] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [newpassword, setNewPassword] = useState("");
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const handleLogin = async () => {
    if (!form.email) {
      toast.error("Please Enter a Email");
    }
    if (!form.password) {
      toast.error("Please Enter a Password");
    }
    if (!validateEmail(form.email)) {
      setError((prev) => ({
        ...prev,
        email: "Please enter a correct email format",
      }));
    }
    if (form.email) {
      const res = await API.post("/api/emailExistorNot/", {
        email: form.email,
      });
      if (res.data.status_code === 0) {
        setError((prev) => ({
          ...prev,
          email: "We don't have an account with this email address.",
        }));
        toast.error("Invalid Email");
        return;
      } else {
        const res = await API.post("/api/login/", form);

        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user_id", res.data.user_id);
        }
        if (res.data.status_code === 1) {
          toast.success(res.data.message);
          const userId = res.data.user_id;
          localStorage.setItem("userId", userId);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          if (userId) {
            navigate("/", {
              state: { userId: userId },
            });
          }
        } else if (res.data.status_code === 0) {
          toast.error(res.data.message);
        }
      }
    }
  };
  const handlePasswordFocus = () => {
    if (!form.email) {
      setError((prev) => ({ ...prev, email: "Email is required" }));
    } else if (!validateEmail(form.email)) {
      setError((prev) => ({
        ...prev,
        email: "Please enter a correct email format",
      }));
    } else {
      setError((prev) => ({ ...prev, email: "" }));
    }
  };
  const forgetPassword = () => {
    navigate("/forgot-password");
  };
  return (
    <div>
      <Dashboard />
      <div className="border-0">
        <div className="flex items-center justify-center h-screen ">
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <div className="loginmain">
              <div className="loginheading">
                <h2 className="login">Login</h2>
                <div className="logins">
                  {" "}
                  New User?
                  <span
                    onClick={() => navigate("/register")}
                    className="text-blue-800 cursor-pointer underline"
                  >
                    Create an account
                  </span>
                </div>
              </div>

              <input
                placeholder="Email"
                className="w-full border border-gray-300 px-4 py-2 mb-3 mt-4 rounded-md inputbox 
                focus:border-blue-800 focus:outline-none"
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  setError("");
                }}
              />

              {error.email && <p style={{ color: "red" }}>{error.email}</p>}

              <br />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border border-gray-300 px-4 py-2 mb-3 rounded-md inputbox 
             focus:border-blue-800 focus:outline-none"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                onFocus={handlePasswordFocus}
              />
              <span
                className="absolute cursor-pointer text-gray-600 eyeIcon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
              <div className="forget">
                <span
                  onClick={forgetPassword}
                  className="text-blue-800 cursor-pointer underline "
                >
                  Forgot Password?
                </span>
              </div>
              <button
                onClick={handleLogin}
                className="w-full bg-blue-500 text-white py-2 rounded-md mb-4 mt-4 "
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
