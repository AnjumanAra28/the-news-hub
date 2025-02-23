import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading";
import useAuth from "../../hooks/useAuth";

const UpdateMyArticle = () => {
  const {title, _id} = useLoaderData()
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  console.log(_id);

   // Fetch current article data
   const { data: article, isLoading, error } = useQuery({
    queryKey: ["article", _id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/myArticles/${_id}`);
      return res.data;
    }
  });
  console.log(article);



  // Article state for updating
  const [articleData, setArticleData] = useState({
    title: article?.title || "",
    description: article?.description || "",
  });

 

  // Update state with fetched data
  useState(() => {
    if (article) {
      setArticleData({
        title: article.title,
        content: article.description
      });
    }
  }, [article]);

  if (isLoading) return <Loading />;
  if (error) return <p>Error loading article: {error.message}</p>;

  // Handle form submission for update
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosPublic.put(`/updateMyArticle/${id}`, articleData);
      if (res.status === 200) {
        alert("Article updated successfully!");
        navigate(`/myArticles`);
      }
    } catch (error) {
      console.error("Error updating article", error);
      alert("Failed to update the article");
    }
  };

  const handleChange = (e) => {
    setArticleData({
      ...articleData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-base-200 rounded-2xl shadow-lg mt-6 mb-14">
      <h2 className="text-2xl font-bold mb-4 pt-4 flex justify-center">Update Article</h2>

      <form onSubmit={handleUpdate} className="space-y-4 py-4">
        <div className="form-group">
          <label className="block text-sm font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={articleData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="form-group">
          <label className="block text-sm font-semibold">Description</label>
          <textarea
            name="content"
            value={articleData.content}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="btn mt-3 btn-outline  border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white flex justify-center"
        >
          Update Article
        </button>
      </form>
    </div>
  );
};

export default UpdateMyArticle;
