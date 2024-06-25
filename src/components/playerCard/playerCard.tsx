import { Score, User } from "@/lib/definitions";
import Image from "next/image";
import RatingStars from "../ratingStars/ratingStars";

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

  return (
    <div className="card bg-base-100 w-50 shadow-xl">
      <figure>
        <Image
          src={`${process.env.IMAGES_URL}/${user.image_path}`}
          alt={user.name}
          width={300}
          height={300}
          style={{ height: "300px", objectFit: "cover" }}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{user.name}</h2>
        <RatingStars average={average}></RatingStars>
        <p>Promedio: {average}</p>
        <button className="btn bg-blue-900 text-white hover:bg-blue-950">
          Votar
        </button>
      </div>
    </div>
  );
}
