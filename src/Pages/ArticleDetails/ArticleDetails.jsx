import React, { useEffect } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Loading from '../../Components/Loading';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { div } from 'framer-motion/client';

const ArticleDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    const { data: article, isLoading, error, refetch } = useQuery({
        queryKey: ["article", id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/articleDetails/${id}`);
            return res.data;
        },
    });

    const handleViewCount = async () => {
        await axiosPublic.patch(`/allArticles/${id}/views`);
        // console.log(`View count updated for article ${id}`);
    };

    useEffect(() => {
        handleViewCount();
    }, [id]);

    if (isLoading) return <Loading></Loading>;
    if (error) return <p>Error loading articles: {error.message}</p>;

    return (
        <div className="hero bg-base-200 mt-8 mb-10">
            <div className="hero-content flex-col gap-10 lg:flex-row-reverse py-10">
                <img
                    src={article.image}
                    className="max-w-sm rounded-lg shadow-2xl" />
                <div className='px-12'>
                    <h1 className="text-3xl font-bold">Title: {article.title}</h1>
                    <p className="py-2 ">
                       Description {article.description}
                    </p>
                    <p>Publisher{article.publisher}</p>
                    <Link to={'/subscription'} className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white mt-4">Subscribe Now</Link>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetails;