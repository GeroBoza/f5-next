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

  return (
    <div className="grid grid-cols-2 gap-10">
      <div className="w-full rounded-lg border-2 border-gray-200">
        <PlayersTable
          players={players}
          selectedPlayers={selectedPlayers}
          setSelectedPlayers={setSelectedPlayers}
        ></PlayersTable>
      </div>
      <div>
        {selectedPlayers.length === 10
          ? "MUESTRO PARA GENERAR TEAMS"
          : "SELECCIONE 10 JUGADORES PA"}
      </div>
    </div>
  );
};

export default Teams;
