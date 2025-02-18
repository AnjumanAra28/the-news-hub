import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const MyProfile = () => {
    const { user, refetch } = useAuth(); // Get user data
    const axiosPublic = useAxiosPublic();
    const [isEditing, setIsEditing] = useState(false);
    const [updatedInfo, setUpdatedInfo] = useState({
        name: user?.displayName || "",
        email: user?.email || "",
        photoURL: user?.photoURL || "",
    });

    // Handle input changes
    const handleChange = (e) => {
        setUpdatedInfo({ ...updatedInfo, [e.target.name]: e.target.value });
    };

    // Update profile
    const handleUpdate = async () => {
        const res = await axiosPublic.patch(`/updateProfile/${user._id}`, updatedInfo);
        if (res.data.modifiedCount > 0) {
            Swal.fire("Profile Updated!", "Your information has been updated.", "success");
            refetch();
            setIsEditing(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
         
            <div className="bg-white shadow-lg rounded-lg p-6 text-center w-full max-w-md">
                <img src={user?.photoURL} alt="Profile" className="w-24 h-24 mx-auto rounded-full border-4 border-blue-400" />
                <h2 className="text-xl font-semibold mt-3">{user?.displayName}</h2>
                <p className="text-gray-600">{user?.email}</p>

        
                <button onClick={() => setIsEditing(true)} className="mt-4 btn btn-primary">Edit Profile</button>
            </div>

            {/* Modal for Editing */}
            {isEditing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

                        <input
                            type="text"
                            name="name"
                            value={updatedInfo.name}
                            onChange={handleChange}
                            className="input input-bordered w-full mb-3"
                            placeholder="Full Name"
                        />

                        <input
                            type="email"
                            name="email"
                            value={updatedInfo.email}
                            readOnly
                            className="input input-bordered w-full mb-3"
                        />

                        <input
                            type="text"
                            name="photoURL"
                            value={updatedInfo.photoURL}
                            onChange={handleChange}
                            className="input input-bordered w-full mb-3"
                            placeholder="Profile Picture URL"
                        />

                        <div className="flex justify-end gap-2">
                            <button onClick={() => setIsEditing(false)} className="btn btn-ghost">Cancel</button>
                            <button onClick={handleUpdate} className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyProfile;
