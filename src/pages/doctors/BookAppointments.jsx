import React, { useState, useEffect } from "react";
import API from "../../Services/api";
import Dashboard from "../Dashboard";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { ArrowLeft } from "lucide-react";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";

const BookAppointments = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(true);
  const [hide, setHide] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [appointmentsState, setAppointmentsState] = useState(appointments);

  const { id } = useParams();
  console.log("Doctors", id);
  const storageuserid = localStorage.getItem("userId");
  useEffect(() => {
    if (id) {
      setShow(true);
      getAppointments();
    } else {
      getAppointments();
      setShow(false);
    }
  }, []);

  const toggleStatus = (id, status) => {
    console.log("toggles");
    const updated = appointments.map((doc) =>
      doc.id === id ? { ...doc, status: status == 1 ? 0 : 1 } : doc,
    );

    setAppointments(updated);
  };

  const getAppointments = async () => {
    const res = await API.get("/api/getAppointments/", {
      params: {
        user_id: storageuserid,
      },
    });
    if (res.data.status_code === 1) {
      setAppointments(res.data.data);
    }
  };
  const handleSubmit = async () => {
    try {
      const res = await API.post("/api/book_appointments/", {
        storageuserid,
        id,
        date,
        time,
        description,
      });
      if (res.data.status_code === 1) {
        toast.success(res.data.message);
        setShow(false);
      }
    } catch (err) {
      alert("Error booking appointment");
    }
  };
  const bookAppointment = () => {
    setShow(true);
  };
  const mainForm = () => {
    setShow(false);
  };
  return (
    <div>
      <Dashboard />
      <div className="border-0">
        {!id && (
          <div style={{ marginRight: "-1200px" }}>
            <button
              className="bg-pink-500 "
              style={{
                color: "white",
                padding: "10px",
                borderRadius: "10px",
              }}
              onClick={bookAppointment}
            >
              Book Appointment
            </button>{" "}
          </div>
        )}
        {show && (
          <div className="flex items-center justify-center h-screen bookForm">
            <div className="bg-white p-6 rounded-lg shadow-md w-800">
              <div className="buttonflex">
                <button style={{ marginTop: "-15px" }}>
                  <ArrowLeft size={24} color="blue" onClick={mainForm} />
                </button>
                <h2 className="text-xl font-bold mb-4 doctors">
                  Book Appointment{" "}
                </h2>
              </div>

              <div className="mainForm">
                <div className="bookflex">
                  <input
                    type="date"
                    className={
                      "w-full border-b px-3 py-2 mb-2 bg-gray-100 focus:border-blue-500 "
                    }
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <input
                    type="time"
                    className={
                      "w-full border-b px-3 py-2 mb-2 bg-gray-100 focus:border-blue-500 "
                    }
                    onChange={(e) => setTime(e.target.value)}
                  />
                  <textarea
                    placeholder="Health issue reason"
                    className={
                      "w-full border-b px-3 py-2 mb-2 bg-gray-100 focus:border-blue-500 "
                    }
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="w-1000 bg-pink-800 text-white py-2 px-2 rounded-md mb-4"
                    onClick={handleSubmit}
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {!id && (
          <div className="min-h-screen bg-gray-100 p-6">
            <h2>Appointments</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {appointments.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition duration-300"
                >
                  <div>{doc.status}</div>
                  <div
                    onClick={() => toggleStatus(doc.id, doc.status)}
                    className="cursor-pointer text-3xl"
                  >
                    {doc.status == 1 ? (
                      <FaToggleOn className="text-green-500" />
                    ) : (
                      <FaToggleOff className="text-gray-400" />
                    )}
                  </div>
                  <div className="flex justify-center mb-4">{doc.time}</div>
                  <div className="flex justify-center mb-4">{doc.date}</div>
                  <div className="flex justify-center mb-4">
                    <p style={{ color: "blue" }}>Reason:</p>
                    {doc.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookAppointments;
