import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Iteminfo from "./pages/Iteminfo";
import Fav from "./pages/Fav";
import Read from "./pages/Read";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",

    element: <App />,
  },

  {
    path: "/login",

    element: <Login />,
  },

  {
    path: "/home",

    element: <Home />,
  },

  {
    path: "/Books",

    element: <Books />,
  },

  {
    path: "/iteminfo/:id",

    element: <Iteminfo />,
  },

  {
    path: "/Fav",

    element: <Fav />,
  },
  {
    path: "/Read",

    element: <Read />,
  },

  {
    path: "*",

    element: <NotFoundPage />,
  },
]);

export default router;
