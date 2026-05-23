import React from 'react';
import Topstory from './Topstory'
import Trending from './Trending';
import Navbar from '../Navbar';
import Footer from '../Footer';

function Homepage() {
    return ( 
        <>
        <Topstory/>
        <Trending/>
        </>
     );
}

export default Homepage;