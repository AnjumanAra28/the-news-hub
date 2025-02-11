import { useNavigate } from "react-router-dom";
import SectionTitle from "../../Components/SectionTitle";
import { IoIosPaperPlane } from "react-icons/io";
import { FaFire } from "react-icons/fa";

const Plans = () => {
  const navigate = useNavigate();

  return (
    <div className="w-11/12 mx-auto my-14">
      <SectionTitle
        heading={"Choose Your Plan"}
        subHeading={"Be A Member"}
      ></SectionTitle>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Free Plan */}
        <div className="border border-gray-300 p-6 rounded-lg shadow-md bg-white">
          <h3 className="text-2xl font-semibold mb-3 flex gap-2 justify-start items-center">
            <IoIosPaperPlane /> Free Plan
          </h3>
          <ul className="list-disc ml-5 mb-4 text-gray-700">
            <li>✅ Access to general articles</li>
            <li>✅ Read up to 10 articles per month</li>
            <li>✅ Basic customer support</li>
            <li>✅ Standard article recommendations</li>
            <li>❌ No access to premium content</li>
            <li>❌ Limited personalization options</li>
            <li>❌ No early access to new articles</li>
          </ul>
          <button className="btn btn-outline border-orange-500 text-orange-500  hover:bg-orange-500 hover:text-white">
            Current Plan
          </button>
        </div>

        {/* Premium Plan */}
        <div className="border border-orange-500 p-6 rounded-lg shadow-md bg-white">
          <h3 className="text-2xl font-semibold text-orange-500 mb-3 flex gap-2 justify-start items-center">
            <FaFire></FaFire> Premium Plan
          </h3>
          <ul className="list-disc ml-5 mb-4 text-gray-700">
            <li>✅ Unlimited access to all articles</li>
            <li>✅ Exclusive premium content</li>
            <li>✅ No ads for a distraction-free reading experience</li>
            <li>✅ Early access to new articles</li>
            <li>✅ Priority customer support</li>
            <li>✅ Personalized article recommendations</li>
            <li>✅ Exclusive interviews & reports</li>
          </ul>
          <button
            onClick={() => navigate("/subscription")}
            className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
          >
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Plans;
