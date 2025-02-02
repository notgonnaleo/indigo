import React from 'react';
import MainLayout from '../components/layout/MainLayout';

const Homepage: React.FC = () => {
    return (
        <>
        <MainLayout>
            <div style={{ padding: '20px' }}>
                <h1>Hello World</h1>
            </div>
        </MainLayout>
        </>
    );
};

export default Homepage;