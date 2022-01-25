import React, { useState, useEffect } from 'react';
import '../css/Picks.css';
import { API_KEY } from '../settings';

import Header from '../components/Header';
import Button from 'react-bootstrap/Button';
import NFLIcon from '../components/NFLIcon';

function GamePick({gameData, pick, handleSelection}) {
  return(
    <div className="gamepick">
      <Button className='teambtn' variant={pick===1 ? 'dark' : 'outline-dark'} onClick={()=>handleSelection(gameData.GameKey, 1)}>
        {gameData.AwayTeam}
        <NFLIcon team={gameData.AwayTeam} size={50}/>
      </Button>
      <Button className='teambtn' variant={pick===2 ? 'dark' : 'outline-dark'} onClick={()=>handleSelection(gameData.GameKey, 2)}>
        {gameData.HomeTeam}
        <NFLIcon team={gameData.HomeTeam} size={50}/>
      </Button>
    </div>
  )

}

function Picks({user, seasonState}) {

  const [games, setGames] = useState([])
  const [picks, setPicks] = useState({
    202130316: 1,
  })

  useEffect(() => {
    const url = `https://api.sportsdata.io/v3/nfl/scores/json/ScoresByWeek/2021POST/3?key=${API_KEY}`;
    const fetchWeekScores = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setGames(json);
    }
    fetchWeekScores();
  }, [])

  //need to retrieve previous picks

  const handleSelection = (gameKey, selection) => {
    if(!picks.gameKey){
      setPicks({...picks, [gameKey]: selection})
    } else if(selection === 1){
      setPicks({...picks, [gameKey]: 2})
    } else if(selection === 2){
      setPicks({...picks, [gameKey]: 1})
    }
    
  }

  const renderGames = games.sort(function(a,b) {
    return new Date(a.DateTimeUTC) - new Date(b.DateTimeUTC);
  }).map(entry => {
    return <GamePick key={entry.GameKey} gameData={entry} pick={picks[entry.GameKey]} handleSelection={handleSelection}/>
  })

  return (
    <div className="picks">
      <Header user={user} />
      <div className="picks__page__body">
        <h1>Make Picks</h1>
        {renderGames}
        <br/>
        {JSON.stringify(picks)}
      </div>
    </div>
  );
}

export default Picks;
