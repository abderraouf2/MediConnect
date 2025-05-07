"use client"; // This is necessary to indicate client-side rendering in Next.js

import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/userContext";
import axios from "axios";
import Image from "next/image";
import { IoMdHeart } from "react-icons/io";
import Link from "next/link";

import UserMenu from "./UserMenu";
import AuthModal from "../auth/AuthModal";
import PageLoader from "../loader/PageLoader";

export default function NavBar() {
  const { user, setUser } = useContext(UserContext); // Get the user's name from context

  const [showModel, setShowModel] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState<boolean>(true);

  const toggleModel = (tab: "signin" | "signup"): void => {
    setSelectedTab(tab);
    setShowModel((prev) => !prev);
  };

  const fetchPatientData = async () => {
    axios
      .get(`${process.env.SERVER_URL}/api/patients/patientData`, {
        withCredentials: true,
      })
      .then((response: any) => {
        const { first_name, last_name } = response.data.patientData;
        setUser({
          first_name,
          last_name,
        });
        setLoading(false);
        toggleModel("signin");
      })
      .catch((error) => {
        console.log({ error });
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPatientData();
  }, []);

  return loading ? (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-[500]">
      <PageLoader />
    </div>
  ) : (
    <>
      <AuthModal
        showModel={showModel}
        selectedTab={selectedTab}
        toggleModel={toggleModel}
      />
      <nav className="h-14 shadow-lg sticky top-0 bg-white flex items-center z-[10]">
        <div className="container mx-auto flex items-center justify-between">
          <div className="w-[8%]">
            <Link href="/">
              <Image
                src="/images/mediconnect.png"
                width={300}
                height={150}
                alt="logo"
              />
            </Link>
          </div>{" "}
          {/* Display user's name */}
          {user ? (
            <div className="flex items-center gap-4">
              <Link
                href="/favourite"
                className="bg-[#fe019a] rounded-full text-white flex items-center gap-2 px-4 py-2 border hover:border-[#fe019a] hover:text-[#fe019a] hover:bg-white duration-300 font-[600] mr-4"
              >
                <IoMdHeart />
                My favourites
              </Link>
              <h2 className="text-lg font-semibold ">
                {user.last_name.charAt(0).toUpperCase() +
                  ". " +
                  user.first_name}
              </h2>
              <UserMenu />
            </div>
          ) : (
            <div>
              <button
                onClick={() => toggleModel("signin")}
                className="mx-4 text-[rgb(0,216,160)] border border-[rgb(0,216,160)] hover:text-white hover:bg-[rgb(0,216,160)] duration-300 transition-ease px-4 py-2 rounded-full text-lg font-semibold"
              >
                Sign In
              </button>
              <button
                onClick={() => toggleModel("signup")}
                className="bg-[rgb(0,216,160)] border hover:text-[rgb(0,216,160)] hover:border-[rgb(0,216,160)] hover:bg-white duration-300 px-4 py-2 text-white rounded-full text-lg font-semibold"
              >
                Signup
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
