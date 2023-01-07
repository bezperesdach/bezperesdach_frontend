import React from "react";
import styles from "./rating-stars.module.css";

type Props = {
  rating: number;
};

export const RatingStars = ({ rating }: Props) => {
  return (
    <div>
      {Array(5)
        .fill(1)
        .map((_, i) => {
          return (
            <span className={`${styles.single_star} ${i <= rating - 1 ? styles.active : styles.inactive}`} key={i}>
              &#9733;
            </span>
          );
        })}
    </div>
  );
};
