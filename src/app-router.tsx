import Home from "@src/pages/home";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    caseSensitive: true,
  },
]);

export default router;
