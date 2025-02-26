import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PremiumArticles = () => {
    const axiosSecure = useAxiosSecure();

    const { data: articles = [], isLoading, error } = useQuery({
        queryKey: ["premiumArticles"],
        queryFn: async () => {
            const res = await axiosSecure.get("/premiumArticles"); 
            return res.data;
        },
    });

    if (isLoading) return <Loading />;
    if (error) return <p>Error loading premium articles: {error.message}</p>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                    <div key={article._id} className="card bg-base-100 shadow-xl p-4">
                        <img src={article.image} alt={article.title} className="w-full h-48 object-cover rounded-lg" />
                        <div className="p-4">
                            <h3 className="text-xl font-bold">{article.title}</h3>
                            <p className="text-gray-500">Publisher: {article.publisher}</p>
                            <p className="text-sm mt-2">{article.description.slice(0, 100)}...</p>
                            <Link to={`/articleDetails/${article._id}`} className="btn mt-3 btn-outline  border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                                Read More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PremiumArticles;
