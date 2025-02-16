import React from "react";

const Modal = ({ reason, setReason, onClose, onSubmit }) => {
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Decline Reason</h2>
                <textarea
                    className="border p-2 w-full"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Write the reason for declining the article..."
                    rows="4"
                />
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-black px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSubmit}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
