"use client";

import React, { useState } from "react";
import FloatingLabel from "../reusableComponents/FloatingLabel";
import { ISignup } from "@/lib/interfaces/IPatient";
import MyButton from "../reusableComponents/Button";
import axios from "axios";
import Loader from "../loader/Loader";

export default function Signup() {
  const [patient, setPatient] = useState<ISignup>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPatient((prev) => ({
      ...prev,
      [name]: value, // Update the corresponding attribute dynamically
    }));
  };

  const validateForm = async () => {
    let isValid = true;
    const newErrors = {
      email: "",
      password: "",
      confirm_password: "",
      first_name: "",
      last_name: "",
      message: "",
    };

    // Basic validation checks
    if (!patient.first_name.trim()) {
      newErrors.first_name = "First Name is required";
      isValid = false;
    }

    if (!patient.last_name.trim()) {
      newErrors.last_name = "Last Name is required";
      isValid = false;
    }

    if (!patient.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(patient.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!patient.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (patient.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      isValid = false;
    } else if (!/[!@#$%^&*(),.?":{}|<>0-9]/.test(patient.password)) {
      newErrors.password =
        "Password must contain both a special character and a number";
      isValid = false;
    } else if (!/[A-Z]/.test(patient.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter";
      isValid = false;
    }

    if (!patient.confirm_password.trim()) {
      newErrors.confirm_password = "Confirm Password is required";
      isValid = false;
    } else if (patient.password !== patient.confirm_password) {
      newErrors.confirm_password = "Password and Confirm Password do not match";
      isValid = false;
    }

    await setErrorMessages(newErrors);

    return isValid;
  };

  const signup = () => {
    if (!validateForm()) return;
    setIsLoading(true);
    console.log({ SERVER: process.env.SERVER_URL });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.SERVER_URL}/api/patients/new`,
      headers: {
        "Content-Type": "application/json",
      },
      data: patient,
    };

    axios
      .request(config)
      .then((response) => {
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessages((prev) => ({
          ...prev,
          message: error.response.data.message,
        }));
        console.log(error.response.data);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <h1 className="text-center font-semibold text-xl">Sign Up</h1>
      <div className="flex flex-col sm:flex-row sm:gap-5">
        <FloatingLabel
          label="First Name"
          name="first_name"
          type="text"
          value={patient.first_name}
          onChange={(e) => handleInputs(e)}
          errorMgs={errorMessages.first_name}
        />
        <FloatingLabel
          label="Last Name"
          name="last_name"
          type="text"
          value={patient.last_name}
          onChange={(e) => handleInputs(e)}
          errorMgs={errorMessages.last_name}
        />
      </div>
      <FloatingLabel
        label="Email"
        name="email"
        type="email"
        value={patient.email}
        onChange={(e) => handleInputs(e)}
        errorMgs={errorMessages.email}
      />
      <FloatingLabel
        label="Password"
        name="password"
        type="password"
        value={patient.password}
        onChange={(e) => handleInputs(e)}
        errorMgs={errorMessages.password}
      />
      <FloatingLabel
        label="Confirm Password"
        name="confirm_password"
        type="password"
        value={patient.confirm_password}
        onChange={(e) => handleInputs(e)}
        errorMgs={errorMessages.confirm_password}
      />

      <div className="my-3 w-full relative">
        {isLoading ? (
          <div className="flex justify-center items-center bg-[rgb(0,216,160)] mt-[20px] rounded text-white h-[40px]">
            <Loader />
          </div>
        ) : (
          <MyButton
            label="Sign up"
            backgroundColor="rgb(0,216,160)"
            submitInputs={signup}
          />
        )}

        {errorMessages.message && (
          <p className="text-red-500 text-xs mt-1">{errorMessages.message}</p>
        )}
      </div>
    </div>
  );
}
