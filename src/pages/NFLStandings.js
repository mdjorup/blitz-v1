import React from 'react';
import '../css/NFLStandings.css';

import Header from '../components/Header.js';

import { Button } from 'react-bootstrap';

function NFLStandings({user, seasonState}) {

  return (
    <div className="nflstandings">
      <Header user={user} />
      These are the nfl standings.
      

    </div>
  );
}

export default NFLStandings;
