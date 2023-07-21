import React from 'react';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Dashboard from '../components/Dashboard';
//import Footer from '../components/Footer';

const Home = () => {
    return (
        <div>
            <Header/>
            <Menu/>
            <Dashboard/> 
        </div>
    );
};

export default Home;