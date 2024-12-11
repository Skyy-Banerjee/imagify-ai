import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [userState, setUserState] = useState("Login");
  const { setShowLogin, backendUrl, setToken, setUser } =
    useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmitHandler(evt) {
    evt.preventDefault();
    console.log(evt.target.value);
    try {
      if (userState === "Login") {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
          toast.success("Logged in successfully!");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
          toast.success("Registered successfully!");
        } else {
          toast.error(data.message);
        }
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }

  //! to stop scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex  justify-center items-center">
      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-white p-10 rounded-xl text-slate-500">
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {userState}
        </h1>
        <p className="text-sm">Welcome back! Please sign-in to continue</p>
        {userState !== "Login" && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <img
              src={assets.profile_icon}
              alt="profile-icon"
              className="w-6 h-6"
            />
            <input
              value={name}
              onChange={(evt) => setName(evt.target.value)}
              className="outline-none text-sm"
              type="text"
              required
              placeholder="Full Name"
            />
          </div>
        )}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.email_icon} alt="email-icon" className="" />
          <input
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
            className="outline-none text-sm"
            type="email"
            required
            placeholder="Email"
          />
        </div>
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.lock_icon} alt="lock-icon" className="" />
          <input
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
            className="outline-none text-sm"
            type="password"
            required
            placeholder="Password"
          />
        </div>
        <p className="text-sm hover:text-blue-500  text-blue-600 my-4 cursor-pointer">
          Forgot password?
        </p>
        <button className="bg-blue-600 hover:bg-blue-500 w-full text-white py-2 rounded-full">
          {userState === "Login" ? "Login" : "Create Account"}
        </button>
        {userState === "Login" ? (
          <p className="mt-5 text-center">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:text-blue-500"
              onClick={() => setUserState("Sign Up")}>
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              onClick={() => setUserState("Login")}
              className="hover:text-blue-500 text-blue-600 cursor-pointer">
              Login
            </span>
          </p>
        )}
        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          alt="cross-icon"
          className="absolute top-5 right-5 cursor-pointer"
        />
      </motion.form>
    </div>
  );
};

export default Login;
