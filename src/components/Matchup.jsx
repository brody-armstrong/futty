import Pitch from './Pitch';

const Matchup = ({ homeTeam, awayTeam }) => {
  return (
    <div className="flex justify-between">
      <div className="w-1/2">
        <h3 className="text-lg font-semibold mb-2">{homeTeam.name}</h3>
        <Pitch>
          {homeTeam.lineup.map((player) => (
            <div key={player.id} className="p-2 bg-white rounded shadow">
              {player.name}
            </div>
          ))}
        </Pitch>
      </div>
      <div className="w-1/2">
        <h3 className="text-lg font-semibold mb-2">{awayTeam.name}</h3>
        <Pitch>
          {awayTeam.lineup.map((player) => (
            <div key={player.id} className="p-2 bg-white rounded shadow">
              {player.name}
            </div>
          ))}
        </Pitch>
      </div>
    </div>
  );
};

export default Matchup;
