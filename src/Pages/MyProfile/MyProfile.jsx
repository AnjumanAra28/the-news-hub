import { useState } from "react";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

export default function MyProfile() {
    const axiosPublic = useAxiosPublic()
    const { user, updateUserProfile ,setUser} = useAuth();
    const [name, setName] = useState(user?.displayName || "");
    const [photo, setPhoto] = useState(user?.photo || "");
    const [message, setMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: loggedUser = {}, refetch } = useQuery({
        queryKey: ['user',user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/${user?.email}`);
            return res.data;
        }
    })

    console.log(loggedUser);
    // Open Modal & Pre-Fill Data
    const openModal = () => {
        setName(user?.displayName || "");
        setPhoto(user?.photoURL || "");
        setIsModalOpen(true);
    };

    console.log(user);
    // Close Modal
    const closeModal = () => {
        setIsModalOpen(false);
        setMessage("");
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const userRes =  await axiosPublic.put(`/updateUser/${user?.email}`, { name, photo });
        if (userRes.data.modifiedCount > 0) {

            await updateUserProfile({ displayName: name, photoURL: photo });
            
            user.displayName = name;
            user.photoURL = photo;
    
            refetch()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Article is added to the database.`,
                showConfirmButton: false,
                timer: 1500,
            });
        }

        closeModal();
    };


    return (
        <div className="p-6 max-w-lg mx-auto bg-base-100 shadow-xl rounded-lg">
            <h2 className="text-2xl font-bold text-center">My Profile</h2>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center mt-4"
            >
                <img
                    src={user?.photoURL}
                    alt="Profile"
                    className="w-24 h-24 mx-auto rounded-full shadow-md"
                />
                <p className="mt-2 text-lg font-semibold">{user?.displayName}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
            </motion.div>

            {/* Edit Profile Button */}
            <button className="btn btn-primary mt-4 w-full" onClick={openModal}>
                Edit Profile
            </button>

            {/* Modal (DaisyUI) */}
            {isModalOpen && (
                <dialog open className="modal modal-open">
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="modal-box"
                    >
                        <h3 className="font-bold text-lg">Update Profile</h3>
                        <form onSubmit={handleUpdate} className="space-y-4 mt-4">
                            <input
                                type="text"
                                placeholder="Enter new name"
                                className="input input-bordered w-full"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Enter new photo URL"
                                className="input input-bordered w-full"
                                value={photo}
                                onChange={(e) => setPhoto(e.target.value)}
                            />
                            <div className="flex justify-end space-x-2 mt-4">
                                <button type="submit" className="btn btn-primary">
                                    Save
                                </button>
                                <button type="button" className="btn" onClick={closeModal}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                        {message && <p className="text-green-500 mt-2">{message}</p>}
                    </motion.div>
                </dialog>
            )}
        </div>
    );
}
