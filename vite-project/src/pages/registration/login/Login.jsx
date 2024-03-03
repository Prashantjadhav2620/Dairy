import { Link, useNavigate } from "react-router-dom";
import myContext from "../../../context/data/myContext";
import { useContext, useState } from "react";
import Loader from "../../../components/loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Login() {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const context = useContext(myContext);
  const { setLoading } = context;

  const navigate = useNavigate();

  const login = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "https://localhost:2620/api/user/login",
        {
          emailId: emailId,
          password: password,
        }
      );

      // Check if the response status is OK (2xx)
      if (response.status >= 200 && response.status < 300) {
        localStorage.setItem("user", JSON.stringify(response));
        toast.success("Login successful");
        navigate("/");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {context.loading && <Loader />}
      <div className="bg-gray-800 px-10 py-10 rounded-xl">
        <div>
          <h1 className="text-center text-white text-xl mb-4 font-bold">
            Login
          </h1>
        </div>
        <div>
          <input
            type="email"
            name="setEmailId"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Email Id"
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
        <div className="flex justify-center mb-3">
          <button
            onClick={login}
            className="bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg"
          >
            Login
          </button>
          <ToastContainer />
        </div>
        <div>
          <h2 className="text-white text-center">
            Don't have an account{" "}
            <Link className="text-yellow-500 font-bold" to={"/Signup"}>
              Signup
            </Link>
          </h2>
        </div>
        <div>
          <h2 className="text-white text-center">
            <Link className="text-yellow-500 font-bold" to={"/ForgotPassword"}>
              Forgot Password
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Login;
