import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const axiosPublic = useAxiosPublic()
const useArticles = (filters) => {
  return useQuery({
    queryKey: ["articles", filters], 
    queryFn: async () => {
      const { data } = await axiosPublic.get("/allArticles", { params: filters });
      return data;
    },
  });
};

export default useArticles;
