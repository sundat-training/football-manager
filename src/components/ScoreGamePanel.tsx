
export function ScoreGamePanel() {
  return (

    <div
      className='flex flex-row gap-x-2 p-2 border shadow-md'
    >
      <div
        className='w-1/2 flex flex-col space-y-1 justify-center'
      >
       <div>team1</div>
       <div className="flex flex-row space-x-4">
        <div>missGoal</div>
        <div>Goal</div>
       </div>
       <div className="flex flex-row space-x-4">
        <div>YC</div>
        <div>RC</div>
       </div>

      </div>
      <div
        className='w-1/2 flex flex-col space-y-2 '
      >
       <div>team2</div>

       <div className="flex flex-row space-x-4">
        <div>missGoal</div>
        <div>Goal</div>
       </div>
       <div className="flex flex-row space-x-4">
        <div>YC</div>
        <div>RC</div>
       </div>

      </div>

    </div>
  );
}
