import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/logo.png";
import { useAuth } from "../../context";
import { server } from "../../apiEndPoint/apiEndPoint";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { loginAsStudent, loginAsMentor } = useAuth();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    userType: "mentor",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password, userType } = loginData;

    try {
      const response = await axios.post(
        userType === "mentor"
          ? `${server}/api/auth/mentor-login`
          : `${server}/auth/student-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to login");
      }

      if (userType === "mentor") {
        loginAsMentor();
      } else {
        loginAsStudent();
      }

      toast.success(
        `${userType === "mentor" ? "Mentor" : "Student"} Login Successful!`,
        {
          position: "bottom-center",
          autoClose: 1000,
          onClose: () => navigate("/dashboard"),
        }
      );
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Invalid Email or Password. Please Try Again.", {
        position: "bottom-center",
      });
    }
  };

  return (
    <>
      <div className="flex flex-row h-screen w-full bg-[#66c871cb]">
        <div className="w-[50%] p-10 flex flex-col justify-center items-center relative">
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <h1 className="text-white text-3xl font-bold mb-10 text-center">
              Welcome to Struggle.io
            </h1>
            <img src={logo} alt="Logo" className="mt-6 h-60 w-60" />
          </div>
        </div>

        <div className="w-full bg-[#F2F9FF] flex flex-col justify-center items-center rounded-tl-[50px] rounded-bl-[50px]">
          <div className="flex flex-col items-start w-[70%]">
            <h2 className="text-3xl font-medium font-Eczar mb-8">Sign-in</h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-6 w-full">
              <div>
                <FormInput
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
              <div>
                <FormInput
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </div>
              <div className="flex items-center relative">
                <select
                  placeholder="Status"
                  id="userType"
                  name="userType"
                  value={loginData.userType}
                  onChange={handleChange}
                  className="p-[10px] rounded-[15px] border h-[45px] border-b-[3px] border-[#66C871] w-full placeholder:text-[#9d9d9d] bg-[#56c36129] appearance-none pr-10"
                >
                  <option value="mentor" className="bg-white text-black">
                    Mentor
                  </option>
                  <option value="student" className="bg-white text-black">
                    Student
                  </option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FiChevronDown className="text-green-500" />
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-[8px] cursor-pointer self-center bg-[#56c361] text-white py-2 font-Eczar font-medium text-[20px]"
              >
                Login
              </button>
            </form>
            <p className="mt-4 self-center font-Eczar">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/sign-up")}
                className="text-[#5884e9] cursor-pointer"
              >
                Signup
              </span>
            </p>
          </div>
        </div>
        <ToastContainer position="bottom-left" />
      </div>
    </>
  );
};

export default Login;

const FormInput = ({ placeholder, name, value, onChange, type = "text" }) => {
  return (
    <>
      <input
        className="w-full p-3 rounded-[15px] border border-b-[3px] h-[45px] border-[#66C871] placeholder:text-[#9d9d9d] bg-[#66c8712b]"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
};
