"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { IDoctor } from "@/lib/interfaces/idoctor";
import DoctorCard from "@/components/homePage/DoctorsCard";

export default function page() {
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1); // Page number

  const fetchDoctors = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/api/doctors/search?searchTxt=${searchTxt}&page=${page}&limit=10`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();

      if (data.doctors.length === 0) {
        setHasMore(false); // No more doctors to load
      } else {
        setDoctors((prev) => {
          return page === 1 ? [...data.doctors] : [...prev, ...data.doctors];
        });
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initially fetch doctors when page loads
  useEffect(() => {
    fetchDoctors(page);
  }, [page, fetchDoctors]);

  // Intersection Observer callback
  const loadMoreRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading || !hasMore) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setPage((prev) => prev + 1); // Increment page number to load more data
          }
        },
        {
          rootMargin: "100px", // Trigger 100px before the element is in view
        }
      );

      if (node) observer.observe(node);

      return () => {
        if (node) observer.unobserve(node);
      };
    },
    [loading, hasMore]
  );

  const params: { searchTxt: string } = useParams();
  const { searchTxt } = params;
  const decoded = decodeURIComponent(searchTxt);

  return (
    <div className="container mx-auto p-8 overflow-y-auto">
      <h1 className="text-3xl font-bold text-left mb-8">
        Search Results for: {decoded}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))}
      </div>
      {/* Loading Indicator */}
      {loading && <div className="text-center my-4">Loading...</div>}
      {/* No more doctors message */}
      <div ref={loadMoreRef} className="h-10"></div>
    </div>
  );
}
