"use client";
import { Recieved_score, Score, User } from "@/lib/definitions";
import Image from "next/image";
import RatingStars from "../ratingStars/ratingStars";
import { useEffect, useState } from "react";
import VotesModal from "../votesModal/votesModal";
import { useSession } from "next-auth/react";

export default function PlayerCard({ user }: { user: User }) {
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
  const [selectedUser, setSelectedUser] = useState(null) as any;

  useEffect(() => {
    // Función que se ejecutará cuando se presione una tecla
    if (openModal === true) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setOpenModal(false);
        }
      };

      // Agrega el event listener al montar el componente
      window.addEventListener("keydown", handleKeyDown);

      // Limpia el event listener al desmontar el componente
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [openModal]);

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure>
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/${user.image_path}`}
          alt={user.name}
          width={390}
          height={400}
          style={{ height: "350px", objectFit: "cover" }}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{user.name}</h2>
        <RatingStars average={average}></RatingStars>
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
            htmlFor="my_modal_7"
            className="btn bg-blue-900 text-white hover:bg-blue-950"
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
      </div>
      {openModal && (
        <VotesModal
          user={selectedUser}
          setOpenModal={setOpenModal}
        ></VotesModal>
      )}
    </div>
  );
}
