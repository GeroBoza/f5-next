import { User } from "@/lib/definitions";
import PlayerCard from "../playerCard/playerCard";
import RatingStars from "../ratingStars/ratingStars";

interface Props {
  teamOne: User[];
  teamTwo: User[];
  averageTeamOne: number;
  averageTeamTwo: number;
}

const GenerateTeams = ({
  teamOne,
  teamTwo,
  averageTeamOne,
  averageTeamTwo,
}: Props) => {
  return (
    <div className="grid w-full grid-cols-12 gap-3 xl:grid-cols-10">
      <div className="col-span-12">
        <div className="flex items-center gap-3">
          <span className="font-bold uppercase">Equipo 1</span> - Promedio:{" "}
          {averageTeamOne.toFixed(2)}
          <RatingStars average={averageTeamOne}></RatingStars>
        </div>
      </div>
      {teamOne.map((player) => (
        <div
          key={player.id}
          className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-2"
        >
          <PlayerCard user={player} teams={true} imageHeight={200}></PlayerCard>
        </div>
      ))}
      <div className="col-span-12 mt-10">
        <div className="flex items-center gap-3">
          <span className="font-bold uppercase">Equipo 2</span> - Promedio:{" "}
          {averageTeamTwo.toFixed(2)}
          <RatingStars average={averageTeamTwo}></RatingStars>
        </div>
      </div>
      {teamTwo.map((player) => (
        <div
          key={player.id}
          className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-2"
        >
          <PlayerCard user={player} teams={true} imageHeight={200}></PlayerCard>
        </div>
      ))}
    </div>
  );
};

export default GenerateTeams;
