import { useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";

const ErrorPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-200">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-extrabold text-gray-700">404</h1>
        <p className="text-xl text-gray-600">
          Oops! The page you are looking for could not be found.
        </p>
        <div className="flex flex-col justify-center items-center">
          <button
            onClick={goBack}
            className="btn bg-orange-500 mt-4 flex items-center justify-center text-white"
          >
            <IoMdHome className=" text-xl" />
            <span className="mt-1 font-semibold">Go Back Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
