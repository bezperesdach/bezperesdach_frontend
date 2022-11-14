import React from "react";
import Link from "next/link";
import styles from "./card.module.css";
import { Button } from "../../../button/button";

type Props = {
  title: string;
  description: string;
  textButton: string;
  backgroundColor: string;
  color: string;
  href: string;
};

export const Card = ({ title, description, textButton, href, backgroundColor, color }: Props) => {
  return (
    <div className={styles.card_style}>
      <div className={styles.card_button}>
        <h3>{title}</h3>
        <p>{description}</p>
        <Link href={href}>
          <Button backgroundColor={backgroundColor} color={color}>
            {textButton}
          </Button>
        </Link>
      </div>
    </div>
  );
};
