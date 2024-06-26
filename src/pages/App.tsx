import './App.css'
import { GamePanel, MatchDetails } from '../components/GamePanel'
import { useEffect, useState } from 'react';
import { GamePlaceholder } from '../components/GamePlaceholder';
import { ScoreGameData, ScoreGamePanel } from '../components/ScoreGamePanel';
import { fetchGamesData, fetchTeamsData, patchGameStatus } from '../tools/api';
 

type Group = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

type GameStatus = 'finished' | 'running' | 'pending';

export interface Game {
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
  const [viewGame, setViewGame] = useState<Game>()
  const [scoreGame, setScoreGame] = useState<Game>()

  const POLLING_INTERVAL = 2000
  
  
  useEffect( () =>{
   
    const intervalId = setInterval(() => {
      console.log("moep");
      fetchTeamsData()
      .then(data => setTeams(data))

      fetchGamesData()
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

  function scoreThisGame(id: number){
    const gg = games.filter(g => g.id == id)[0]
    if (gg) setScoreGame(gg)
  }
  function endGame(id: number){
    const gg = games.filter(g => g.id == id)[0]

    if (gg) {
      const ggg:Game = {...gg, status: 'finished'}
      setViewGame(ggg);
      setScoreGame(undefined);
    }
    const pg:Partial<Game> = {id, status: 'finished'}
    patchGameStatus(pg)
  }
  function handleChangeGame(id: number){
    const gg = games.filter(g => g.id == id)[0]
    if (gg) setViewGame(gg)
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

  function enrichScoreGame(scoreGame: Game, teams: Team[]): ScoreGameData {
    const matchDetails = joinTeams(scoreGame, teams);
    return {
    ...matchDetails,
    yellowCard_team1: 0,
    redCard_team1: 0,
    yellowCard_team2: 0,
    redCard_team2: 0

    } ;
  }
  return (
    <>
      <h1 className='mb-5'>Fußballmanager</h1>
      <div>
        <div>#teams: {teams.length}</div>
        <div>#games: {games.length}</div>
      </div>

      {teams.length != 0 && (
        <div className=' flex flex-col space-y-4 mt-4'>
          
          {!viewGame && <GamePlaceholder />}
          
          {viewGame && !scoreGame && (
            <>
              <GamePanel
                matchDetails={joinTeams(viewGame, teams)}
                date={viewGame.datetime}
                setGame={() => console.log("nope")}
              />
              <button
                className='disabled:opacity-50 disabled:border-none'
                disabled={viewGame.status === 'finished'}
                onClick={() => scoreThisGame(viewGame.id)}
              >
                SCORE
              </button>
            </>
          )}

          {scoreGame && (
            <>
            <ScoreGamePanel game={enrichScoreGame(scoreGame,teams)}/>
              <button
                className=''
                onClick={() => endGame(scoreGame.id)}
              >
                End Game
              </button>
            </>
            )
          }

        </div>
      )}

      <div className='mt-6  grid grid-cols-2 gap-2'>
        {games.map((g) => (
          <GamePanel
            matchDetails={joinTeams(g, teams)}
            date={g.datetime}
            setGame={(id) => handleChangeGame(id)}
          />
        ))}
      </div>
    </>
  );
}


export default App


