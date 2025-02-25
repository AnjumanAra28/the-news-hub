import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading";
import { FcApprove, FcDisapprove } from "react-icons/fc";
import { MdDelete, MdWorkspacePremium } from "react-icons/md";
import Modal from "../../Components/Modal";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";



const Articles = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [reason, setReason] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [page, setPage] = useState(1); 
    const [limit] = useState(5); 

    const {
        data: { articles = [], totalArticles = 0 },
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ["articles",],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allArticles/admin?page=${page}&limit=${limit}`);
            return res.data;
        },
    });
    
    const totalPages = Math.ceil(totalArticles / limit);

    const handlePage = (page)=>{
        setPage(page)
        refetch()
    }



    // approve function
    const handleApprove = async (articleId) => {
        const approveRes = await axiosSecure.patch(`allArticles/${articleId}`)
        if (approveRes.data.modifiedCount > 0) {
            refetch()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `The Article is now approved.`,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    // decline function
    const handleDecline = (articleId) => {
        setSelectedArticle(articleId);
        setIsModalOpen(true);
    };

    const handlePostReason = async () => {
        const reasonRes = await axiosSecure.patch(`allArticles/${selectedArticle}/decline`, { reason })
        if (reasonRes.data.modifiedCount > 0) {
            refetch()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `The reason for declining the article is sent to the user.`,
                showConfirmButton: false,
                timer: 1500,
            });
        }
        setIsModalOpen(false);
    };

    // delete function
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
                axiosSecure.delete(`/allArticles/${articleId}`)
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

    // set article to premium
    const handleMakePremium = async (articleId) => {
        const approveRes = await axiosSecure.patch(`allArticles/${articleId}/premium`)
        if (approveRes.data.modifiedCount > 0) {
            refetch()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `The Article is now premium.`,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };


    if (isLoading) return <Loading></Loading>;
    if (error) return <p>Error loading articles: {error.message}</p>;
    
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-10/12 mx-auto">
                    <thead>
                        <tr>
                            <th>Article Title</th>
                            <th>Author Name</th>
                            <th>Author Email</th>
                            <th>Author Photo</th>
                            <th>Posted Date</th>
                            <th>Status</th>
                            <th>Publisher</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((article) => (
                            <tr key={article._id}>
                                <td>{article.title}</td>
                                <td>{article.authorName}</td>
                                <td>{article.authorEmail}</td>
                                <td>
                                    <img
                                        src={article.authorPhoto}
                                        alt={article.authorName}
                                        className="w-10 h-10 rounded-full"
                                    />
                                </td>
                                <td>{new Date(article.postedDate).toLocaleDateString()}</td>
                                <td className={`${article.status === 'approved' ? 'text-green-500' : 'text-red-500'}`}>
                                    {article.status === 'approved' ? 'approved' : 'pending'}
                                </td>
                                <td>{article.publisher}</td>
                                <td>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleApprove(article._id)}
                                            className="btn btn-success btn-sm"
                                        >
                                            <FcApprove />
                                        </button>
                                        <button
                                            onClick={() => handleDecline(article._id)}
                                            className="btn btn-error btn-sm"
                                        >
                                            <FcDisapprove />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(article._id)}
                                            className="btn btn-warning btn-sm"
                                        >
                                            <MdDelete />
                                        </button>
                                        <button
                                            onClick={() => handleMakePremium(article._id)}
                                            className="btn btn-primary btn-sm"
                                        >
                                            <MdWorkspacePremium ></MdWorkspacePremium>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination controls */}
            <div className="flex justify-center items-center mt-4">
                <button
                    disabled={page === 1}
                    onClick={() => handlePage(page - 1)}
                    className="btn btn-outline mr-2"
                >
                    Prev
                </button>
                <span>Page {page} of {totalPages}</span>
                <button
                    disabled={page === totalPages}
                    onClick={() => handlePage(page + 1)}
                    className="btn btn-outline ml-2"
                >
                    Next
                </button>
            </div>

            {isModalOpen && (
                <Modal
                    reason={reason}
                    setReason={setReason}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handlePostReason}
                />
            )}
        </div>


    );
};

export default Articles;