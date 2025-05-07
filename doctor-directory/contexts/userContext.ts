import { createContext, Dispatch, SetStateAction } from "react";

import { IPatient } from "@/lib/interfaces/IPatient";

interface UserContextType {
  user: IPatient | null;
  setUser: Dispatch<SetStateAction<IPatient | null>>;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});
