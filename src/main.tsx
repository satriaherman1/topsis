import { ChakraProvider } from "@chakra-ui/react";
import { GlobalContext, initialGlobalContextData } from "@src/utils/context";
import globalReducer from "@src/utils/context/reducer";
import React, { useReducer } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./app-router";
import "./index.css";

const App = () => {
  const [state, dispatch] = useReducer(globalReducer, initialGlobalContextData);

  return (
    <React.StrictMode>
      <ChakraProvider>
        <GlobalContext.Provider value={{ state, dispatch }}>
          <RouterProvider router={router} />
        </GlobalContext.Provider>
      </ChakraProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
