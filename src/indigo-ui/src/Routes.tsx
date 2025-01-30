import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Feedpage from './pages/Feedpage';
import Inbox from './pages/Inbox';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/Feedpage" element={<Feedpage />} />
            <Route path="/Inbox" element={<Inbox />} />
        </Routes>
    );
};

export default AppRoutes;