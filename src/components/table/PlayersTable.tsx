import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { Score, User } from "@/lib/definitions";
import Pagination from "./Pagination";

interface Props {
  players: User[];
  selectedPlayers: User[];
  setSelectedPlayers: Dispatch<SetStateAction<User[]>>;
}

export const PlayersTable = ({
  players,
  selectedPlayers,
  setSelectedPlayers,
}: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<{ key: string; asc: boolean }>({
    key: "name",
    asc: true,
  });
  const rowsPerPage = 10;

  const calculateAverage = (user: User) => {
    let average = 0;
    user.recieved_scores.forEach((score: Score) => {
      average += score.score;
    });
    const avg = average / user.recieved_scores.length || 0;

    return avg.toFixed(2);
  };

  const handleRowClick = (player: User) => {
    setSelectedPlayers((prevSelectedPlayers) => {
      const isSelected = prevSelectedPlayers.some((p) => p.id === player.id);
      if (isSelected) {
        return prevSelectedPlayers.filter((p) => p.id !== player.id);
      } else {
        return [...prevSelectedPlayers, player];
      }
    });
  };

  const handleCheckboxChange = (
    player: User,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    event.stopPropagation(); // Para evitar que el evento click de la fila también se dispare
    handleRowClick(player);
  };

  const isPlayerSelected = (player: User) => {
    return selectedPlayers.some((p) => p.id === player.id);
  };

  // Función para ordenar los jugadores por nombre o promedio
  const sortPlayers = (key: string) => {
    if (key === sortBy.key) {
      // Si se hace clic en la misma columna, cambiar el orden
      setSortBy({ ...sortBy, asc: !sortBy.asc });
    } else {
      // Si se hace clic en una nueva columna, ordenar ascendente por defecto
      setSortBy({ key, asc: true });
    }
  };

  // Ordenar los jugadores según la columna y tipo de ordenamiento actual
  const sortedPlayers = [...players].sort((a, b) => {
    const aValue =
      sortBy.key === "name"
        ? a.name
        : sortBy.key === "average"
          ? calculateAverage(a)
          : ""; // Ajusta según tus necesidades

    const bValue =
      sortBy.key === "name"
        ? b.name
        : sortBy.key === "average"
          ? calculateAverage(b)
          : ""; // Ajusta según tus necesidades

    if (sortBy.asc) {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  // Calcular el índice inicial y final de las filas a mostrar en la página actual
  const indexOfLastPlayer = currentPage * rowsPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - rowsPerPage;
  const currentPlayers = sortedPlayers.slice(
    indexOfFirstPlayer,
    indexOfLastPlayer,
  );

  return (
    <div className="w-full overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th className="cursor-pointer" onClick={() => sortPlayers("name")}>
              Name {sortBy.key === "name" && (sortBy.asc ? "▲" : "▼")}
            </th>
            <th
              className="cursor-pointer"
              onClick={() => sortPlayers("average")}
            >
              Average {sortBy.key === "average" && (sortBy.asc ? "▲" : "▼")}
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Filas de jugadores */}
          {currentPlayers.map((player) => (
            <tr key={player.id} className="cursor-pointer">
              <th>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={isPlayerSelected(player)}
                    onChange={(e) => handleCheckboxChange(player, e)}
                  />
                </label>
              </th>
              <td onClick={() => handleRowClick(player)}>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <Image
                        width={200}
                        height={200}
                        src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/${player.image_path}`}
                        alt={player.name}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{player.name}</div>
                  </div>
                </div>
              </td>
              <td onClick={() => handleRowClick(player)}>
                {calculateAverage(player)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Controles de paginación */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        indexOfLastPlayer={indexOfLastPlayer}
        playersLength={players.length}
      ></Pagination>
    </div>
  );
};
