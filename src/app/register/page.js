"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { authContext } from "../auth-context";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const [message, setMessage] = useState("Sign-up with email")

    const router = useRouter();

    const { emailPasswordSignUp } = useContext(authContext);
    const { googleLoginHandler } = useContext(authContext);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            if(password1 === password2){
                await emailPasswordSignUp(email, password1);
                alert("Sign-up Successful");
                router.push("/");
            }
            else{
                setMessage("Passwords don't match!")
            }
        } catch (error) {
                setMessage("Sign-up Failed");
        }
    };

    const handleGoogleLogin = async ()=>{
        try {
            await googleLoginHandler();
            router.push("/");
        } catch (error) {
            setMessage("Google Sign-Up Failed");
        }
    }


  return (
    <div>
      <div className="flex justify-center items-center h-[80vh]">
        <form className="flex flex-col items-center gap-4" onSubmit={handleRegister}>
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
            value={password1}
            onChange={(e)=> setPassword1(e.target.value)}
            className="input-field"
          ></input>
          <input
            type="password"
            placeholder="Repeat Password"
            required
            value={password2}
            onChange={(e)=> setPassword2(e.target.value)}
            className="input-field"
          ></input>
          <button
            type="submit"
            className="border-2 border-gray-400 bg-slate-500 hover:bg-slate-600 rounded-md w-[50%] mt-2"
          >
            Register
          </button>
          <button onClick={handleGoogleLogin} className="flex gap-2 bg-cyan-900 p-3 rounded-full mt-10">
            <FcGoogle className="text-2xl" />
            Google
          </button>
        </form>
      </div>
    </div>
  );
};
export default Register;
