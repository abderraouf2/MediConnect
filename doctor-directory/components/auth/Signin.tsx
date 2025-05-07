"use client";

import React, { useState, useContext } from "react";
import FloatingLabel from "../reusableComponents/FloatingLabel";
import { ISignin } from "@/lib/interfaces/IPatient";
import MyButton from "../reusableComponents/Button";
import axios from "axios";
import Loader from "../loader/Loader";

import { UserContext } from "@/contexts/userContext";

interface IProps {
  toggleModel: (action: "signin" | "signup") => void;
}

export default function Signin(props: IProps) {
  const { toggleModel } = props;

  const { setUser } = useContext(UserContext);

  const [patient, setPatient] = useState<ISignin>({
    email: "",
    password: "",
  });
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
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

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      password: "",
      message: "",
    };

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

    setErrorMessages(newErrors);

    return isValid;
  };

  const login = () => {
    if (validateForm()) {
      setIsLoading(true);
      let data = patient;
      console.log({ URL: `${process.env.SERVER_URL}/api/patients/signin` });
      let config = {
        method: "POST",
        maxBodyLength: Infinity,
        url: `${process.env.SERVER_URL}/api/patients/signin`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: patient,
      };

      axios
        .request(config)
        .then((response: any) => {
          setIsLoading(false);
          const { first_name, last_name } = response.data.patientData;
          setUser({
            first_name,
            last_name,
          });

          window.location.reload();

          toggleModel("signin");
        })
        .catch((error: any) => {
          console.log({ error });
          setErrorMessages((prev) => ({
            ...prev,
            message: error.response.data.message,
          }));
          setIsLoading(false);
        });
    }
  };

  return (
    <div>
      <h1 className="text-center font-semibold text-xl">Sign In</h1>

      <FloatingLabel
        label="email"
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

      <div className="my-3 w-full relative">
        {isLoading ? (
          <div className="flex justify-center items-center bg-[rgb(0,216,160)] mt-[20px] rounded text-white h-[40px]">
            <Loader />
          </div>
        ) : (
          <MyButton
            label="Log in"
            backgroundColor="rgb(0,216,160)"
            submitInputs={login}
          />
        )}

        {errorMessages.message && (
          <p className="text-red-500 text-xs text-center mt-1">
            {errorMessages.message}
          </p>
        )}
      </div>
    </div>
  );
}
