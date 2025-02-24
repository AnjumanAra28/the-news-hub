import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import Publisher from './Publisher';
import Plans from './Plans';
import Statistics from './Statistics';
import SubscriptionModal from '../../Components/SubscriptionModal';
import Testimonials from './Testimonials';

const Home = () => {

    const [showModal, setShowModal] = useState(false);

    // Show modal after 10 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowModal(true); 
        }, 10000);

        return () => clearTimeout(timer); 
    }, []); 

    const handleCloseModal = () => {
        setShowModal(false); 
    };

    return (
        <div>
            <Banner></Banner>
            <Publisher></Publisher>
            <Statistics></Statistics>
            <Plans></Plans>
            <Testimonials></Testimonials>


            <SubscriptionModal show={showModal} onClose={handleCloseModal} />
        </div>
    );
};

export default Home;