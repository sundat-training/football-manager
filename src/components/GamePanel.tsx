import { MannschaftsPanel } from './MannschaftsPanel';
import { format } from 'date-fns';

export type MatchDetails={
  id: number,
  team1: string,
  team2: string,
  flag1: string,
  flag2: string,
  score_team1: number,
  score_team2:number,
  status: "finished" | "running" | "pending"
};

export type GamePanelProps ={
  matchDetails: MatchDetails,
  date: Date,
  setGame: (id:number) => void
}

export function GamePanel({matchDetails,date,setGame}: GamePanelProps) {
  const {team1,score_team1,flag1,team2,score_team2,flag2,status} = matchDetails;
  const fdate= status=="finished" ? "Endstand" : format(date,"eeeeee, dd.MM")
  const ftime= status=="finished" ? format(date,"eeeeee, dd.MM"): format(date,"HH:mm")
  return (
    <div
      className='flex flex-row gap-x-2 p-4 border shadow-md'
       onClick={() => setGame(matchDetails.id)      }
    >
      <div
        className='w-3/4 flex flex-col space-y-1 justify-center'
      >
        {/* mannschaft 1 */}
        <MannschaftsPanel name={team1} goals={score_team1} short={flag1}/>

        {/* mannschaft 2 */}
        <MannschaftsPanel name={team2} goals={score_team2} short={flag2}/>

      </div>
      <div
        className='w-1/4 flex flex-col space-y-2 text-xs '
      >
        <div>
          <p>{fdate}</p>
          <p>{ftime}</p>
        </div>
        <div
          className='flex justify-center items-center'
        >
          <img src="https://dummyimage.com/74x48/de5a2a/0011ff&text=vorschau" />
        </div>

      </div>

    </div>
  );
}
