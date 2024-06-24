type MannschaftsPanelProps = {
  name?: string;
  goals?: number;
  short?: string;
};
export function MannschaftsPanel({ name, goals, short }: MannschaftsPanelProps) {
  short = short || "flag";
  name = name || "MannschaftXXX";
  const url = "https://dummyimage.com/24x24/c41cc4/0011ff&text=" + short;

  return <div className='flex flex-row space-x-3 items-center'>
    <div
    className="w-2/12"
    >
      <img src={url} />
    </div>
    <div className='w-full text-left'>
      {name}
    </div>
    <div
      className='w-2/12'
    >
      {goals ? goals : 0}
    </div>
  </div>;
}
