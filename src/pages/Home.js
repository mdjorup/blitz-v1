import React from 'react';
//import Button from 'react-bootstrap/Button';
import '../css/Home.css';

import Header from '../components/Header';

function Home({seasonState}) {
  return (
  <div className='home'>
    <Header />
    <div className="home__body">
      <div className="home__scores">
        <h4>{seasonState.season}</h4>
        <h4>{seasonState.type}</h4>
        <h4>{seasonState.week}</h4>
      </div>
      <div className="home__news">
        <h4>News</h4>
      </div>
    </div>
  </div>
  );
}

export default Home;
