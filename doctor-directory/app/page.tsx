import DoctorsList from "@/components/homePage/DoctorsList";
import SearchSection from "@/components/homePage/SearchSection";

export default async function Home() {
  // const response = await fetch("http://localhost:3000/api/doctors/");
  // const doctors: Array<IDoctor> = await response.json();
  // console.log({ doctors });

  return (
    <div className="">
      <main className="">
        <SearchSection />
        <DoctorsList />
      </main>
    </div>
  );
}
