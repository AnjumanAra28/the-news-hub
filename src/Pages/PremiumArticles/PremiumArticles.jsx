import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading";

const PremiumArticles = () => {
    const axiosPublic = useAxiosPublic();

    const { data: articles = [], isLoading, error } = useQuery({
        queryKey: ["premiumArticles"],
        queryFn: async () => {
            const res = await axiosPublic.get("/premiumArticles"); 
            return res.data;
        },
    });

    if (isLoading) return <Loading />;
    if (error) return <p>Error loading premium articles: {error.message}</p>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-4">Premium Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                    <div key={article._id} className="card bg-base-100 shadow-xl p-4">
                        <img src={article.image} alt={article.title} className="w-full h-48 object-cover rounded-lg" />
                        <div className="p-4">
                            <h3 className="text-xl font-bold">{article.title}</h3>
                            <p className="text-gray-500">Publisher: {article.publisher}</p>
                            <p className="text-sm mt-2">{article.description.slice(0, 100)}...</p>
                            <Link to={`/articleDetails/${article._id}`} className="btn btn-primary mt-3">
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
