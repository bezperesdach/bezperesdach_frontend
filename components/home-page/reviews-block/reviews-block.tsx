import Carousel from "react-multi-carousel";
import { ReviewCard } from "./components/review-card/review-card";

import styles from "./reviews-block.module.css";

import "react-multi-carousel/lib/styles.css";

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
