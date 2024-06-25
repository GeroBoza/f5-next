import React from "react";

interface RatingStarsProps {
  average: number | string;
}

const RatingStars: React.FC<RatingStarsProps> = ({ average }) => {
  // Normaliza el average para asegurarse de que es un número
  const normalizedAverage =
    typeof average === "string" ? parseFloat(average) : average;
  // Redondea hacia arriba
  //   const roundedAverage = Math.ceil(normalizedAverage);

  // Calcula las estrellas completas y medias estrellas
  const starsAmount = Math.round(normalizedAverage) / 2;
  const fullStars = Math.floor(starsAmount);
  const halfStars = starsAmount % 1 !== 0 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <div className="rating rating-md rating-half">
      {[...Array(fullStars)].map((_, index) => (
        <React.Fragment key={`full-${index}`}>
          <input
            type="radio"
            name="rating-10"
            disabled
            className="mask mask-star-2 mask-half-1 bg-yellow-400"
            checked
          />
          <input
            type="radio"
            name="rating-10"
            disabled
            className="mask mask-star-2 mask-half-2 bg-yellow-400"
            checked
          />
        </React.Fragment>
      ))}
      {halfStars === 1 && (
        <React.Fragment>
          <input
            type="radio"
            name="rating-10"
            disabled
            className="mask mask-star-2 mask-half-1 bg-yellow-400"
            checked
          />
          <input
            type="radio"
            name="rating-10"
            disabled
            className="mask mask-star-2 mask-half-2 bg-gray-400"
          />
        </React.Fragment>
      )}
      {[...Array(emptyStars)].map((_, index) => (
        <React.Fragment key={`empty-${index}`}>
          <input
            type="radio"
            name="rating-10"
            disabled
            className="mask mask-star-2 mask-half-1 bg-gray-400"
          />
          <input
            type="radio"
            name="rating-10"
            disabled
            className="mask mask-star-2 mask-half-2 bg-gray-400"
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default RatingStars;
