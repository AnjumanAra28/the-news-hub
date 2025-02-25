import { useQuery } from "@tanstack/react-query";
import { Chart } from "react-google-charts";
import SectionTitle from "../../Components/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UserStats = () => {
    const axiosSecure = useAxiosSecure()

    const { data: stats = {}, isLoading, error } = useQuery({
        queryKey: ["userStats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/user-stats");
            return res.data;
        }
    });

    const colors = ["#ff5733",  "#f4c242", "#8e44ad"];

    const data = [
        ["Articles", "Users Number", { role: "style" }],
        ...Object.entries(stats).map(([article, count], index) => [
            article,
            count,
            colors[index % colors.length],
        ]),
    ];

   
    return (
        <div>
            <SectionTitle heading={'Number Of Users'} subHeading={'A statistics of user types'}></SectionTitle>
            <Chart className="mx-auto" chartType="ColumnChart" width="90%" height="100%" data={data} />
        </div>
    );
};

export default UserStats;