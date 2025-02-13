import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";


const Dashboard = () => {
    // const [cart] = useCart();

    // TODO: get isAdmin value from the database
    // const [isAdmin] = useAdmin();

    const isAdmin = true;

    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul>
                    <li>
                        <NavLink to={'/allUsers'}>All Users</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/allArticles'}>All Articles</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/addPublisher'}>Add Publisher</NavLink>
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