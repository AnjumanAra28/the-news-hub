import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SectionTitle from "../../Components/SectionTitle";
import { Chart } from "react-google-charts";

const PieCharts = () => {
    const axiosPublic = useAxiosPublic()

    const {
        data: articles = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["articles"],
        queryFn: async () => {
            const res = await axiosPublic.get("/allArticles/admin");
            return res.data;
        },
    });

    const publicationCounts = articles.reduce((acc, article) => {
        acc[article.publisher] = (acc[article.publisher] || 0) + 1;
        return acc;
      }, {});

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
        <div>
             <SectionTitle heading={'Publisher Statistics'} subHeading={' A glimpse of publisher statics'}></SectionTitle>
                <Chart
                    chartType="PieChart"
                    data={data}
                    options={options}
                    width={"100%"}
                    height={"400px"}
                />
        </div>
    );
};

export default PieCharts;