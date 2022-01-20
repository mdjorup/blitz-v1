import React, {useState, useEffect} from 'react';
import './App.css';
import {API_KEY} from './settings.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './pages/Home.js';



function App() {
  const [seasonState, setSeasonState] = useState(
    {
      season: '2019',
      type: 'REG',
      week: '1'
    }
  )
   

  useEffect(() => {
    const seasonURL = `https://api.sportsdata.io/v3/nfl/scores/json/CurrentSeason?key=${API_KEY}`;
    const weekURL = `https://api.sportsdata.io/v3/nfl/scores/json/CurrentWeek?key=${API_KEY}`;
    const fetchSeason = async () => {
      const response = await fetch(seasonURL);
      const json = await response.json();
      setSeasonState(prevState => ({...prevState, season: json }))
    }
    const fetchWeek = async () => {
      const response = await fetch(weekURL);
      const json = await response.json();
      setSeasonState(prevState => ({...prevState, week: json}))
    }
    fetchSeason();
    fetchWeek();
    const today = new Date();
    if (today.getUTCMonth() <= 1){
      setSeasonState(prevState => ({...prevState, type: 'POST'}))
    }
  }, [])


  

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home seasonState={seasonState}/>}/>
      </Routes>
    </Router>
  );
}


export default App;
