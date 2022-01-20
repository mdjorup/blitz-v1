import React from 'react';
//import Button from 'react-bootstrap/Button';
import '../css/Home.css';

import Header from '../components/Header';
import WeeklyScores from '../components/WeeklyScores';

function Home({seasonState}) {

  return (
  <div className='home'>
    <Header />
    <div className="home__body">
      <WeeklyScores seasonState={seasonState} style={{flex: 0.6}}/>
      <div style={{flex: 0.4}}>
        <h1>Right side</h1>
      </div>
    </div>
  </div>
  );
}

export default Home;
