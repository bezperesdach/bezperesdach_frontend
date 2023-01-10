"use client";

import Carousel from "react-multi-carousel";
import { ReviewCard } from "./components/review-card/review-card";

import styles from "./reviews-block.module.css";

import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";

type Props = {
  className?: string;
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1150 },
    items: 3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1150, min: 768 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

export const ReviewsBlock = ({ className }: Props) => {
  const [randomReviews, setRandomReviews] = useState<RandomReviews | null>(null);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/get-reviews")
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setRandomReviews(data.data);
          setLoading(false);
        }
      });
  }, []);

  if (isLoading || randomReviews === undefined || randomReviews === null) {
    return null;
  }

  return (
    <section className={`${className} ${styles.reviews_block} ${styles.colored_background}`}>
      <h2>ОТЗЫВЫ</h2>
      <h3 className={styles.avg_rating}>
        Средняя оценка <span className={styles.avg_rating_score}>{randomReviews.avgRating}</span>
      </h3>

      <Carousel
        arrows={false}
        autoPlay
        autoPlaySpeed={5000}
        shouldResetAutoplay
        swipeable={false}
        draggable={false}
        infinite
        containerClass={styles.carousel_container}
        itemClass={styles.review_container}
        responsive={responsive}
      >
        {randomReviews.reviews.map((review) => {
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
      </Carousel>
    </section>
  );
};
