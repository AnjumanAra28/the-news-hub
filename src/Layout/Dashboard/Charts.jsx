import React from 'react';
import PieCharts from './PieCharts';
import UserStats from './UserStats';
import GrowthChart from './GrowthChart';

const Charts = () => {
    return (
        <div>
            <PieCharts></PieCharts>
            <UserStats></UserStats>
            <GrowthChart></GrowthChart>
        </div>
    );
};

export default Charts;