import React, { useState, useEffect } from 'react';
import '../css/Picks.css';
import { API_KEY } from '../settings';
import {db} from '../firebase.js';
import {doc, getDoc, setDoc} from 'firebase/firestore'

import Header from '../components/Header';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import NFLIcon from '../components/NFLIcon';
import { useNavigate } from 'react-router-dom';

function GamePick({gameData, pick, handleSelection}) {
  return(
    <div className="gamepick">
      <Button className='teambtn' variant={pick==="away" ? 'dark' : 'outline-dark'} onClick={()=>handleSelection(gameData.GameKey, 'away')}>
        {gameData.AwayTeam}
        <NFLIcon team={gameData.AwayTeam} size={50}/>
      </Button>
      <Button className='teambtn' variant={pick==='home' ? 'dark' : 'outline-dark'} onClick={()=>handleSelection(gameData.GameKey, 'home')}>
        {gameData.HomeTeam}
        <NFLIcon team={gameData.HomeTeam} size={50}/>
      </Button>
    </div>
  )

}



function Picks({user, seasonState}) {

  const [games, setGames] = useState([])
  const [picks, setPicks] = useState({})
  const [submitLoading, setSubmitLoading] = useState(false);



  const navigate = useNavigate();

  const fetchPicks = async () => {
    const docRef = doc(db, 'Users', user.uid, 'Picks', `${seasonState.season}_${seasonState.type}_${seasonState.week}`)
    const docSnap = await getDoc(docRef)
    setPicks(docSnap.data());
  }

  useEffect(() => {
    const url = `https://api.sportsdata.io/v3/nfl/scores/json/ScoresByWeek/2021POST/3?key=${API_KEY}`;
    const fetchWeekScores = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setGames(json);
    }
    fetchWeekScores();
  })

  
  useEffect(() => {
    fetchPicks();
  }, [])

  //need to retrieve previous picks

  const handleSelection = (gameKey, selection) => {
    if(!picks.gameKey){
      setPicks({...picks, [gameKey]: selection})
    } else if(selection === 'away'){
      setPicks({...picks, [gameKey]: 'home'})
    } else if(selection === 'home'){
      setPicks({...picks, [gameKey]: 'away'})
    }
    
  }

  const renderGames = games.sort(function(a,b) {
    return new Date(a.DateTimeUTC) - new Date(b.DateTimeUTC);
  }).map(entry => {
    return <GamePick key={entry.GameKey} gameData={entry} pick={picks[entry.GameKey]} handleSelection={handleSelection}/>
  })

  const onSubmit = async (e) => {
    
    setSubmitLoading(true);
    const ref = doc(db, 'Users', user.uid, 'Picks', `${seasonState.season}_${seasonState.type}_${seasonState.week}`)
    await setDoc(ref, picks);
    setSubmitLoading(false)
    e.preventDefault();
  }

  return (
    <div className="picks">
      <Header user={user} />
      <div className="picks__page__body">
        <h1>Make Picks</h1>
        {renderGames}
        <br/>
        {!submitLoading && <Button variant='primary' disabled={games.length!==Object.keys(picks).length} onClick={onSubmit}>Submit</Button>}
        {submitLoading && <Spinner animation='border'/>}
        {JSON.stringify(picks)}
      </div>
    </div>
  );
}

export default Picks;
