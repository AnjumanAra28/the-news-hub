import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CountUp from "react-countup";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SectionTitle from "../../Components/SectionTitle";
import { div } from "framer-motion/client";

const Statistics = () => {
    const axiosPublic = useAxiosPublic();

    const { data: stats = {}, isLoading, error } = useQuery({
        queryKey: ["userStats"],
        queryFn: async () => {
            const res = await axiosPublic.get("/user-stats");
            return res.data;
        }
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading stats!</p>;

    return (
        <div>

            <SectionTitle heading={'User Statistics'} subHeading={'Number of different users'}></SectionTitle>
            <div className="p-6 max-w-lg mx-auto bg-base-100 shadow-xl rounded-lg my-10 text-center">
                <div className="text-lg font-semibold flex justify-around ">
                    <p className="text-5xl flex flex-col text-orange-500"><span className="text-lg">Total Users:</span> <CountUp end={stats.totalUsers || 0} duration={10} /></p>
                    <p className="text-5xl flex flex-col text-orange-500"><span className="text-lg">Normal Users:</span> <CountUp end={stats.normalUsers || 0} duration={10} /></p>
                    <p className="text-5xl flex flex-col text-orange-500"><span className="text-lg">Premium Users:</span> <CountUp end={stats.premiumUsers || 0} duration={10} /></p>
                </div>
            </div>
        </div>
    );
}

export default Statistics;