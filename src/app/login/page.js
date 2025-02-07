"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { authContext } from "../auth-context";
import { useContext, useState } from "react";
import Link from "next/link";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("Login")

    const { emailPasswordLogin } = useContext(authContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await emailPasswordLogin(email, password);
            alert("Login Successful");
        } catch (error) {
                setMessage("Login Failed");
        }
    };

  const { googleLoginHandler } = useContext(authContext);

  return (
    <div>
      <div className="flex justify-center items-center h-[80vh]">
        <form className="flex flex-col items-center gap-4" onSubmit={handleLogin}>
        <div>{message}</div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e)=>{setEmail(e.target.value)}}
            className="input-field"
          ></input>
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            className="input-field"
          ></input>
          <button
            type="submit"
            className="border-2 border-gray-400 bg-slate-500 hover:bg-slate-600 rounded-md w-[50%] mt-2"
          >
            Login
          </button>
          <Link href="/register" className="underline underline-offset-2 text-blue-500">Create an account</Link>

          <button onClick={googleLoginHandler} className="flex gap-2 bg-cyan-900 p-3 rounded-full mt-10">
            <FcGoogle className="text-2xl" />
            Google
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
