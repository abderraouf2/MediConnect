// components/DoctorCard.tsx

import React, { useState } from "react";
import { IDoctor } from "@/lib/interfaces/idoctor";
import { FaUserDoctor, FaPhone, FaLocationDot, FaCheck } from "react-icons/fa6";
import { GoStarFill } from "react-icons/go";
import { IoMdHeart } from "react-icons/io";
import axios from "axios";

interface IProps {
  doctor: IDoctor;
}

const DoctorCard = (props: IProps) => {
  const { doctor } = props;
  const [favourite, setFavourite] = useState<boolean>(
    doctor.favourite || false
  );

  const addFavouriteDoctor = () => {
    axios
      .post(
        `${process.env.SERVER_URL}/api/favourites/${doctor._id}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((response: any) => {
        doctor.favourite = response.data.favourite;
        setFavourite(response.data.favourite);
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log({ error });
      });
  };

  const removeFromFavourite = () => {
    axios
      .delete(`${process.env.SERVER_URL}/api/favourites/${doctor._id}`, {
        withCredentials: true,
      })
      .then((response: any) => {
        doctor.favourite = response.data.favourite;
        setFavourite(response.data.favourite);
        console.log(response.data.favourite);
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log({ error });
      });
  };

  return (
    <div className=" w-full bg-white shadow-lg hover:shadow-none duration-300 cursor-pointer rounded-lg overflow-hidden">
      {/* Image Placeholder */}
      <div className="w-full h-36 text-[#0b8fac] flex items-center justify-center">
        {/* <span className="text-xl text-gray-500">Doctor's Photo</span> */}
        <FaUserDoctor size={75} />
      </div>

      <div className="px-6 py-4">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">
            {doctor.first_name} {doctor.last_name}
          </h2>
          <div className="flex items-center mt-2">
            <span className="text-yellow-400 text-lg">
              <GoStarFill />
            </span>
            <span className="ml-1 text-gray-600">{doctor.rating}</span>
          </div>
        </div>
        <p className="text-lg text-gray-600">{doctor.specialty}</p>

        <div className="mt-6">
          <p className="text-gray-800 flex items-center gap-2">
            <strong>
              <FaPhone color="#0b8fac" />
            </strong>
            {doctor.phone}
          </p>
        </div>

        {/* Address */}
        <div className="mt-4 text-gray-800 flex items-center gap-2">
          <strong>
            <FaLocationDot color="#0b8fac" />
          </strong>
          {/* <p>{doctor.address}</p> */}
          <p>
            {doctor.city}, {doctor.state} {doctor.zip_code}
          </p>
        </div>
        <div className="w-full flex justify-end my-2">
          {!favourite ? (
            <button
              onClick={addFavouriteDoctor}
              className="bg-[#fe019a] rounded-full text-white flex items-center gap-2 px-4 py-2 border hover:border-[#fe019a] hover:text-[#fe019a] hover:bg-white duration-300 font-[600]"
            >
              <IoMdHeart />
              Add to favourite
            </button>
          ) : (
            <button
              onClick={removeFromFavourite}
              className="rounded-full flex items-center gap-2 px-4 py-2  text-[#fe019a] bg-white duration-300 font-[600]"
            >
              <FaCheck />
              Favourite
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
