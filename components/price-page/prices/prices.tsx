import React from "react";
import { Card } from "./components/card/card";

import styles from "./prices.module.css";

export const Prices = () => {
  return (
    <section className={styles.card}>
      <Card
        title="Курсовая работа"
        description={"Рекомендуемая цена: от 2990 \nСрок выполнения: от 7 дней\nСрочно: от 14990 рублей\nСрок выполнения: 24 часа"}
        url="/?pt=term-paper"
        backgroundColor="rgba(12, 115, 254, 0.9)"
        buttonBackgroundColor="#0C73FE"
        colorText="#ffffff"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      ></Card>
      <Card
        title="Дипломная работа"
        description={"Рекомендуемая цена: от 4990 \nСрок выполнения: от 14 дней\nСрочно: от 24990 рублей\nСрок выполнения: 24 часа"}
        url="/?pt=graduation-work"
        backgroundColor="rgba(12, 115, 254, 0.85)"
        buttonBackgroundColor="#0C73FE"
        colorText="#ffffff"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      ></Card>
      <Card
        title="Магистерская"
        description={"Рекомендуемая цена: от 9990 \nСрок выполнения: от 30 дней\nСрочно: от 49990 рублей\nСрок выполнения: 3 дня"}
        url="/?pt=masters"
        backgroundColor="rgba(12, 115, 254, 0.8)"
        buttonBackgroundColor="#0C73FE"
        colorText="#ffffff"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      ></Card>
      <Card
        title="Отчет по практике"
        description={"Рекомендуемая цена: от 1990 \nСрок выполнения: от 5 дней\nСрочно: от 4990\nСрок выполнения: 20 часов"}
        url="/?pt=practice-report"
        backgroundColor="rgba(12, 115, 254, 0.75)"
        buttonBackgroundColor="#0C73FE"
        colorText="#ffffff"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      ></Card>
      <Card
        title="Статья"
        description={"Рекомендуемая цена: от 990 \nСрок выполнения: от 3 дней\nСрочно: от 2990\nСрок выполнения: 12 часов"}
        url="/?pt=article"
        backgroundColor="rgba(105, 68, 184, 0.9)"
        buttonBackgroundColor="#6944B8"
        colorText="#ffffff"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      ></Card>
      <Card
        title="Рецензия"
        description={"Рекомендуемая цена: от 590 \nСрок выполнения: от 12 часов\nСрочно: от 4990\nСрок выполнения: 2 часа"}
        url="/?pt=review"
        backgroundColor="rgba(105, 68, 184, 0.85)"
        buttonBackgroundColor="#6944B8"
        colorText="#ffffff"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.5)"
      ></Card>
      <Card
        title="Сочинение"
        description={"Рекомендуемая цена: от 490 \nСрок выполнения: от 4 часов\nСрочно: от 1990\nСрок выполнения: 1 час"}
        url="/?pt=opus"
        backgroundColor="rgba(105, 68, 184, 0.8)"
        buttonBackgroundColor="#6944B8"
        colorText="#ffffff"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      ></Card>
      <Card
        title="Эссе"
        description={"Рекомендуемая цена: от 390 \nСрок выполнения: от 1-2 дней\nСрочно: от 990\nСрок выполнения: 2 часа"}
        url="/?pt=essay"
        backgroundColor="rgba(105, 68, 184, 0.75)"
        buttonBackgroundColor="#6944B8"
        colorText="#ffffff"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      ></Card>
      <Card
        title="Реферат"
        description={"Рекомендуемая цена: от 590 \nСрок выполнения: от 1-2 дней\nСрочно: от 990\nСрок выполнения: 2 часа"}
        url="/?pt=composition"
        backgroundColor="rgba(41, 153, 0, 0.9)"
        buttonBackgroundColor="#299900"
        colorText="#ffffff"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      ></Card>
      <Card
        title="Доклад"
        description={"Рекомендуемая цена: от 990 \nСрок выполнения: от 1-2 дней\nСрочно: от 1990\nСрок выполнения: 2 часа"}
        url="/?pt=report"
        backgroundColor="rgba(41, 153, 0, 0.85)"
        buttonBackgroundColor="#299900"
        colorText="#ffffff"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      ></Card>
      <Card
        title="Ответы на билеты"
        description={"Рекомендуемая цена: от 590 \nСрок выполнения: от 1-2 дней\nСрочно: от 1490\nСрок выполнения: 1 час"}
        url="/?pt=ticket-answers"
        backgroundColor="rgba(41, 153, 0, 0.8)"
        buttonBackgroundColor="#299900"
        colorText="#ffffff"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      ></Card>
      <Card
        title="Решение задач"
        description={"Рекомендуемая цена: от 50 \nСрок выполнения: от 1-2 дней\nСрочно: от 100\nСрок выполнения: 1 час"}
        url="/?pt=tasks"
        backgroundColor="rgba(41, 153, 0, 0.75)"
        buttonBackgroundColor="#299900"
        colorText="#ffffff"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      ></Card>
      <Card
        title="Лабораторная"
        description={"Рекомендуемая цена: от 690 \nСрок выполнения: от 1-2 дней\nСрочно: от 1990\nСрок выполнения: 1 час"}
        url="/?pt=laboratory-work"
        backgroundColor="rgba(255, 60, 38, 0.9)"
        buttonBackgroundColor="#FF3C26"
        colorText="#ffffff"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      ></Card>
      <Card
        title="Контрольная"
        description={"Рекомендуемая цена: от 190 \nСрок выполнения: от 1-2 дней\nСрочно: от 990\nСрок выполнения: 1 час"}
        url="/?pt=test-work"
        backgroundColor="rgba(255, 60, 38, 0.85)"
        buttonBackgroundColor="#FF3C26"
        colorText="#ffffff"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      ></Card>
      <Card
        title="Кейсы"
        description={"Рекомендуемая цена: от 1990 \nСрок выполнения: от 2-3 дней\nСрочно: от 3990\nСрок выполнения: 4 часа"}
        url="/?pt=cases"
        backgroundColor="rgba(255, 60, 38, 0.8)"
        buttonBackgroundColor="#FF3C26"
        colorText="#ffffff"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      ></Card>
      <Card
        title="Тесты"
        description={"Рекомендуемая цена: от 390 \nСрок выполнения: от 1-2 дней\nСрочно: от 990\nСрок выполнения: 3 часа"}
        url="/?pt=tests"
        backgroundColor="rgba(255, 60, 38, 0.75)"
        buttonBackgroundColor="#FF3C26"
        colorText="#ffffff"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      ></Card>
      <Card
        title="Чертеж"
        description={"Рекомендуемая цена: от 590 \nСрок выполнения: от 4-5 дней\nСрочно: от 990\nСрок выполнения: 9 часов"}
        url="/?pt=scheme"
        backgroundColor="rgba(255, 171, 13, 0.9)"
        buttonBackgroundColor="#FFAB0D"
        colorText="#111111"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      ></Card>
      <Card
        title="Монография"
        description={"Рекомендуемая цена: от 19990 \nСрок выполнения: от 40 дней\nСрочно: от 89990\nСрок выполнения: 48 часов"}
        url="/?pt=monograph"
        backgroundColor="rgba(255, 171, 13, 0.85)"
        buttonBackgroundColor="#FFAB0D"
        colorText="#111111"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      ></Card>
      <Card
        title="Презентация"
        description={"Рекомендуемая цена: от 590 \nСрок выполнения: от 2-3 дней\nСрочно: от 990\nСрок выполнения: 3 часа"}
        url="/?pt=presentation"
        backgroundColor="rgba(255, 171, 13, 0.8)"
        buttonBackgroundColor="#FFAB0D"
        colorText="#111111"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      ></Card>
      <Card
        title="Бизнес-план"
        description={"Рекомендуемая цена: от 6990 \nСрок выполнения: от 7 дней\nСрочно: от 9990\nСрок выполнения: 12 часа"}
        url="/?pt=business-plan"
        backgroundColor="rgba(255, 171, 13, 0.75)"
        buttonBackgroundColor="#FFAB0D"
        colorText="#111111"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      ></Card>
      <Card
        title="Кандидатская"
        description={"Рекомендуемая цена: от 29990 \nСрок выполнения: от 2-3 месяцев\nСрочно: от 89990\nСрок выполнения: 72 часа"}
        url="/?pt=phd"
        backgroundColor="rgba(199, 218, 181, 0.8)"
        buttonBackgroundColor="#C7DAB5"
        colorText="#111111"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      ></Card>
      <Card
        title="Докторская"
        description={"Рекомендуемая цена: от 49990 \nСрок выполнения: от 4-5 месяцев\nСрочно: от 119990\nСрок выполнения: 1-2 недели"}
        url="/?pt=doctoral"
        backgroundColor="rgba(199, 218, 181, 0.7)"
        buttonBackgroundColor="#C7DAB5"
        colorText="#111111"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      ></Card>
      <Card
        title="Программирование"
        description={"Рекомендуемая цена: от 490 \nСрок выполнения: от 1-2 дня\nСрочно: от 990\nСрок выполнения: 1-2 часа"}
        url="/?pt=programming"
        backgroundColor="rgba(199, 218, 181, 0.6)"
        buttonBackgroundColor="#C7DAB5"
        colorText="#111111"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      ></Card>
    </section>
  );
};
