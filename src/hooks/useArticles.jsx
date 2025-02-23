import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useArticles = (filters = {}) => {
  const axiosPublic = useAxiosPublic()
  
  return useQuery({
    queryKey: ["articles", filters], 
    queryFn: async () => {
      const { data } = await axiosPublic.get("/allArticles", { params: filters });
      return data;
    },
  });
};

export default useArticles;
