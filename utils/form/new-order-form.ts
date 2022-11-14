export const typeOptionsInit = [
  { value: "graduation-work", label: "Дипломная работа" },
  { value: "business-plan", label: "Бизнес-план" },
  { value: "report", label: "Доклад" },
  { value: "doctoral", label: "Докторская диссертация" },
  { value: "phd", label: "Кандидатская диссертация" },
  { value: "cases", label: "Кейсы" },
  { value: "consultation", label: "Консультация" },
  { value: "test-work", label: "Контрольная работа" },
  { value: "term-paper", label: "Курсовая работа" },
  { value: "laboratory-work", label: "Лабораторная работа" },
  { value: "masters", label: "Магистерская работа" },
  { value: "methodical-instructions", label: "Методологическая инструкция" },
  { value: "monograph", label: "Монография" },
  { value: "nir", label: "НИР" },
  { value: "online-help", label: "Онлайн помощь" },
  { value: "ticket-answers", label: "Ответы на билеты" },
  { value: "practice-report", label: "Отчет по практике" },
  { value: "translation", label: "Перевод с иностранного языка" },
  { value: "originality-increase", label: "Повышение оригинальности" },
  { value: "literature", label: "Подбор литературы" },
  { value: "exam-preparation", label: "Подготовка к экзамену" },
  { value: "research", label: "Поиск информации" },
  { value: "presentation", label: "Презентация" },
  { value: "programming", label: "Программирование" },
  { value: "composition", label: "Реферат" },
  { value: "review", label: "Рецензия" },
  { value: "opus", label: "Сочинение" },
  { value: "article", label: "Статья" },
  { value: "tests", label: "Тесты" },
  { value: "scheme", label: "Чертеж" },
  { value: "essay", label: "Эссе" },
  { value: "tasks", label: "Решение задач" },
  { value: "other", label: "Другое" },
];

export const getInitValue = (option?: string) => {
  if (option) {
    const result = typeOptionsOrder.get(option);
    return result ? option : "other";
  }

  return "";
};

export const antiPlagiarismOptions = [
  { value: "free", label: "Бесплатная" },
  { value: "paid", label: "Платная" },
];

export const getOrderTypeLabel = (option?: string) => {
  if (option) {
    const result = typeOptionsOrder.get(option);
    return result ? `Заказать ${result.toLowerCase()}` : "Заказать работу";
  }

  return "Заказать работу";
};

export const typeOptionsOrder = new Map([
  ["graduation-work", "Дипломную работу"],
  ["business-plan", "Бизнес-план"],
  ["report", "Доклад"],
  ["doctoral", "Докторскую диссертацию"],
  ["phd", "Кандидатскую диссертацию"],
  ["cases", "Кейсы"],
  ["consultation", "Консультацию"],
  ["test-work", "Контрольную работу"],
  ["term-paper", "Курсовую работу"],
  ["laboratory-work", "Лабораторную работу"],
  ["masters", "Магистерскую работа"],
  ["methodical-instructions", "Методологическую инструкцию"],
  ["monograph", "Монографию"],
  ["nir", "НИР"],
  ["online-help", "Онлайн помощь"],
  ["ticket-answers", "Ответы на билеты"],
  ["practice-report", "Отчет по практике"],
  ["translation", "Перевод с иностранного языка"],
  ["originality-increase", "Повышение оригинальности"],
  ["literature", "Подбор литературы"],
  ["exam-preparation", "Подготовку к экзамену"],
  ["research", "Поиск информации"],
  ["presentation", "Презентацию"],
  ["programming", "Программирование"],
  ["composition", "Реферат"],
  ["review", "Рецензию"],
  ["opus", "Сочинение"],
  ["article", "Статью"],
  ["tests", "Тесты"],
  ["scheme", "Чертеж"],
  ["essay", "Эссе"],
  ["tasks", "Решение задач"],
  ["other", "Другое"],
]);

export const getOrderDescription = (option?: string) => {
  if (option) {
    const result = descriptionValueLabel.get(option);
    return result ? `${result}` : "Сделать заказ работы";
  }

  return "Сделать заказ работы";
};

export const descriptionValueLabel = new Map([
  ["graduation-work", "Заказать дипломную работу, недорого, диплом на заказ, помощь в один клик"],
  ["business-plan", "Бизнес-план"],
  ["report", "Доклад"],
  ["doctoral", "Докторскую диссертацию"],
  ["phd", "Кандидатскую диссертацию"],
  ["cases", "Кейсы"],
  ["consultation", "Консультацию"],
  ["test-work", "Контрольную работу"],
  ["term-paper", "Курсовую работу"],
  ["laboratory-work", "Лабораторную работу"],
  ["masters", "Магистерскую работа"],
  ["methodical-instructions", "Магистерскую инструкцию"],
  ["monograph", "Монографию"],
  ["nir", "НИР"],
  ["online-help", "Онлайн помощь"],
  ["ticket-answers", "Ответы на билеты"],
  ["practice-report", "Отчет по практике"],
  ["translation", "Перевод с иностранного языка"],
  ["originality-increase", "Повышение оригинальности"],
  ["literature", "Подбор литературы"],
  ["exam-preparation", "Подготовку к экзамену"],
  ["research", "Поиск информации"],
  ["presentation", "Презентацию"],
  ["programming", "Программирование"],
  ["composition", "Реферат"],
  ["review", "Рецензию"],
  ["opus", "Сочинение"],
  ["article", "Статью"],
  ["tests", "Тесты"],
  ["scheme", "Чертеж"],
  ["essay", "Эссе"],
  ["tasks", "Решение задач"],
  ["other", "Другое"],
]);
