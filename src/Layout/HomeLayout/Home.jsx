import React from 'react';
import Banner from './Banner';
import Publisher from './Publisher';
import Plans from './Plans';
import Statistics from './Statistics';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Publisher></Publisher>
            <Statistics></Statistics>
            <Plans></Plans>
        </div>
    );
};

export default Home;