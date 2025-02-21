
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../Components/Loading";

const PrivateRoutes = ({children}) => {
 
    const {loading,user} =useAuth()
    const location = useLocation()
    
    // runs loading state until user set
    if(loading){
        return <Loading></Loading>
    }
    
    // will show children if user exists
    if(user){
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoutes;