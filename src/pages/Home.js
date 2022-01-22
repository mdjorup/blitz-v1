import React from 'react';
//import Button from 'react-bootstrap/Button';
import '../css/Home.css';

import Header from '../components/Header';
import WeeklyScores from '../components/WeeklyScores';

function Home({user, seasonState}) {

  return (
  <div className='home'>
    <Header user={user} />
    <div className="home__body">
      <WeeklyScores seasonState={seasonState} style={{flex: 0.4}}/>
      <div style={{flex: 0.6}}>
        <h1>Right side</h1>
      </div>
    </div>
  </div>
  );
}

export default Home;
