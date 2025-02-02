import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Feedpage from './pages/Feedpage';
import Inbox from './pages/Inbox';
import Menu from './components/layout/mobile/Menu';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/Menu" element={<Menu />} />
            <Route path="/Homepage" element={<Homepage />} />
            <Route path="/Feedpage" element={<Feedpage />} />
            <Route path="/Inbox" element={<Inbox />} />
        </Routes>
    );
};

export default AppRoutes;