import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

export default function Payment() {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);

    const selectedDuration = searchParams.get("duration");

    useEffect(() => {
        if (!selectedDuration) {
            Swal.fire("Error", "Invalid subscription plan!", "error");
            navigate("/subscription");
        }
    }, [selectedDuration, navigate]);


    const handlePayment = async () => {
        setLoading(true);

        setTimeout(async () => {
            setLoading(false);

            try {

                const res = await axiosPublic.put(`/premiumUser/${user?.email}`, {
                    selectedDuration,
                });

                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Payment Successful!",
                        text: `You are now a premium user for ${selectedDuration}.`,
                    });

                    navigate("/");
                } else {
                    Swal.fire("Oops!", "Subscription update failed.", "error");
                }
            } catch (error) {
                console.error("Payment Error:", error);
                Swal.fire("Error", "Something went wrong!", "error");
            }
        }, 2000);
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-base-100 shadow-xl rounded-lg my-10">
            <h2 className="text-2xl font-bold text-center">Make A Payment</h2>
            <p className="text-center mt-2">Subscription Plan: <strong>{selectedDuration}</strong></p>

            {/* Payment Button */}
            <div className="flex justify-center">
                <button
                    className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white mt-4"
                    onClick={handlePayment}
                    disabled={loading}
                >
                    {loading ? "Processing Payment..." : "Pay Now"}
                </button>
            </div>
        </div>
    );
}
