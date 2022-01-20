import React, {useState, useEffect} from 'react';
import { API_KEY, weekIndex, monthIndex } from '../settings';
import '../css/WeeklyScores.css';

import Dropdown from 'react-bootstrap/Dropdown';
import NFLIcon from './NFLIcon';

function WeeklyScores({seasonState, style}) {

  const [activeWeek, setActiveWeek] = useState(seasonState.week)
  const [activeType, setActiveType] = useState(seasonState.type);
  const [weekScores, setWeekScores] = useState([]);

  const weeks = ["18", "17", "16", "15", "14", "13", "12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1"];
  const postseason = ['Super Bowl', 'Conference', 'Divisional', 'Wild Card'];

  useEffect(() => {
    const url = `https://api.sportsdata.io/v3/nfl/scores/json/ScoresByWeek/${seasonState.season}${activeType}/${activeWeek}?key=${API_KEY}`;
    const fetchWeekScores = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setWeekScores(json);
    }
    fetchWeekScores();
  }, [activeWeek, activeType, seasonState.season])


  const onDropdownSelect = (eventKey, event) => {
    const info = eventKey.split('-');
    setActiveType(info[0]);
    setActiveWeek(info[1]);
  }

  const allGames = weekScores.sort(function(a,b) {
    return new Date(a.DateTimeUTC) - new Date(b.DateTimeUTC);
  }).map(entry => <GameEntry gameData={entry}/>)

  return (
    <div className="weeklyscores" style={style}>
      <div className="weeklyscores__header">
        <h2>Weekly Scores</h2>
        <Dropdown className='weeklyscores__dropdown' onSelect={onDropdownSelect}>
          <Dropdown.Toggle id='dropdown-week-select' variant='outline-dark'>
            {activeType === "REG" && activeWeek}
            {activeType === "POST" && postseason[4-parseInt(activeWeek)]}
          </Dropdown.Toggle>
          <Dropdown.Menu className='dropdown__menu'>
            {postseason.map((week, index) => {
              if(seasonState.type !== 'POST'){ return null } 
              if(4-index <= parseInt(seasonState.week)){
                return <Dropdown.Item className='dropdown__item' eventKey={`POST-${4-index}`}>{week}</Dropdown.Item>
              }
              return null;
            })}
            <Dropdown.Divider />
            {weeks.map((week) => {
              if(seasonState.type === 'POST') {
                return <Dropdown.Item className='dropdown__item' eventKey={`REG-${week}`}>{week}</Dropdown.Item>
              }
              return null;
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {allGames}
    </div>
  )
}

function GameEntry({gameData}) {

  const convertDate = () => {
    let date = new Date(gameData.DateTime);
    return (weekIndex[date.getDay()] + ", " + monthIndex[date.getMonth()] + " " + date.getDate() + " | " + date.toLocaleTimeString()).replace(":00 ", " ");
  }

  return (
    <div className="gameentry">
      <h6>{convertDate()}</h6>
      <div className="gameentry__body">
        <div className="gameentry__results">
          <NFLIcon team={gameData.AwayTeam} size={70} />
          <h2>{gameData.AwayTeam}</h2>
          {!gameData.HasStarted && 
            <h4>@</h4> }
          {gameData.HasStarted && <div className="gameentry__information">
            <h2>{gameData.AwayScore} - {gameData.HomeScore}</h2>
            <p>{gameData.QuarterDescription}</p>
          </div>}
          <h2>{gameData.HomeTeam}</h2>
          <NFLIcon team={gameData.HomeTeam} size={70} />
        </div>
        <div className="gameentry__update">
          <p>Last updated: {new Date(gameData.LastUpdated).toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}

export default WeeklyScores;
