import React, { useCallback, useState, useEffect } from "react";
// import { Carousel } from "./components/carousel/carousel";

import Carousel from "react-multi-carousel";
import { ReviewCard } from "./components/review-card/review-card";

import styles from "./reviews-block.module.css";

import "react-multi-carousel/lib/styles.css";

// const useMediaQuery = (width: number) => {
//   const [targetReached, setTargetReached] = useState(false);

//   const updateTarget = useCallback((e: unknown) => {
//     if (e.matches) {
//       setTargetReached(true);
//     } else {
//       setTargetReached(false);
//     }
//   }, []);

//   useEffect(() => {
//     const media = window.matchMedia(`(max-width: ${width}px)`);
//     media.addEventListener("change", updateTarget);

//     // Check on mount (callback is not called until a change occurs)
//     if (media.matches) {
//       setTargetReached(true);
//     }

//     return () => media.removeListener(updateTarget);
//   }, []);

//   return targetReached;
// };

type Props = {
  deviceType: string;
  reviews: Review[];
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

export const ReviewsBlock = ({ reviews, deviceType }: Props) => {
  if (!reviews) {
    return null;
  }
  // const isMobile = useMediaQuery(768);
  return (
    <section className={`${styles.reviews_block} ${styles.colored_background}`}>
      <h2>ОТЗЫВЫ</h2>

      <Carousel
        pauseOnHover
        arrows={false}
        autoPlay
        autoPlaySpeed={4500}
        shouldResetAutoplay
        swipeable={false}
        draggable={false}
        infinite
        ssr
        itemClass={styles.review_container}
        responsive={responsive}
        deviceType={deviceType}
      >
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
      </Carousel>
    </section>
  );
};
