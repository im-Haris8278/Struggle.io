import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context";

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

  const handleLogin = (e) => {
    e.preventDefault();

    const { email, password, userType } = loginData;
    const storedUserData = JSON.parse(localStorage.getItem(`${userType}Data`));
    const mentorLogin = localStorage.getItem("mentorLogin");
    const studentLogin = localStorage.getItem("studentLogin");

    console.log("Login Data:", loginData);
    console.log("Stored User Data:", storedUserData);

    if (userType === "mentor") {
      if (studentLogin) {
        localStorage.removeItem("studentLogin");
      }

      const isValidMentor = storedUserData.some(
        (mentor) =>
          mentor.mentorEmail === email && mentor.mentorPassword === password
      );

      if (isValidMentor) {
        loginAsMentor();
        localStorage.setItem("mentorLogin", email);
        toast.success("Mentor Login Successful!", {
          position: "bottom-center",
          onClose: () => {
            navigate("/dashboard");
          },
        });
      } else {
        toast.error("Invalid Email or Password. Please Try Again.", {
          position: "bottom-center",
        });
      }
    } else if (userType === "student") {
      if (mentorLogin) {
        localStorage.removeItem("mentorLogin");
      }

      const isValidStudent = storedUserData.some(
        (student) =>
          student.studentEmail === email && student.studentPassword === password
      );

      if (isValidStudent) {
        loginAsStudent();
        localStorage.setItem("studentLogin", email);
        toast.success("Student Login Successful!", {
          position: "bottom-center",
          onClose: () => {
            navigate("/dashboard");
          },
        });
      } else {
        toast.error("Invalid Email or Password. Please Try Again.", {
          position: "bottom-center",
        });
      }
    }

    setLoginData({ email: "", password: "", userType: "mentor" });
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[#161616] font-Poppins`}
      >
        <div className="max-h-[90%] w-[30%] bg-[#2e2e2e] p-6 rounded-3xl">
          <form onSubmit={handleLogin}>
            <div>
              <div className="mb-4 flex items-center justify-between">
                <label className="text-[#fefefe] mr-2" htmlFor="email">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleChange}
                  className="w-[50%] bg-[#fefefe] text-[#000000] p-2 border-2 border-[#000000] outline-none rounded-md"
                  id="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4 flex items-center justify-between">
                <label className="text-[#fefefe] mr-2" htmlFor="password">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  className="w-[50%] bg-[#fefefe] text-[#000000] p-2 border-2 border-[#000000] outline-none rounded-md"
                  id="password"
                  placeholder="Enter your password"
                />
              </div>
              <div className="mb-4 flex items-center justify-between">
                <label className="text-[#fefefe] mr-2" htmlFor="userType">
                  User Type:
                </label>
                <select
                  name="userType"
                  value={loginData.userType}
                  onChange={handleChange}
                  className="w-[50%] bg-[#fefefe] text-[#000000] p-2 border-2 border-[#000000] outline-none rounded-md"
                  id="userType"
                >
                  <option value="mentor">Mentor</option>
                  <option value="student">Student</option>
                </select>
              </div>
              <button
                className="bg-[#fefefe] text-prominent w-full py-2 mt-8 rounded cursor-pointer font-family hover:bg-[#fefefe]"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
        <div>
          <ToastContainer position="bottom-center" />
        </div>
      </div>
    </>
  );
};

export default Login;