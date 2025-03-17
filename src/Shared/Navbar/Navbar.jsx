import React from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";


const Navbar = () => {
  // const [isAdmin] = useAdmin()
  //   console.log(isAdmin);
  const isAdmin = true;
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .catch((error) => console.log(error));
  };

  const links = (
    <>
      <li>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? "bg-orange-500 text-white" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/addArticle"}
          className={({ isActive }) =>
            isActive ? "bg-orange-500 text-white" : ""
          }
        >
          Add Article
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/allArticles"}
          className={({ isActive }) =>
            isActive ? "bg-orange-500 text-white" : ""
          }
        >
          All Articles
        </NavLink>
      </li>

      {
        user && (

          <ul className="flex flex-col md:flex-row  justify-center items-center">
            <li>
              <NavLink
                to={"/premiumArticles"}
                className={({ isActive }) =>
                  isActive ? "bg-orange-500 text-white" : ""
                }
              >
                Premium Articles
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/MyArticles"}
                className={({ isActive }) =>
                  isActive ? "bg-orange-500 text-white" : ""
                }
              >
                My Articles
              </NavLink>
            </li>
          </ul>
        )
      }

      {isAdmin && (
        <li>
          <NavLink
            to={"/dashboard"}
            className={({ isActive }) =>
              isActive ? "bg-orange-500 text-white" : ""
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );
  return (
    <div className=" navbar bg-black text-white fixed z-50 bg-opacity-40">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">The News Hub</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <Link to={'/myProfile'}>
              <img
                src={user?.photoURL}
                alt="User Profile"
                className="w-10 h-10 rounded-full mr-2"
              />
            </Link>

            <button
              onClick={handleLogOut}
              className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
            >
              LogOut
            </button>
          </>
        ) : (
          <>
            <Link
              to={"/login"}
              className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white mr-2"
            >
              Login
            </Link>

            <Link
              className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
              to={"/signUp"}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
