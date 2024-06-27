import { useEffect, useState } from "react";
import { MatchDetails } from "./GamePanel";

type ScoreGameData= MatchDetails &{
  yellowCard_team1: number,
  redCard_team1: number,
  yellowCard_team2: number,
  redCard_team2: number
}
const testData:ScoreGameData = {
  id: 1,
  team1: "Team A",
  team2: "Team B",
  flag1: "flag1",
  flag2: "flag2",
  score_team1: 0,
  score_team2: 0,
  status: "running",
  yellowCard_team1: 0,
  redCard_team1: 0,
  yellowCard_team2: 0,
  redCard_team2: 0
};

export function ScoreGamePanel() {
  const [scoreData, setScoreData] = useState<ScoreGameData >(testData)

  function inc(key: keyof ScoreGameData) {
    setScoreData(d => 
      ({...d, [key]: d[key] as number + 1}))
  }
  function dec(key: keyof ScoreGameData) {
    if (scoreData[key] === 0) return;
    setScoreData(d => 
      ({...d, [key]: d[key] as number - 1}))
  }
  // Daten als statehook, für die beiden Teams
  // goal, yellowCard, redCard  eweils für beide Teams
  return (
    <div className='flex flex-row gap-x-6 p-2 border shadow-md'>
      <ScoreTeam
        left={true}
        team={scoreData.team1 }
        goal={scoreData.score_team1}
        yellowCard={scoreData.yellowCard_team1}
        redCard={scoreData.redCard_team1}
        onMissGoal={() => dec("score_team1")}
        onScoreGoal={() => inc("score_team1")  }
        onYellowCard={() => inc("yellowCard_team1")}
        onRedCard={() => inc("redCard_team1")}
      />
      <ScoreTeam
        left={false}
        team={scoreData.team2}
        goal={scoreData.score_team2}
        yellowCard={scoreData.yellowCard_team2}
        redCard={scoreData.redCard_team2}
        onMissGoal={() => dec("score_team2")}
        onScoreGoal={() => inc("score_team2")}
        onYellowCard={() => inc("yellowCard_team2")}
        onRedCard={() => inc("redCard_team2")}
      />
    </div>
  );
}

type ScoreTeamProps = {
  team: string;
  goal: number;
  yellowCard: number;
  redCard: number;
  left: boolean;
  onMissGoal: () => void;
  onScoreGoal: () => void;
  onYellowCard: () => void;
  onRedCard: () => void;
};

      function ScoreTeam({ team, goal,yellowCard,redCard, left, onMissGoal, onScoreGoal,  onYellowCard, onRedCard }: ScoreTeamProps) {
        const goalies = <div 
        className="flex w-3/12 items-center justify-center font-extrabold text-5xl"
        >
         {goal}
          </div>;
        return (
          <div className="flex flex-row w-1/2">
          {!left && goalies}  
          <div className='flex flex-col space-y-1 justify-center w-9/12'>
            <div className="flex flex-row space-x-4">
              <span>RC: {redCard}</span> 
              <span>YC: {yellowCard}</span>
              </div>
            <div>{team}</div>
            <div className="flex flex-row space-x-4">
              <button onClick={onMissGoal}>missGoal</button>
              <button onClick={onScoreGoal}>goal</button>
            </div>
            <div className="flex flex-row space-x-4">
              <button onClick={onYellowCard}>YC </button>
              <button onClick={onRedCard}>RC </button>
            </div>
          </div>
          {left && goalies}
          </div>
        );
      }

