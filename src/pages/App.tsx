import './App.css'
import { GamePanel, MatchDetails } from '../components/GamePanel'
import { useEffect, useState } from 'react';
const zdata:MatchDetails=  {
    team1: "Deutschland",
    score_team1: 5,
    flag1: "deu",
    team2: "Scottland",
    score_team2: 1,
    flag2: "sct",
    status: "finished"
  }
const gdata= [1,2,3,4].map(i => ({...zdata}))
console.log(gdata);
 
const api = "http://localhost:3000"

type Group = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

type GameStatus = 'finished' | 'running' | 'pending';

interface Game {
  group: Group;
  datetime: string; // ISO 8601 format with timezone
  team1: number;
  team2: number;
  status: GameStatus;
  score_team1: number | null;
  score_team2: number | null;
}
interface Team {
  id: number;
  name: string;
  country_code: string;
}



function App() {
  const [teams,setTeams]= useState([])
  const [games,setGames]= useState([])

  const gameData: MatchDetails={
    team1: "Deutschland",
    score_team1: 5,
    flag1: "deu",
    team2: "Scottland",
    score_team2: 1,
    flag2: "sct",
    status: "finished"
  }
  const date= new Date("2024.06.24 18:30")
  
  useEffect( () =>{
      console.log("moep");
      fetch(api+ "/teams")
        .then(b => b.json())
        .then(data => setTeams(data));
  
      fetch(api+ "/games")
        .then(b => b.json())
        .then(data => setGames(data));

  }, [] )


  function joinTeams(g : Game, teams : Team[]){
      const team1 = teams.filter(t => t.id == g.team1)[0].name
      const team2 = teams.filter(t => t.id == g.team2)[0].name
      return {...g, team1,team2} as unknown as MatchDetails
  }

  return (
    <>
      
    <h1 className='mb-5'>Fußballmanager</h1>
    <div>
      <div>#teams: {teams.length}</div>
      <div>#games: {games.length}</div>
    </div>

     <GamePanel matchDetails={gameData} date={date} /> 

     <div
     className='mt-6  grid grid-cols-2 gap-2'
     >
      {
        games.map( g =>
          <GamePanel matchDetails={joinTeams(g,teams)} date={date}/>
        )
      }

     </div>
    </>
  )
}


export default App


