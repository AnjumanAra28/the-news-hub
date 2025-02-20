import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";

const SocialLogin = () => {
  const { googleSignIn ,user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  console.log(user);

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        photo:result.user?.photoURL,
        premiumTaken:null,
        role:null,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        navigate("/");
      });
    });
  };

  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
      >
        <FaGoogle className="mr-2 "></FaGoogle>
        Google
      </button>
    </div>
  );
};

export default SocialLogin;
