"use client";
import { useEffect, useState } from "react";

import { PlayersTable } from "@/components/table/PlayersTable";
import { ApiService } from "@/lib/apiService";
import { User } from "@/lib/definitions";
import { useSession } from "next-auth/react";

const Teams = () => {
  const { data: session, status } = useSession();

  const [selectedPlayers, setSelectedPlayers] = useState<User[]>([]);
  const [players, setPlayers] = useState<User[]>([]);

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

  const generateTeams = () => {
    console.log("hi ling");
  };
  const tenPlayersSelected = (
    <div>
      <button className="btn btn-primary text-white" onClick={generateTeams}>
        Generate teams
      </button>
    </div>
  );

  return (
    <div className="grid grid-cols-2 gap-10">
      <div className="w-full rounded-lg border-2 border-gray-200">
        <PlayersTable
          players={players}
          selectedPlayers={selectedPlayers}
          setSelectedPlayers={setSelectedPlayers}
        ></PlayersTable>
      </div>
      <div className="flex h-full w-full justify-center">
        {selectedPlayers.length === 10 ? tenPlayersSelected : lessThanTen}
      </div>
    </div>
  );
};

export default Teams;
