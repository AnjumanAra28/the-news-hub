import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import AddArticle from "../Pages/AddArticles/AddArticle";
import Home from "../Layout/HomeLayout/Home";
import Subscription from "../Pages/Subscription/Subscription";
import Login from "../Pages/Login/Login";
import ErrorPage from "../Components/ErrorPage";
import SignUp from "../Pages/SignUp/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/addArticle",
        element: <AddArticle></AddArticle>,
      },
      {
        path: "/subscription",
        element: <Subscription></Subscription>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signUp",
    element: <SignUp></SignUp>,
  },
  {
    path:'*',
    element:<ErrorPage></ErrorPage>
  },
]);

export default router;
