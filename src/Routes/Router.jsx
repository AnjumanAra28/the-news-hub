import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import AddArticle from "../Pages/AddArticles/AddArticle";
import Home from "../Layout/HomeLayout/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path: "/addArticle",
        element: <AddArticle></AddArticle>,
      },
    ],
  },
]);

export default router;
