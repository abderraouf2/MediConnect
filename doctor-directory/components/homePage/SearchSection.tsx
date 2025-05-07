"use client";

import React, { useState, useContext } from "react";
import { UserContext } from "@/contexts/userContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

import FloatingLabel from "../reusableComponents/FloatingLabel";
import MyButton from "../reusableComponents/Button";

export default function SearchSection() {
  const router = useRouter();
  const [searchTxt, setSearchTxt] = useState<string>("");
  const startSearch = () => {
    searchTxt && router.push(`/search/${searchTxt}`);
  };
  const { user } = useContext(UserContext);

  return (
    <div
      className="py-20 h-[550px] flex flex-col justify-center items-center"
      style={{
        backgroundColor: "hsla(0,0%,100%,1)",
        backgroundImage:
          "radial-gradient(at 0% 9%, hsla(190,87%,35%,1) 0px, transparent 50%), radial-gradient(at 100% 96%, hsla(171,36%,61%,1) 0px, transparent 50%)",
      }}
    >
      <Image src="/images/logo.png" width={150} height={150} alt="logo" />
      {user ? (
        <>
          <h1 className="text-2xl font-bold">
            Welcome back, {user?.first_name}!
          </h1>
          <p className="text-md font-semibold opacity-50 my-4">
            Start searching for Doctors, speciality...
          </p>
        </>
      ) : (
        <h1 className="text-2xl font-bold">Search Doctors, speciality...</h1>
      )}
      <div className="w-3/5 flex justify-center items-center gap-4 py-[10px] px-4 my-8 bg-white rounded-full shadow-xl">
        <div className="w-full -mt-[30px]">
          <FloatingLabel
            label="Search Doctors, speciality..."
            name="first_name"
            type="text"
            value={searchTxt}
            onChange={(e) => setSearchTxt(e.target.value)}
          />
        </div>
        <div className=" -mt-[20px] text-xl">
          <MyButton
            label="Search"
            backgroundColor="rgb(0,216,160)"
            submitInputs={startSearch}
          />
        </div>
      </div>
    </div>
  );
}
