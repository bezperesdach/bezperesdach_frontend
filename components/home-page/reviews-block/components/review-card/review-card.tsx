import Image from "next/image";
import { RatingStars } from "../../../../rating-stars/rating-stars";
import f1 from "../../../../../public/assets/images/avatars/f1.webp";
import f2 from "../../../../../public/assets/images/avatars/f2.webp";
import f3 from "../../../../../public/assets/images/avatars/f3.webp";
import f4 from "../../../../../public/assets/images/avatars/f4.webp";
import f5 from "../../../../../public/assets/images/avatars/f5.webp";
import m1 from "../../../../../public/assets/images/avatars/m1.webp";
import m2 from "../../../../../public/assets/images/avatars/m2.webp";
import m3 from "../../../../../public/assets/images/avatars/m3.webp";
import m4 from "../../../../../public/assets/images/avatars/m4.webp";
import m5 from "../../../../../public/assets/images/avatars/m5.webp";

import styles from "./review-card.module.css";

type Props = {
  className?: string;
  name: string;
  text: string;
  rating: number;
  date: Date;
  avatar: string;
};

const getAvatar = (name: string) => {
  switch (name) {
    case "f1":
      return f1;
    case "f2":
      return f2;
    case "f3":
      return f3;
    case "f4":
      return f4;
    case "f5":
      return f5;
    case "m1":
      return m1;
    case "m2":
      return m2;
    case "m3":
      return m3;
    case "m4":
      return m4;
    case "m5":
      return m5;
  }

  return m1;
};

export const ReviewCard = ({ className, name, text, rating, date, avatar }: Props) => {
  return (
    <div className={className}>
      <div className={styles.avatar_name_rating_container}>
        <Image
          src={getAvatar(avatar)}
          className={`${styles.image} no_select image_no_pointer_events`}
          alt="avatar image"
          width={64}
          height={64}
          placeholder="blur"
          onError={(e) => (e.currentTarget.src = `/assets/images/avatars/${avatar}.png`)}
        />
        <div className={styles.name_rating}>
          <h4 className={styles.name}>{name}</h4>
          <RatingStars rating={rating} />
        </div>
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  );
};
