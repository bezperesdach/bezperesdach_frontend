import React from "react";
import { ReviewCard } from "./components/review-card/review-card";

import styles from "./reviews-block.module.css";

type Props = {
  reviews: Review[];
};

export const ReviewsBlock = ({ reviews }: Props) => {
  return (
    <section className={`${styles.reviews_block} ${styles.colored_background}`}>
      <h2>ОТЗЫВЫ</h2>

      <div className={styles.reviews_container}>
        {reviews.map((review) => {
          return (
            <ReviewCard
              className={styles.review}
              key={review.id}
              name={review.name}
              text={review.text}
              avatar={review.avatar}
              date={review.date}
              rating={review.rating}
            />
          );
        })}
      </div>
    </section>
  );
};
