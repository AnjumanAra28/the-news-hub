import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading";
import SectionTitle from "../../Components/SectionTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const Faq = () => {

    const axiosPublic = useAxiosPublic()

    const {
        data: faqs = [],
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ["faqs"],
        queryFn: async () => {
            const res = await axiosPublic.get("/faqs");
            return res.data;
        },
    });

    if (isLoading) return <Loading />;
    if (error) return <p>Error loading premium articles: {error.message}</p>;

  return (
    <div className="w-9/12 mx-auto my-12">
        <SectionTitle subHeading={'Find your queries here'} heading={' Frequently Asked Questions'}></SectionTitle>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            tabIndex={0}
            className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
          >
            <div className="collapse-title text-xl font-medium">
              {faq.question}
            </div>
            <div className="collapse-content">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
