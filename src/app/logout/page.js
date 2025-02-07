"use client";
import React from "react";
import { useEffect, useContext } from "react";
import { authContext } from "../auth-context";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();

  const {logout} = useContext(authContext);
    useEffect(()=>{
        logout();
        router.push("/");
    }, []);
  return <div></div>;
};

export default Page;
