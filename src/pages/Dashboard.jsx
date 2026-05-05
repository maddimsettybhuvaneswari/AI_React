import React, { useEffect, useState } from "react";
import "../styles.css";
import { Link } from "react-router-dom";
import ai from "../Images/ai.jpg";
import { Bot } from "lucide-react";
import { useLocation } from "react-router-dom";
import API from "../Services/api";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GetDoctors from "./doctors/GetDoctors";
import { FaHome } from "react-icons/fa";
import Chatbot from "./Ai/Chatbot";
const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?.userId;
  const [name, setName] = useState("");
  const storageuserid = localStorage.getItem("userId");
  const [openSidebar, setOpenSidebar] = useState(false);
  useEffect(() => {
    console.log("storageId", storageuserid);
    if (id || storageuserid) {
      userData();
    }
  }, [id]);
  const userData = async () => {
    const res = await API.get("/api/userdata/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setName(res.data.user.name);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
    setName("");
  };
  const homeClick = () => {
    navigate("/");
  };
  return (
    <div>
      <div className="w-full bg-blue-450 text-white px-6 py-3 flex items-center justify-between shadow-md">
        <div className="flexes">
          <div>
            <Bot size={56} color="white" />
          </div>
          <div>
            <div>
              <h1
                className="dashboardh"
                style={{ color: "white", fontSize: "20px" }}
              >
                My Dashboard
              </h1>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <FaHome className="cursor-pointer" onClick={homeClick} />
          <Link to="/chatbot" className="classhover">
            AI
          </Link>
          {!storageuserid && (
            <Link to="/register" className="classhover">
              SignUp
            </Link>
          )}

          <span className="cursor-pointer classhover">Profile</span>
          {storageuserid ? (
            <span className="cursor-pointer classhover" onClick={handleLogout}>
              Logout
            </span>
          ) : (
            <Link to="/login" className="classhover">
              Login
            </Link>
          )}

          <div
            className="name"
            onClick={() => setOpenSidebar(true)}
            style={{ cursor: "pointer" }}
          >
            <User size={24} />
            <span>{name}</span>
          </div>
        </div>
      </div>
      <div className={`sidebar ${openSidebar ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setOpenSidebar(false)}>
          ✖
        </button>

        <Link
          to="/add-doctors"
          onClick={() => setOpenSidebar(false)}
          className="cursor-pointer classhover"
        >
          Add Doctors Data
        </Link>

        <Link
          to="/get-doctors"
          onClick={() => setOpenSidebar(false)}
          className="cursor-pointer classhover"
        >
          Doctors List
        </Link>
        <Link
          to="/book-appointment"
          onClick={() => setOpenSidebar(false)}
          className="cursor-pointer classhover"
        >
          Appointment
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
