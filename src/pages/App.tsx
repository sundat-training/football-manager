import './App.css'
import { GamePanel, MatchDetails } from '../components/GamePanel'
import { useEffect, useState } from 'react';
import { GamePlaceholder } from '../components/GamePlaceholder';
 
const api = "http://localhost:3000"

type Group = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

type GameStatus = 'finished' | 'running' | 'pending';

interface Game {
  id: number;
  group: Group;
  datetime: Date; // ISO 8601 format with timezone
  team1: number;
  team2: number;
  status: GameStatus;
  score_team1: number ;
  score_team2: number ;
}
interface Team {
  id: number;
  name: string;
  country_code: string;
}



function App() {
  const [teams,setTeams]= useState([])
  const [games,setGames]= useState<Game[]>([])
  const [actGame, setActGame] = useState<Game>()

  const POLLING_INTERVAL = 2000
  
  
  useEffect( () =>{
   
    const intervalId = setInterval(() => {
      console.log("moep");
      fetch(api + "/teams")
        .then(b => b.json())
        .then(data => setTeams(data));

      fetch(api + "/games")
        .then(b => b.json())
        //@ts-ignore
        .then(d => d.map(g => ({...g, dateTime:new Date(g.dateTime)})))
        .then(data => setGames(data)
                      
                      );
        
    },
      POLLING_INTERVAL);
    
        return () => clearInterval(intervalId);
  }, [] )

  useEffect( () =>{
      // console.log(JSON.stringify(
      //   games.map( (g:Game,idx) =>({...g,id:idx+1}))
      //   ));
  } , [games])

  function handleChangeGame(id: number){
    const gg = games.filter(g => g.id == id)[0]
    if (gg) setActGame(gg)
  }
  
  function joinTeams(g : Game, teams : Team[]) :MatchDetails{
      const t1 = teams.filter(t => t.id == g.team1)[0]
      const t2 = teams.filter(t => t.id == g.team2)[0]
      
      const team1=t1.name
      const team2=t2.name

      const flag1=t1.country_code
      const flag2=t2.country_code
      return {...g, team1,team2,flag1,flag2} 
  }

  return (
    <>
      
    <h1 className='mb-5'>Fußballmanager</h1>
     <div>
      <div>#teams: {teams.length}</div>
      <div>#games: {games.length}</div>
    </div>
    
      {
        (teams.length != 0) &&
        <div
          className=' flex flex-col space-y-4 mt-4'
        >

          {actGame
            ? <GamePanel matchDetails={joinTeams(actGame, teams)} date={actGame.datetime} setGame={_ => console.log("nope")} />
            : <GamePlaceholder  />}

          <button
          className='disabled:text-slate-200 disabled:border-0 '
          disabled={actGame==undefined }
          onClick={() => console.log("score clicked")}
          >
            SCORE
            </button> 
        </div>
      }
    
     <div
     className='mt-6  grid grid-cols-2 gap-2'
     >
      {
        games.map( g =>
          <GamePanel matchDetails={joinTeams(g,teams)} date={g.datetime} setGame={(id) => handleChangeGame(id) }/>
        )
      }

     </div> 
    </>
  )
}

export default App


