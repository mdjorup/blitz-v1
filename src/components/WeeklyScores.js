import React, {useState, useEffect} from 'react';
import { API_KEY } from '../settings';
import '../css/WeeklyScores.css';

import Dropdown from 'react-bootstrap/Dropdown';

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
            })}
            <Dropdown.Divider />
            {weeks.map((week) => {
              if(seasonState.type === 'POST') {
                return <Dropdown.Item className='dropdown__item' eventKey={`REG-${week}`}>{week}</Dropdown.Item>
              }
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>

    </div>
  )
}

export default WeeklyScores;
