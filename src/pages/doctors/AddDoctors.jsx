import React from "react";
import { useForm } from "react-hook-form";
import API from "../../Services/api";

const AddDoctors = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    console.log("Datasss", data);

    try {
      const res = await API.post("/api/add_doctors/", data);

      alert("Doctor added successfully");
      reset();
    } catch (err) {
      alert("Error adding doctor");
    }
  };
  return (
    <div>
      <div className="border-0">
        <div className="flex items-center justify-center h-screen ">
          <div className="bg-white p-6 rounded-lg shadow-md w-800">
            <h2 className="text-xl font-bold mb-4 doctors"> Add Doctors</h2>
            <div className="mainForm">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="addflex">
                  <input
                    placeholder="Enter Doctor Name"
                    className={`w-full border-b px-3 py-2 mb-2 focus:outline-none ${errors.name ? " bg-red-100 border-red-500" : "border-gray-400 bg-gray-100 focus:border-blue-600"}`}
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p style={{ color: "red" }}>{errors.name.message}</p>
                  )}

                  <input
                    placeholder="Enter Doctor Specialization"
                    className={`w-full border-b px-3 py-2 mb-2 focus:outline-none ${errors.name ? " bg-red-100 border-red-500" : "border-gray-400 bg-gray-100 focus:border-blue-600"}`}
                    {...register("specialization", {
                      required: "Specialization is required",
                    })}
                  />
                  {errors.specialization && (
                    <p style={{ color: "red" }}>
                      {errors.specialization.message}
                    </p>
                  )}
                </div>
                <div className="addflex">
                  <input
                    type="number"
                    placeholder="Experience"
                    className={`w-full border-b px-3 py-2 mb-2 focus:outline-none ${errors.name ? " bg-red-100 border-red-500" : "border-gray-400 bg-gray-100 focus:border-blue-600"}`}
                    {...register("experience", {
                      required: "Experience is required",
                      min: { value: 0, message: "Must be positive" },
                    })}
                  />
                  {errors.experience && (
                    <p style={{ color: "red" }}>{errors.experience.message}</p>
                  )}
                  <input
                    placeholder="Profession"
                    className={`w-full border-b px-3 py-2 mb-2 focus:outline-none ${errors.name ? " bg-red-100 border-red-500" : "border-gray-400 bg-gray-100 focus:border-blue-600"}`}
                    {...register("Profession", {
                      required: "Profession is required",
                    })}
                  />
                  {errors.specialization && (
                    <p style={{ color: "red" }}>
                      {errors.specialization.message}
                    </p>
                  )}
                </div>
                <div className="addflex">
                  <input
                    placeholder="Hospital Name"
                    className={`w-full border-b px-3 py-2 mb-2 focus:outline-none ${errors.name ? " bg-red-100 border-red-500" : "border-gray-400 bg-gray-100 focus:border-blue-600"}`}
                    {...register("HospitalName", {
                      required: "Hospital name is required",
                    })}
                  />
                  {errors.hospitalname && (
                    <p style={{ color: "red" }}>
                      {errors.hospitalname.message}
                    </p>
                  )}

                  <input
                    placeholder="Enter Hospital Location"
                    className={`w-full border-b px-3 py-2 mb-2 focus:outline-none ${errors.name ? " bg-red-100 border-red-500" : "border-gray-400 bg-gray-100 focus:border-blue-600"}`}
                    {...register("HospitalLocation", {
                      required: "Hospital Location is required",
                    })}
                  />
                  {errors.specialization && (
                    <p style={{ color: "red" }}>
                      {errors.specialization.message}
                    </p>
                  )}
                </div>
                <div className="addflex">
                  <input
                    placeholder="Doctor MobileNumber"
                    className={`w-full border-b px-3 py-2 mb-2 focus:outline-none ${errors.name ? " bg-red-100 border-red-500" : "border-gray-400 bg-gray-100 focus:border-blue-600"}`}
                    {...register("MobileNumber", {
                      required: "Mobile Number is required",
                    })}
                  />
                  {errors.mobileNumber && (
                    <p style={{ color: "red" }}>
                      {errors.mobileNumber.message}
                    </p>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    placeholder="Upload Doctor's Image"
                    className={`w-full border-b px-3 py-2 mb-2 focus:outline-none ${errors.name ? " bg-red-100 border-red-500" : "border-gray-400 bg-gray-100 focus:border-blue-600"}`}
                    {...register("Image", {
                      required: "Doctors Image is required",
                      min: { value: 0, message: "Must be positive" },
                    })}
                  />
                </div>
                <div className="buttons">
                  <button
                    type="submit"
                    className="w-1000 bg-pink-800 text-white py-2 px-2 rounded-md mb-4"
                  >
                    Add Doctor
                  </button>{" "}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDoctors;
