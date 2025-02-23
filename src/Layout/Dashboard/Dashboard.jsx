
import { FaUser } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { MdWork } from "react-icons/md";
import { PiArticle } from "react-icons/pi";
import { NavLink, Outlet } from "react-router-dom";
import { Chart } from "react-google-charts";
import useArticles from "../../hooks/useArticles";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading";
import SectionTitle from "../../Components/SectionTitle";

const Dashboard = () => {

    const axiosPublic = useAxiosPublic()
    // TODO: get isAdmin value from the database
    // const [isAdmin] = useAdmin();
    const isAdmin = true;

    const {
        data: articles = [],
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ["articles"],
        queryFn: async () => {
            const res = await axiosPublic.get("/allArticles/admin");
            return res.data;
        },
    });

     console.log(articles);
    const publicationCounts = articles.reduce((acc, article) => {
        acc[article.publisher] = (acc[article.publisher] || 0) + 1;
        return acc;
      }, {});

      console.log(publicationCounts);
    // const data = [
    //     ["Task", "Hours per Day"],
    //     ["Work", 9],
    //     ["Eat", 2],
    //     ["Commute", 2],
    //     ["Watch TV", 2],
    //     ["Sleep", 7],
    // ];

    const data = [
        ["Publisher", "Number of Articles"], 
        ...Object.entries(publicationCounts), 
      ]
    const options = {
        title: "Number of Articles Published by different publishers",
    };

    if (isLoading) return <Loading></Loading>;
    if (error) return <p>Error loading articles: {error.message}</p>;

    return (
        <div className="flex flex-col md:flex-row">
            {/* dashboard side bar */}
            <div className="w-64 md:min-h-screen bg-gray-200 flex-col flex items-center pt-8">
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
                <SectionTitle heading={'Publisher Statistics'} subHeading={' A glimpse of publisher statics'}></SectionTitle>
                <Chart
                    chartType="PieChart"
                    data={data}
                    
                    width={"100%"}
                    height={"400px"}
                />
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;