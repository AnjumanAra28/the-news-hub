
import { FaUser } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { MdWork } from "react-icons/md";
import { PiArticle } from "react-icons/pi";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {

    return (
        <div className="flex flex-col md:flex-row">
            {/* dashboard side bar */}
            <div className=" w-full md:w-64 md:min-h-screen bg-gray-200 flex-col flex items-center pt-8 pb-8">
                <ul className="space-y-1">
                    <li>
                        <NavLink className='flex items-center gap-2' to={'/dashboard/allUsers'}><FaUser /> All Users</NavLink>
                    </li>
                    <li>
                        <NavLink className='flex items-center gap-2' to={'/dashboard/allArticles'}><PiArticle /> All Articles</NavLink>
                    </li>
                    <li>
                        <NavLink className='flex items-center gap-2' to={'/dashboard/addPublisher'}><MdWork /> Add Publisher</NavLink>
                    </li>
                    <li>
                        <NavLink className='flex items-center gap-2' to={'/'}><IoHome />  Home</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">

                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;