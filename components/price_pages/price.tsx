import React from "react";

import styles from "./price.module.css";

import Image from "next/image";
import gift from "public/images/gift.svg";
import { Card } from "./components/card";

export const Price = () => {
  return (
    <section className={styles.about}>
      <div className={styles.card}>
        <div className={styles.text}>
          <h2>Цены и услуги</h2>
          <p>
            <strong>Безпересдач </strong> - это сервис с динамическим ценообразованием. Это означает, что Вы сами предлагаете цены
            исполнителям, а не наоборот. Также Вы можете заказать оформление работ по ГОСТ стандартам и повышение оригинальности работы
            без применения скрытых символов.{" "}
          </p>
          <p>Если необходимого типа работы нет в нашем списке - напишите нашему администратору.</p>
        </div>
      </div>

      <div className={styles.card}>
        <Card
          title="Курсовая работа"
          description="От 12 часов"
          url="https://www.ya.ru"
          backgroundColor="rgba(12, 115, 254, 0.6)"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        ></Card>
        <Card
          title="Дипломная работа"
          description="От 12 часов"
          url=""
          backgroundColor="rgba(12, 115, 254, 0.5)"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        ></Card>
        <Card
          title="Магистерская работа"
          description="От 12 часов"
          url=""
          backgroundColor="rgba(12, 115, 254, 0.4)"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        ></Card>
        <Card
          title="Отчет по практике"
          description="От 12 часов"
          url=""
          backgroundColor="rgba(12, 115, 254, 0.3)"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        ></Card>
        <Card
          title="Статья"
          description="От 12 часов"
          url=""
          backgroundColor="rgba(105, 68, 184, 0.6)"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        ></Card>
        <Card
          title="Рецензия"
          description="От 12 часов"
          url=""
          backgroundColor="rgba(105, 68, 184, 0.5)"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        ></Card>
        <Card
          title="Сочинение"
          description="От 12 часов"
          url=""
          backgroundColor="rgba(105, 68, 184, 0.4)"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        ></Card>
        <Card
          title="Эссе"
          description="От 12 часов"
          url=""
          backgroundColor="rgba(105, 68, 184, 0.3)"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        ></Card>
        <Card
          title="Реферат"
          description="От 12 часов"
          url=""
          backgroundColor="rgba(41, 153, 0, 0.6)"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        ></Card>
        <Card
          title="Доклад"
          description="От 12 часов"
          url=""
          backgroundColor="rgba(41, 153, 0, 0.5)"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        ></Card>
        <Card
          title="Вопросы к зачету"
          description="От 12 часов"
          url=""
          backgroundColor="rgba(41, 153, 0, 0.4)"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        ></Card>
        <Card
          title="Решение задач"
          description="От 12 часов"
          url=""
          backgroundColor="rgba(41, 153, 0, 0.3)"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        ></Card>
        <Card
          title="Лабораторная"
          description="От 12 часов"
          url=""
          backgroundColor="rgba(255, 60, 38, 0.6)"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        ></Card>
        <Card
          title="Контрольная"
          description="От 12 часов"
          url=""
          backgroundColor="rgba(255, 60, 38, 0.5)"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        ></Card>
        <Card
          title="Творческая"
          description="От 12 часов"
          url=""
          backgroundColor="rgba(255, 60, 38, 0.4)"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        ></Card>
        <Card
          title="Тесты"
          description="От 12 часов"
          url=""
          backgroundColor="rgba(255, 60, 38, 0.3)"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        ></Card>
        <Card
          title="Чертеж"
          description="От 12 часов"
          url=""
          backgroundColor="rgba(255, 171, 13, 0.6)"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        ></Card>
        <Card
          title="Монография"
          description="От 12 часов"
          url=""
          backgroundColor="rgba(255, 171, 13, 0.5)"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        ></Card>
        <Card
          title="Презентация"
          description="От 12 часов"
          url=""
          backgroundColor="rgba(255, 171, 13, 0.4)"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        ></Card>
        <Card
          title="Бизнес-план"
          description="От 12 часов"
          url=""
          backgroundColor="rgba(255, 171, 13, 0.3)"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        ></Card>
        <Card
          title="Кандидатская"
          description="От 12 часов"
          url=""
          backgroundColor="rgba(199, 218, 181, 0.5)"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        ></Card>
        <Card
          title="Докторская"
          description="От 12 часов"
          url=""
          backgroundColor="rgba(199, 218, 181, 0.4)"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        ></Card>
      </div>

      <div className={styles.gift}>
        <div className={styles.gift_text}>
          <Image src={gift} height={100} priority={true} width={320} alt="logo" />
          <h2>Получи скидку 5% на первый заказ</h2>
          <p>А за каждого приглашенного друга мы приготовили тебе подарок</p>
          <a href="" className={styles.url}>
            {"Забрать бонус"}
          </a>
        </div>
      </div>
    </section>
  );
};
