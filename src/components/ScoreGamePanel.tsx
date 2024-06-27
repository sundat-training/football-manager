
      export function ScoreGamePanel() {
        return (
          <div className='flex flex-row gap-x-2 p-2 border shadow-md'>
            <ScoreTeam
              team='Team A'
              goal={0}
              onMissGoal={() => {   }}
              onScoreGoal={() => {   }}
              onYellowCard={() => {   }}
              onRedCard={() => {   }}
            />
            <ScoreTeam
              team='Team B'
              goal={0}
              onMissGoal={() => {   }}
              onScoreGoal={() => {   }}
              onYellowCard={() => {   }}
              onRedCard={() => {   }}
            />
          </div>
        );
      }

type ScoreTeamProps = {
  team: string;
  goal: number;
  onMissGoal: () => void;
  onScoreGoal: () => void;
  onYellowCard: () => void;
  onRedCard: () => void;
};

      function ScoreTeam({ team, goal, onMissGoal, onScoreGoal,  onYellowCard, onRedCard }: ScoreTeamProps) {
        return (
          <div className='w-1/2 flex flex-col space-y-1 justify-center'>
            <div>{goal}</div>
            <div>{team}</div>
            <div className="flex flex-row space-x-4">
              <button onClick={onMissGoal}>missGoal</button>
              <button onClick={onScoreGoal}>goal</button>
            </div>
            <div className="flex flex-row space-x-4">
              <button onClick={onYellowCard}>YC</button>
              <button onClick={onRedCard}>RC</button>
            </div>
          </div>
        );
      }

