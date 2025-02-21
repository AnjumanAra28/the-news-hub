// SubscriptionModal.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SubscriptionModal = ({ show, onClose }) => {
  const navigate = useNavigate();

  const handleNavigateToSubscription = () => {
    navigate('/subscription');
    onClose(); 
  };

  if (!show) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-2xl font-bold text-center mb-4">Exclusive Subscription Offer</h2>
        <p className="text-center mb-6">Unlock unlimited access by subscribing now!</p>
        <div className="flex justify-center gap-4">
          <button onClick={handleNavigateToSubscription} className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
             Subscribe Now
          </button>
          <button onClick={onClose} className="btn btn-outline ">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
