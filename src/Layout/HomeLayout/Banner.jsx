import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../Components/Loading";
import { Link } from "react-router-dom";



const Banner = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: articles = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await axiosPublic.get("/articles");
      return res.data;
    },
  });

  if (isPending) return <Loading></Loading>;

  if (error) return "An error has occurred: " + error.message;
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
      >
        {articles.map((article) => (
          <SwiperSlide key={article._id}>

            <div className="hero bg-base-200 py-14 ">
              <div className="hero-content flex-col gap-10 lg:flex-row">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-80 h-48 md:h-64 lg:h-80 object-cover rounded-lg "
                />
                <div className="pr-10">
                  <h1 className="text-xl lg:text-3xl font-bold">{article.title}</h1>
                  <p className="py-6">
                    {article.description.slice(0, 400)}...
                  </p>
                  <p className="py-2">
                    Article view: {article.views}
                  </p>
                  <Link to={`/articleDetails/${article._id}`} className="btn mt-3 btn-outline  border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
