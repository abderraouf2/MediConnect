"use client";

import React, { useEffect, useState } from "react";
import { IDoctor } from "@/lib/interfaces/idoctor"; // Adjust path as needed
import DoctorCard from "@/components/homePage/DoctorsCard";
import PageLoader from "@/components/loader/PageLoader";

export default function Page() {
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/favourites", {
          credentials: "include",
        });
        const data = await response.json();
        setDoctors(data.doctors); // assuming your API returns { doctors: [...] }
      } catch (error) {
        console.error("Failed to fetch favourites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return loading ? (
    <div className="flex items-center justify-center h-[500px]">
      <PageLoader />
    </div>
  ) : (
    <div className="container mx-auto p-8 overflow-y-auto">
      <h1 className="text-3xl font-bold text-left mb-8">Favourite Doctors</h1>
      {!loading && doctors.length === 0 && (
        <p className="text-center my-12">No favourite doctors found.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))}
      </div>{" "}
    </div>
  );
}
