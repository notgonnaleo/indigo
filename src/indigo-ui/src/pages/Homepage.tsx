import React from 'react';
import Navbar from '../components/layout/Navbar';

const Homepage: React.FC = () => {
    return (
        <>
            <Navbar />
            <div style={{ padding: '20px' }}>
                <h1>Hello World</h1>
            </div>
        </>
    );
};

export default Homepage;