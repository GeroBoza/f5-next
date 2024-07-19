"use client";
import { Match } from "@/lib/definitions";
import Skeleton from "../skeleton/Skeleton";
import Image from "next/image";
import { Pagination } from "swiper/modules";

interface Props {
  matches: Match[];
}

const MatchesTable = ({ matches }: Props) => {
  const matchSkeletons = [...Array(10)].map((_, index) => (
    <tr key={index}>
      <th>
        <label>
          <input type="checkbox" className="checkbox" disabled />
        </label>
      </th>
      <td>
        <Skeleton></Skeleton>
      </td>
      <td>
        <div className="skeleton h-4 w-10"></div>
      </td>
    </tr>
  ));

  const formatDate = (date: string) => {
    const [year, month, day] = date.split("-");
    return [day, month, year].join("/");
  };

  return (
    <div className="w-full overflow-x-auto rounded-lg border-2 border-gray-200">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Date</th>
            <th>Scores</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {matches.length === 0 && matchSkeletons}
          {/* Filas de jugadores */}
          {matches.map((match) => (
            <tr key={match.id}>
              <th>
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <Image
                      width={200}
                      height={200}
                      src={`/img/flag.png`}
                      alt="Result image"
                    />
                  </div>
                </div>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <p className="font-bold">{formatDate(match.date)}</p>
                </div>
              </td>
              <td>
                <p className="font-bold">
                  {match.winner_team_goals} - {match.loser_team_goals}
                </p>
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    console.log(match);
                  }}
                >
                  Info
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Controles de paginación */}
      {/* <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        indexOfLastPlayer={indexOfLastPlayer}
        itemsLength={players.length}
      ></Pagination> */}
    </div>
  );
};

export default MatchesTable;
