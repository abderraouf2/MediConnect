"use client";

// pages/doctors.tsx
import { useState, useEffect, useCallback, Suspense } from "react";
// import DoctorCard from '../components/DoctorCard';
import DoctorCard from "./DoctorsCard";
import { IDoctor } from "@/lib/interfaces/idoctor";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1); // Page number

  // Fetch doctors data from the API
  const fetchDoctors = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/api/doctors?page=${page}&limit=10`,
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

  return (
    <Suspense fallback={<p>Loading feed...</p>}>
      <div className="container mx-auto p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Doctors Directory
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>

        {/* Loading Indicator */}
        {loading && <div className="text-center my-4">Loading...</div>}

        {/* No more doctors message */}
        {!hasMore && !loading && (
          <div className="text-center my-4">No more doctors to load.</div>
        )}

        {/* Load More Trigger */}
        <div ref={loadMoreRef} className="h-10"></div>
      </div>
    </Suspense>
  );
};

export default DoctorsList;
