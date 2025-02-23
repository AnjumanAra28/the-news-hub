
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading";
import useAuth from "../../hooks/useAuth";
import { AiTwotoneEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const MyArticles = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [showModal, setShowModal] = useState(false);
    const [declineReason, setDeclineReason] = useState('')

    const axiosPublic = useAxiosPublic();

    const { data: articles = [], isLoading,refetch, error } = useQuery({
        queryKey: ["myArticles"],
        queryFn: async () => {
            const res = await axiosPublic.get(`myArticles/${user?.email}`);
            return res.data;
        },
    });

       // Fetch current article data
  

    const handleUpdate = (articleId)=>{
       navigate(`/updateMyArticle/${articleId}`)
    }

    const handleDelete = (articleId) => {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    axiosPublic.delete(`/myArticles/${articleId}`)
                        .then(res => {
                            if (res.data.deletedCount > 0) {
                                refetch();
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "The Article has been deleted.",
                                    icon: "success"
                                });
                            }
                        })
                }
            });
        };

    if (isLoading) return <Loading />;
    if (error) return <p>Error loading premium articles: {error.message}</p>;

    const openModal = (reason) => {
        setDeclineReason(reason)
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="overflow-x-auto mb-10 mt-5">
            <table className="table w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-200 text-gray-700">
                        <th>#</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Premium</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map((article, index) => (
                        <tr key={article._id} className="border-b">
                            <td className="px-4 py-2">{index + 1}</td>
                            <td className="px-4 py-2">{article.title}</td>

                            {/*  Status Handling */}
                            <td className="px-4 py-2">
                                {article.status === "approved" && (
                                    <span className="text-green-500 font-bold">Approved</span>
                                )}
                                {article.status === "pending" && (
                                    <span className="text-yellow-500 font-bold">Pending</span>
                                )}
                                {article.status === "declined" && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-red-500 font-bold">Declined</span>
                                        <button
                                            onClick={() => openModal(article.declineReason)}
                                            className="btn btn-xs btn-outline  border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                                        >
                                            Reason
                                        </button>
                                    </div>
                                )}
                            </td>

                            {/*  Premium Indicator */}
                            <td className="px-4 py-2">
                                {article.isPremium ? (
                                    <span className="text-orange-500 font-bold">Yes</span>
                                ) : (
                                    <span className="text-gray-500">No</span>
                                )}
                            </td>

                            {/*  Action Buttons */}
                            <td className="px-4 py-2 flex gap-2">
                                <Link to={`/articleDetails/${article._id}`} className=" btn-sm btn btn-outline  border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                                    Details
                                </Link>
                                <Link to={`/updateMyArticle/${article._id}`} className="btn btn-sm hover:bg-orange-400">
                                    <span><AiTwotoneEdit /></span>
                                </Link>
                                <button onClick={() => handleDelete(article._id)} className="btn btn-sm btn-danger hover:bg-red">
                                    <span><MdDelete /></span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for Decline Reason */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-2 ">Decline Reason</h2>
                        <p className="text-gray-700">{declineReason}</p>
                        <button onClick={closeModal} className="btn btn-outline  border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white mt-4">
                            Close
                        </button>
                    </div>
                </div>
            )}


        {/* show modal for update article */}

        </div>
    );
};

export default MyArticles;
