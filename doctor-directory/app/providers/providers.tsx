// app/providers.tsx
"use client";

import { useState } from "react";
import { IPatient } from "@/lib/interfaces/IPatient";
import { UserContext } from "@/contexts/userContext";
import NavBar from "@/components/homePage/NavBar";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IPatient | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavBar />
      {children}
    </UserContext.Provider>
  );
}
