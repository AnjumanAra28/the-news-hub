

import { useState } from "react";
import useArticles from "../../hooks/useArticles";

const AllArticles = () => {
    const [search, setSearch] = useState("");
    const [publisher, setPublisher] = useState("");
    const [tag, setTag] = useState("");

    const { data: articles, isLoading, error } = useArticles({ search, publisher, tag });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            {/* Search & Filter Section */}
            <div className="mb-4">
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
                    <div key={article._id} className={`p-4 border rounded ${article.premium ? "bg-yellow-200" : "bg-white"}`}>
                        <img src={article.image} alt={article.title} className="w-full h-40 object-cover mb-2" />
                        <h3 className="text-xl font-bold">{article.title}</h3>
                        <p className="text-sm text-gray-600">{article.publisher}</p>
                        <p className="mt-2">{article.description}</p>
                        <button
                            className={`mt-2 p-2 w-full ${article.premium ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white"}`}
                            disabled={article.premium} // Disable if article is premium
                        >
                            Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllArticles;
