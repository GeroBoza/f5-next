"use client";
import { Score, User } from "@/lib/definitions";
import Image from "next/image";
import RatingStars from "../ratingStars/ratingStars";
import { useEffect, useState } from "react";
import VotesModal from "../votesModal/votesModal";
import { useSession } from "next-auth/react";
import PlayerDataModal from "../playerDataModal/PlayerDataModal";

interface Props {
  user: User;
  teams?: boolean;
  imageHeight?: number;
}

export default function PlayerCard({
  user,
  teams = false,
  imageHeight = 350,
}: Props) {
  const calculateAverage = () => {
    let average = 0;
    user.recieved_scores.forEach((score: Score) => {
      average += score.score;
    });
    return (
      (average / user.recieved_scores.length).toFixed(2) ||
      "No hay votos registrados"
    );
  };

  const average: number | string = calculateAverage();
  const { data: session }: Record<string, any> = useSession();

  const [openModal, setOpenModal] = useState(false);
  const [openPlayerDataModal, setOpenPlayerDataModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null) as any;

  useEffect(() => {
    // Función que se ejecutará cuando se presione una tecla
    if (openModal === true || openPlayerDataModal === true) {
      console.log("entro");
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setOpenModal(false);
          setOpenPlayerDataModal(false);
        }
      };

      // Agrega el event listener al montar el componente
      window.addEventListener("keydown", handleKeyDown);

      // Limpia el event listener al desmontar el componente
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [openModal, openPlayerDataModal]);

  const cardBodyStyle = {
    height: teams === true ? "120px" : "",
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure>
        <label
          htmlFor="player-data-modal"
          className="cursor-pointer rounded-lg"
          onClick={() => {
            setSelectedUser(user), setOpenPlayerDataModal(true);
          }}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/${user.image_path}`}
            alt={user.name}
            width={400}
            height={400}
            style={{
              height: imageHeight,
              objectFit: "cover",
            }}
          />
        </label>
      </figure>

      <div
        className="card-body items-center justify-center p-5"
        style={cardBodyStyle}
      >
        {!teams ? (
          <h2 className="card-title">{user.name}</h2>
        ) : (
          <h2 className="text-sm font-bold">{user.name}</h2>
        )}

        <RatingStars average={average}></RatingStars>
        {!teams && (
          <>
            <p>Average: {average}</p>

            {user.id === session?.user.userId ? (
              <button
                className="btn bg-blue-900 text-white hover:bg-blue-950"
                disabled
              >
                Vote
              </button>
            ) : (
              <label
                htmlFor="vote-modal"
                className="btn btn-primary"
                onClick={() => {
                  setSelectedUser(user), setOpenModal(true);
                }}
              >
                {user.recieved_scores.find(
                  (rscore) => rscore.user_voter_id === session?.user.userId,
                )
                  ? "Change vote"
                  : "Vote"}
              </label>
            )}
          </>
        )}
      </div>
      {openModal && (
        <VotesModal
          user={selectedUser}
          setOpenModal={setOpenModal}
        ></VotesModal>
      )}

      {openPlayerDataModal && (
        <PlayerDataModal
          user={selectedUser}
          setOpenPlayerDataModal={setOpenPlayerDataModal}
        ></PlayerDataModal>
      )}
    </div>
  );
}
