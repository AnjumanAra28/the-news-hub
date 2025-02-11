import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Publisher = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: publisher = [],
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["publisher"],
    queryFn: async () => {
      const res = await axiosPublic.get("/publisher");
      return res.data;
    },
  });

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-14">
      {publisher.map((item) => (
        <div key={item._id} className="card bg-base-100 shadow-xl">
        <div className="card-body flex flex-col items-center justify-center">
          <div className="">
            <img src={item.logo} alt={item.name} />
          </div>
          <h2 className="card-title">{item.name}</h2>
        </div>
      </div>
      ))}
    </div>
  );
};

export default Publisher;
