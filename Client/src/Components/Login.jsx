import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [state, setState] = useState("Login");
  const { setShowLogin, backendUrl, setToken, setUser } =
    useContext(AppContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state.toLowerCase() === "login") {
        console.log("lakakak");
      
        const data = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        console.log(data);

        if (data.data.success) {
          setToken(data.token);
          console.log("token:"+data.data.token)
          console.log(`user:+${data.data.user}`)
          setUser(data.user);
          console.log("set complete")
          localStorage.setItem("token", data.data.token);
          setShowLogin(false);

        } else {
          toast.error(data.data.message);
          console.log(data.data.message);

        }
      } else {
        console.log("lakakak");
        const data = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        console.log("lakakak");
        console.log(data);
        if (data.data.success) {
          setToken(data.token);
          console.log("token:"+data.data.token)
          console.log("user:"+data.data.user)
          setUser(data.user);
          console.log("set complete")
          localStorage.setItem("token", data.data.token);
          setShowLogin(false);
        } else {
          toast.error(data.data.message);
          console.log(data.data.message);
        } 
      }
    } catch (error) {
      toast.error(data.data.message);
          console.log(data.message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  return (
    <div className="fixed z-10 top-0 bottom-0 right-0 left-0 backdrop-blur-sm bg-bl/30 flex justify-center items-center">
      <form
        onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-xl text-slate-500 flex flex-col"
      >
        <h1 className="text-center text-2xl mb-2 text-neutral-700 font-medium">
          {state}
        </h1>
        <p className="text-sm">Welcome back! Please Sign in to continue</p>
        {state.toLowerCase() !== "login" && (
          <div className="border px-6 py-2 pl-5 flex items-center gap-2 rounded-full mt-5">
            <img src={assets.profile_icon} alt="" className="w-5" />
            <input
              className="outline-none text-sm"
              type="text"
              placeholder="Full Name"
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            />
          </div>
        )}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.email_icon} alt="" className="" />
          <input
            className="outline-none text-sm"
            type="email"
            placeholder="Email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
        </div>
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.lock_icon} alt="" className="" />
          <input
            className="outline-none text-sm"
            type="password"
            placeholder="Password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </div>
        <p
          className={`${
            state.toLowerCase() !== "login" ? "hidden" : ""
          } text-sm text-blue-600 my-4 cursor-pointer `}
        >
          Forgot Password?
        </p>
        <button className="bg-blue-600 w-full text-white py-2 rounded-full mt-3">
          {state.toLowerCase() !== "login" ? "Create Account" : "Login"}
        </button>
        {state.toLowerCase() !== "login" ? (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Login")}
            >
              Sign In
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        )}

        <img
          src={assets.cross_icon}
          alt=""
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => setShowLogin(false)}
        />
      </form>
    </div>
  );
};

export default Login;
