
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay"; 
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import SectionTitle from "../../Components/SectionTitle";
import Loading from "../../Components/Loading";


const Testimonials = () => {
    const axiosPublic = useAxiosPublic()

    const {
        data: reviews = [],
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const res = await axiosPublic.get("/reviews");
            return res.data;
        },
    });

    if (isLoading) return <Loading />;
    if (error) return <p>Error loading premium articles: {error.message}</p>;

    return (
        <section className="my-20">
            <SectionTitle
                subHeading="What Our Client Say"
                heading={'Testimonials'}
            ></SectionTitle>

            <Swiper
                navigation={true}
                autoplay={{
                    delay: 3000, 
                    disableOnInteraction: false, 
                }}
                modules={[Navigation, Autoplay]} 
                className="mySwiper"
            >

                {
                    reviews.map(review => <SwiperSlide
                        key={review._id}
                    >
                        <div className="flex flex-col items-center mx-24 my-16">
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <p className="py-8">{review.details}</p>
                            <h3 className="text-2xl text-orange-400">{review.name}</h3>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </section>
    );
};

export default Testimonials;