import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function ForgotPassword() {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRepassword] = useState("");
  const navigate = useNavigate();
  const resetPassword = async () => {
    try {
      // Validate inputs

      if (password !== rePassword) {
        toast.error("Passwords do not match");
        return;
      }

      if (!isPasswordValid(password)) {
        toast.error(
          "Invalid password. Please follow the password requirements."
        );
        return;
      }

      // Make API call
      const response = await axios.post(
        "http://localhost:2620/api/user/resetpassword",
        {
          emailId: emailId,
          password: password,
        }
      );

      // Check if the response status is OK (2xx)
      if (response.status === 404) {
        toast.error("Email does not exist");
      } else if (response.status === 200) {
        toast.success("Password reset successful");
        navigate("/");
      } else {
        toast.error("Password reset failed");
      }
    } catch (error) {
      console.error("Password reset failed:", error.message);
      toast.error("Password reset failed. Please try again.", error.message);
    }
  };

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(.{5,})$/;
    return passwordRegex.test(password);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-800 px-10 py-10 rounded-xl">
        <div>
          <h1 className="text-center text-white text-xl mb-4 font-bold">
            Reset Password
          </h1>
        </div>
        <div>
          <input
            type="email"
            name="setEmailId"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Password"
          />
        </div>
        <div>
          <input
            type="password"
            value={rePassword}
            onChange={(e) => setRepassword(e.target.value)}
            className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Re-enter Password"
          />
        </div>
        <div className="flex justify-center mb-3">
          <button
            onClick={resetPassword}
            className="bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg"
          >
            Reset Password
          </button>
          <ToastContainer />
        </div>
        <div>
          <h2 className="text-white text-center">
            Already have an account?{" "}
            <Link className="text-yellow-500 font-bold" to={"/Login"}>
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
