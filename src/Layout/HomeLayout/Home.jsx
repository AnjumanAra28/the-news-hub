import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import Publisher from './Publisher';
import Plans from './Plans';
import Statistics from './Statistics';
import SubscriptionModal from '../../Components/SubscriptionModal';
import Testimonials from './Testimonials';
import Faq from './Faq';
import { Helmet } from 'react-helmet-async';

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
            <Helmet>
                <title>News Hub | Home</title>
            </Helmet>

            <Banner></Banner>
            <Publisher></Publisher>
            <Statistics></Statistics>
            <Plans></Plans>
            <Testimonials></Testimonials>
            <Faq></Faq>


            <SubscriptionModal show={showModal} onClose={handleCloseModal} />
        </div>
    );
};

export default Home;