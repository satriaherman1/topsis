import { createContext } from "react";

export const initialGlobalContextData = {
  alternative: null,
  criteria: null,
  step: 0,
};
export const GlobalContext = createContext({});
