import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../Shared/Footer/Footer";
import Navbar from "../../Shared/Navbar/Navbar";

const Main = () => {


    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar></Navbar>
            <div className="w-11/12 mx-auto pt-20 flex-grow">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;