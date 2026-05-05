import { useEffect, useState } from "react";
import React from "react";
import API from "../../Services/api";
import Dashboard from "../Dashboard";
import { FaBuilding, FaStethoscope, FaBriefcase } from "react-icons/fa";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GetDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const storageuserid = localStorage.getItem("userId");
  const [name, setName] = useState("");
  const [doctorid, setDoctorid] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getDoctorsData();
    console.log("id", storageuserid);
  }, []);

  const getDoctorsData = async () => {
    const res = await API.get("/api/getDoctorsdata/");
    console.log("doctors getting data", res.data);
    setDoctors(res.data.data);
  };
  const bookAppointment = (id) => {
    navigate(`/book-appointment/${id}`);
  };
  return (
    <div>
      <div>
        <Dashboard />
      </div>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Doctors List</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition duration-300"
            >
              {/* Image */}
              <div className="flex justify-center mb-4">
                <img
                  src={
                    doc.image
                      ? doc.image
                      : "https://ui-avatars.com/api/?name=" + doc.name
                  }
                  alt="doctor"
                  className="w-20 h-20 rounded-full object-cover border"
                />
              </div>

              {/* Name */}
              <h2 className="text-lg font-semibold text-center">{doc.name}</h2>

              <p className="text-center text-blue-600 font-medium mb-2">
                {doc.profession}
              </p>

              {/* Details */}
              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex1">
                  <div className="flex items-center justify-center gap-2">
                    <FaStethoscope color="blue" />
                    <span>{doc.specialization}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    {" "}
                    <FaBuilding style={{ color: "blue" }} />{" "}
                    <span>{doc.hospitalname} </span>
                  </div>
                </div>
                <div className="flex2">
                  <div className="flex items-center justify-center gap-2">
                    <MapPin style={{ color: "blue" }} />{" "}
                    <span>{doc.hospital_location}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <FaBriefcase style={{ color: "blue" }} />{" "}
                    <span> {doc.experience} years </span>
                  </div>
                </div>
                <div className="flex3">
                  <a href={`tel:${doc.mobilenumber}`}>
                    <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600">
                      <i className="fa-solid fa-phone"></i>Call
                    </button>
                  </a>
                  {/* <button
                    className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                    onClick={bookAppointment}
                  >
                    Book Appointment
                  </button> */}
                  {doctors.map((doctor) => (
                    <div key={doctor.id}>
                      <button
                        className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                        onClick={() => bookAppointment(doctor.id)}
                      >
                        Book Appointment
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetDoctors;
