import Image from "next/image";
import { DynamicStar } from "../../../../dynamic-star/dynamic-star";

import styles from "./review-card.module.css";

type Props = {
  className?: string;
  name: string;
  text: string;
  rating: number;
  date: Date;
  avatar: string;
};

export const ReviewCard = ({ className, name, text, rating, date, avatar }: Props) => {
  return (
    <div className={className}>
      <div className={styles.avatar_name_rating_container}>
        <Image
          src={`/assets/images/avatars/${avatar}.svg`}
          // placeholder="blur"
          className={`${styles.image} no_select image_no_pointer_events`}
          alt="avatar image"
          width={64}
          height={64}
          priority
          // onError={(e) => (e.currentTarget.src = FallbackMain.src)}
        />
        <div className={styles.name_rating}>
          <h4 className={styles.name}>{name}</h4>
          <DynamicStar outlined rating={rating} width={16} height={16} />
        </div>
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  );
};
