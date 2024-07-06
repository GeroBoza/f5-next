"use client";
import { useEffect, useState } from "react";

import { PlayersTable } from "@/components/table/PlayersTable";
import { ApiService } from "@/lib/apiService";
import { Score, User } from "@/lib/definitions";
import { useSession } from "next-auth/react";
import GenerateTeams from "@/components/teams/GenerateTeams";

const Teams = () => {
  const { data: session, status } = useSession();

  const [selectedPlayers, setSelectedPlayers] = useState<User[]>([]);
  const [players, setPlayers] = useState<User[]>([]);
  const [showTeams, setShowTeams] = useState(false);
  const [teamOne, setTeamOne] = useState<User[]>([]);
  const [teamTwo, setTeamTwo] = useState<User[]>([]);
  const [averageTeamOne, setAverageTeamOne] = useState<number>(0);
  const [averageTeamTwo, setAverageTeamTwo] = useState<number>(0);

  useEffect(() => {
    const fetchPlayers = async () => {
      if (status === "authenticated") {
        const res = await ApiService.getUsersClient(session.user.token);
        setPlayers(res);
      }
    };
    fetchPlayers();
  }, [status, session]);

  const lessThanTen = (
    <h1 className="text-3xl font-bold uppercase">You must select 10 players</h1>
  );

  const calculatePlayerAverage = (player: User) => {
    let average = 0;
    player.recieved_scores.forEach((score: Score) => {
      average += score.score;
    });
    const avg = average / player.recieved_scores.length || 0;

    return avg.toFixed(2);
  };

  const generateTeams = () => {
    const players = selectedPlayers;
    const shuffled = players.sort(() => 0.5 - Math.random());
    const possibleTeamOne = shuffled.slice(0, 5);
    const possibleTeamTwo = shuffled.slice(5, 10);
    const calculateAverage = (team: User[]) => {
      let average = 0;
      team.forEach((player) => {
        let avg = parseFloat(calculatePlayerAverage(player));
        // if (player.average === "No hay votos registrados") {
        //     avg = 0;
        // }
        average += avg;
      });
      return average / team.length;
    };

    const avg1 = calculateAverage(possibleTeamOne);
    const avg2 = calculateAverage(possibleTeamTwo);

    if (avg1 - avg2 > -0.5 && avg1 - avg2 < 0.5) {
      setTeamOne(possibleTeamOne);
      setAverageTeamOne(avg1);
      setAverageTeamTwo(avg2);
      setTeamTwo(possibleTeamTwo);
      setShowTeams(true);
    } else {
      generateTeams();
    }
  };
  const tenPlayersSelected = (
    <div className="flex gap-3">
      <button className="btn btn-primary text-white" onClick={generateTeams}>
        Generate teams
      </button>
      {showTeams && (
        <button
          className="btn btn-secondary text-white"
          onClick={() => console.log("Creo partido")}
        >
          Create match
        </button>
      )}
    </div>
  );

  useEffect(() => {
    setShowTeams(false);
    setTeamOne([]);
    setTeamTwo([]);
  }, [selectedPlayers]);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-12 lg:gap-14">
      <div className="col-span-12 w-full lg:col-span-5">
        <PlayersTable
          players={players}
          selectedPlayers={selectedPlayers}
          setSelectedPlayers={setSelectedPlayers}
        ></PlayersTable>
      </div>
      <div className="col-span-7 grid h-full w-full justify-center gap-4">
        <div className="col-span-12">
          {selectedPlayers.length === 10 ? tenPlayersSelected : lessThanTen}
        </div>
        <div className="col-span-12">
          {showTeams && (
            <GenerateTeams
              teamOne={teamOne}
              teamTwo={teamTwo}
              averageTeamOne={averageTeamOne}
              averageTeamTwo={averageTeamTwo}
            ></GenerateTeams>
          )}
        </div>
      </div>
    </div>
  );
};

export default Teams;
