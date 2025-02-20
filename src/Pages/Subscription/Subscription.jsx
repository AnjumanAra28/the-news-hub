import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Subscription=()=> {
    const navigate = useNavigate();
    const [selectedDuration, setSelectedDuration] = useState("1 minute");

    const prices = {
        "1 minute": "$0.50",
        "5 days": "$5.00",
        "10 days": "$9.00",
        "1 month": "$15.00",
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-base-100 shadow-xl rounded-lg my-10">
            <h2 className="text-2xl font-bold text-center">Subscribe to Premium</h2>
            <p className="text-gray-600 text-center mt-2">Choose a subscription plan:</p>

            <select
                className="select select-bordered w-full mt-4"
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
            >
                {Object.keys(prices).map((duration) => (
                    <option key={duration} value={duration}>
                        {duration}
                    </option>
                ))}
            </select>

            <p className="text-lg font-semibold text-center mt-4">
                Price: <span className="text-orange-500">{prices[selectedDuration]}</span>
            </p>

            <div className="flex justify-center">
                <button
                    className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white mt-3"
                    onClick={() => navigate(`/payment?duration=${selectedDuration}`)}
                >
                    Subscribe Now
                </button>
            </div>
        </div>
    );
}

export default Subscription;