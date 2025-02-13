import {  useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../../Components/SocialLogin";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { signIn } = useAuth()
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    

     signIn(email, password)
      .then((result) => {
        setError("");
        Swal.fire({
          title: "Success!",
          text: "Logged In Successfully",
          icon: "success",
          confirmButtonText: "Close",
        }); 
        
        form.reset();
        navigate(location?.state ? location.state : '/')
      })
      .catch((error) => {
        console.error(error);
        if (error.code === "auth/invalid-credential")
          setError("Invalid Credential");
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto mt-10 max-w-sm lg:max-w-lg shrink-0 shadow-2xl mb-16">
      <h1 className="text-4xl font-bold my-3 text-center pt-3">Login</h1>
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            name="email"
            type="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            name="password"
            type="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        {error && <p className="text-red-500 text-sm my-2">{error}</p>}

        <div className="flex gap-5 items-center">
          <div className="form-control mt-2">
            <button className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">Login</button>
          </div>
          <div className="form-control mt-2">
            <SocialLogin></SocialLogin>
          </div>
        </div>

        <p className="text-xs">
          Don't have an account? Please <Link to="/signUp">SignUp</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
