import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Feedpage from './pages/Feedpage';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/Feedpage" element={<Feedpage />} />
        </Routes>
    );
};

export default AppRoutes;