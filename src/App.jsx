import { useState } from "react";
import doc from "./Images/doc.jpg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Forgetpassword from "./pages/Forgetpassword";
import AddDoctors from "./pages/doctors/AddDoctors";
import GetDoctors from "./pages/doctors/GetDoctors";
import BookAppointments from "./pages/doctors/BookAppointments";
import Chatbot from "./pages/Ai/Chatbot";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${doc})` }}
    >
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgot-password" element={<Forgetpassword />} />
          <Route path="/add-doctors" element={<AddDoctors />} />
          <Route path="/get-doctors" element={<GetDoctors />} />
          <Route path="/book-appointment" element={<BookAppointments />} />
          <Route path="/book-appointment/:id" element={<BookAppointments />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
