import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constants";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/userSlice";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginSignupHandler = () => {
    setIsLogin(!isLogin);

    // clear all fields when toggle
    setName("");
    setUsername("");
    setEmail("");
    setPassword("");
    setShowPassword(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      // LOGIN
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/login`,
          { email, password },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        dispatch(getUser(res?.data?.user));

        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Login failed");
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      // SIGNUP
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/register`,
          { name, username, email, password },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (res.data.success) {
          toast.success(res.data.message);
          setIsLogin(true);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Signup failed");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex items-center justify-evenly w-[80%]">
        <div>
          <FaXTwitter size="350px" className="ml-4" />
        </div>

        <div>
          <div className="my-5">
            <h1 className="font-bold text-6xl">Happening Now.</h1>
          </div>

          <h1 className="mt-4 mb-2 text-2xl font-bold">
            {isLogin ? "Login" : "Signup"}
          </h1>

          <form onSubmit={submitHandler} className="flex flex-col w-[55%]">
            {!isLogin && (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="name"
                  className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
                />

                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
                  className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
                />
              </>
            )}

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold w-full"
              />

              <span
                className="absolute right-4 top-3 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`bg-[#1D9BF0] py-2 my-4 rounded-full text-lg text-white
                ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              {loading ? "Processing..." : isLogin ? "Login" : "Create Account"}
            </button>

            <h1>
              {isLogin ? "Do not have an account?" : "Already have an account?"}{" "}
              <span
                className="font-bold text-blue-600 cursor-pointer"
                onClick={loginSignupHandler}
              >
                {isLogin ? "Signup" : "Login"}
              </span>
            </h1>
          </form>

          {/* Loading Overlay */}
          {loading && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center">
              <div className="text-white text-xl font-semibold animate-pulse">
                Loading...
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
