

import { useState } from "react";
import useArticles from "../../hooks/useArticles";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading";
import useAuth from "../../hooks/useAuth";

const AllArticles = () => {
    const {user} = useAuth()
    const [search, setSearch] = useState("");
    const [publisher, setPublisher] = useState("");
    const [tag, setTag] = useState("");

    const { data: articles, isLoading, error } = useArticles({ search, publisher, tag });

    if (isLoading) return <Loading></Loading>;
    if (error) return <p>Error loading articles: {error.message}</p>;

    return (
        <div className="mb-16 mt-5">
            {/* Search & Filter Section */}
            <div className="mb-8">
                <input
                    type="text"
                    placeholder="Search articles..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 mr-2"
                />
                <select value={publisher} onChange={(e) => setPublisher(e.target.value)} className="border p-2 mr-2">
                    <option value="">All Publishers</option>
                    <option value="TechCrunch">SportNews</option>
                    <option value="Forbes">Forbes</option>
                </select>
                <select value={tag} onChange={(e) => setTag(e.target.value)} className="border p-2">
                    <option value="">All Tags</option>
                    <option value="React">React</option>
                    <option value="JavaScript">JavaScript</option>
                </select>
            </div>

            {/* Articles List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles.map((article) => (
                    <div key={article._id} className={`p-4 border rounded-lg  ${article.isPremium ? "border-orange-500 border-dashed border-2" : "bg-white"}`}>
                        <img src={article.image} alt={article.title} className="w-full h-40 object-cover mb-2" />
                        <h3 className="text-xl font-bold">{article.title}</h3>
                        <p className="text-sm text-gray-600">{article.publisher}</p>
                        <p className="mt-2">{article.description.slice(0,100)}...</p>
                        <button
                            className={`mt-2 btn ${article.isPremium ? "bg-gray-400 cursor-not-allowed" : "btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"}`}
                            // disabled={!user?.premiumTaken} 
                        >
                           <Link  to={`/articleDetails/${article._id}`}> Details</Link>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllArticles;
