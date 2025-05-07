"use client";

import React, { useState, useEffect } from "react";
import Signin from "./Signin";
import Signup from "./Signup";

interface IProps {
  showModel: boolean;
  selectedTab: "signin" | "signup";
  toggleModel: (action: "signin" | "signup") => void;
}

export default function AuthModal(props: IProps) {
  const { showModel, toggleModel, selectedTab } = props;

  const [activeTab, setActiveTab] = useState<"signin" | "signup">(selectedTab);

  useEffect(() => {
    setActiveTab(selectedTab);
  }, [selectedTab]);

  return (
    showModel && (
      <div className="fixed z-30 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30">
        <div className="bg-white rounded-md p-[2%] px-12 w-[35%] shadow-lg">
          {/* Tab selector */}
          <div className="flex justify-center mb-6 border-b border-gray-300">
            <button
              className={`px-4 w-1/2 py-2 text-lg font-medium ${
                activeTab === "signin"
                  ? "border-b-2 border-[rgb(0,216,160)] text-[rgb(0,216,160)]"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("signin")}
            >
              Sign In
            </button>
            <button
              className={`px-4 py-2 w-1/2 text-lg font-medium ${
                activeTab === "signup"
                  ? "border-b-2 border-[rgb(0,216,160)] text-[rgb(0,216,160)]"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("signup")}
            >
              Sign Up
            </button>
          </div>

          {/* Additional fields based on tab */}
          {activeTab === "signup" ? (
            <Signup />
          ) : (
            <Signin toggleModel={toggleModel} />
          )}

          {/* Close button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => toggleModel("signin")}
              className="text-sm text-gray-500 hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
}
