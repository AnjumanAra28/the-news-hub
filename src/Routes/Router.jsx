import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import AddArticle from "../Pages/AddArticles/AddArticle";
import Home from "../Layout/HomeLayout/Home";
import Subscription from "../Pages/Subscription/Subscription";
import Login from "../Pages/Login/Login";
import ErrorPage from "../Components/ErrorPage";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard/Dashboard";
import AllUsers from "../Layout/Dashboard/AllUsers";
import AllArticles from "../Pages/AllArticles/AllArticles";
import AddPublisher from "../Layout/Dashboard/AddPublisher";
import Articles from "../Layout/Dashboard/Articles";
import ArticleDetails from "../Pages/ArticleDetails/ArticleDetails";

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
      {
        path:'/allArticles',
        element:<AllArticles></AllArticles>
      },
      {
        path:'/articleDetails/:id',
        element:<ArticleDetails></ArticleDetails>
      }
    ],
  },
  {
    path:'/dashboard',
    element:<Dashboard></Dashboard>,
    children:[
      {
        path:'/dashboard/allUsers',
        element:<AllUsers></AllUsers>
      },
      {
        path:'/dashboard/addPublisher',
        element:<AddPublisher></AddPublisher>
      },
      {
        path:'/dashboard/allArticles',
        element:<Articles></Articles>
      },
    ]
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
  }
]);

export default router;
