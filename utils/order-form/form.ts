export const contactTypeOptions = [
  { value: "email", label: "Email" },
  { value: "telegram", label: "Telegram" },
  // { value: "whatsapp", label: "WhatsApp" },
  // { value: "viber", label: "Viber" },
  { value: "vk", label: "Вконтакте" },
];

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

export const getProjectType = (slug: string) => {
  const result = typeOptionsInit.filter((item) => item.value === slug);
  return result[0] ? `${result[0].label} | Консультация` : "Оставить заявку";
};

export const isAntiplagiatVisible = (option: string) => {
  const valuesArrayToHide = [
    "consultation",
    "test-work",
    "online-help",
    "ticket-answers",
    "practice-report",
    "literature",
    "exam-preparation",
    "research",
    "programming",
    "tests",
    "scheme",
    "tasks",
  ];

  if (valuesArrayToHide.indexOf(option) > -1) {
    return false;
  }

  return true;
};

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
    const result = typeOptionsInit.filter((item) => item.value === option);
    return result[0] ? `${result[0].label}` : "Оставить заявку";
  }

  return "Оставить заявку";
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
  ["programming", "Помощь с программированием"],
  ["composition", "Реферат"],
  ["review", "Рецензию"],
  ["opus", "Сочинение"],
  ["article", "Статью"],
  ["tests", "Тесты"],
  ["scheme", "Чертеж"],
  ["essay", "Эссе"],
  ["tasks", "Решение задач"],
  ["other", "Другое"],
  ["new", "Работу"],
]);

export const getOrderDescription = (option?: string) => {
  if (option) {
    const result = descriptionValueLabel.get(option);
    return result ? `${result}` : "Сделать заказ работы";
  }

  return "Сделать заказ работы";
};

export const descriptionValueLabel = new Map([
  [
    "graduation-work",
    "Нужна помощь в сессии? Хочешь, чтобы тебе помогли, а не просто купить дипломную работу? “Без пересдач” -  мы оказываем помощь в написании дипломной работы на заказ.",
  ],
  [
    "business-plan",
    "Нужна помощь в сессии? Хочешь, чтобы тебе помогли, а не просто купить бизнес-план? “Без пересдач” -  мы оказываем помощь в написании бизнес-плана на заказ.",
  ],
  [
    "report",
    "Нужна помощь в сессии? Хочешь, чтобы тебе помогли, а не просто купить доклад? “Без пересдач” -  мы оказываем помощь в написании доклада на заказ.",
  ],
  [
    "doctoral",
    "Нужна помощь в сессии? Хочешь, чтобы тебе помогли, а не просто купить докторскую диссертацию? “Без пересдач” -  мы оказываем помощь в написании докторской диссертации на заказ.",
  ],
  [
    "phd",
    "Нужна помощь в сессии? Хочешь, чтобы тебе помогли, а не просто купить кандидатскую диссертацию? “Без пересдач” -  мы оказываем помощь в написании кандидатской диссертации на заказ.",
  ],
  [
    "cases",
    "Нужна помощь в сессии? Хочешь, чтобы тебе помогли, а не просто купить кейсы? “Без пересдач” -  мы оказываем помощь в написании кейсов на заказ.",
  ],
  [
    "consultation",
    "Нужна помощь в сессии? Хочешь, чтобы тебе помогли, а не просто заказать консультацию? “Без пересдач” -  мы оказываем помощь в консультировании на заказ.",
  ],
  [
    "test-work",
    "Нужна помощь в сессии? Хочешь, чтобы тебе помогли, а не просто купить контрольную работу? “Без пересдач” -  мы оказываем помощь в написании контрольной работы на заказ.",
  ],
  [
    "term-paper",
    "Нужна помощь в сессии? Хочешь, чтобы тебе помогли, а не просто купить курсовую работу? “Без пересдач” -  мы оказываем помощь в написании курсовой работы на заказ.",
  ],
  [
    "laboratory-work",
    "Нужна помощь в сессии? Хочешь, чтобы тебе помогли, а не просто купить лабораторную работу? “Без пересдач” -  мы оказываем помощь в написании лабораторной работы на заказ.",
  ],
  [
    "masters",
    "Нужна помощь в сессии? Хочешь, чтобы тебе помогли, а не просто купить магистерскую работу? “Без пересдач” -  мы оказываем помощь в написании магистерской работы на заказ.",
  ],
  [
    "methodical-instructions",
    "Нужна помощь в сессии? Хочешь, чтобы тебе помогли, а не просто купить магистерскую инструкцию? “Без пересдач” -  мы оказываем помощь в написании магистерской инструкции на заказ.",
  ],
  [
    "monograph",
    "Нужна помощь в сессии? Хочешь, чтобы тебе помогли, а не просто купить монографию? “Без пересдач” -  мы оказываем помощь в написании монографии на заказ.",
  ],
  [
    "nir",
    "Нужна помощь в сессии? Хочешь, чтобы тебе помогли, а не просто купить научно-исследовательскую работу? “Без пересдач” -  мы оказываем помощь в написании НИР на заказ.",
  ],
  [
    "online-help",
    "Нужна помощь в сессии? Хочешь, чтобы тебе помогли, а не просто купить работу? “Без пересдач” -  мы оказываем онлайн-помощь в решении студенческих задач на заказ.",
  ],
  [
    "ticket-answers",
    "Нужна помощь в сессии? Хочешь, чтобы тебе помогли, а не просто купить ответы онлайн-билеты? “Без пересдач” -  мы оказываем помощь в решении онлайн-билетов на заказ.",
  ],
  [
    "practice-report",
    "Нужна помощь в сессии? Хочешь, чтобы тебе помогли, а не просто купить отчет по практике? “Без пересдач” -  мы оказываем помощь в написании отчета по практике на заказ.",
  ],
  [
    "translation",
    "Нужна помощь в сессии? Хочешь, чтобы тебе помогли, а не просто купить перевод с иностранного языка? “Без пересдач” -  мы оказываем помощь в переводе с иностранного языка на заказ.",
  ],
  [
    "originality-increase",
    "Нужна помощь в сессии? Хочешь, чтобы тебе помогли, а не просто повысить оригинальность со скрытыми символами? “Без пересдач” -  мы оказываем помощь в повышении оригинальности без использования скрытых символов на заказ.",
  ],
  [
    "literature",
    "Нужна помощь в сессии? Хочешь, чтобы тебе помогли, а не просто купить подбор литературы? “Без пересдач” -  мы оказываем помощь в подборе литературы на заказ.",
  ],
  [
    "exam-preparation",
    "Нужна помощь в сессии? Хочешь, чтобы тебе помогли с подготовкой к экзамену? “Без пересдач” -  мы оказываем помощь в подготовке и сдаче экзамена на заказ.",
  ],
  [
    "research",
    "Нужна помощь в сессии? Хочешь, чтобы тебе помогли с поиском информации? “Без пересдач” -  мы оказываем помощь с поиском информации на заказ.",
  ],
  [
    "presentation",
    "Нужна помощь в сессии? Хочешь, чтобы тебе помогли, а не просто купить презентацию? “Без пересдач” -  мы оказываем помощь в создании презентации на заказ.",
  ],
  [
    "programming",
    "Нужна помощь в сессии? Хочешь, чтобы тебе помогли, а не просто купить задачу по программированию? “Без пересдач” -  мы оказываем помощь в решении задач по программированию на заказ.",
  ],
  [
    "composition",
    "Нужна помощь в сессии? Хочешь, чтобы тебе помогли, а не просто купить реферат? “Без пересдач” -  мы оказываем помощь в написании реферата на заказ.",
  ],
  [
    "review",
    "Нужна помощь в сессии? Хочешь, чтобы тебе помогли, а не просто купить рецензию? “Без пересдач” -  мы оказываем помощь в написании рецензии на заказ.",
  ],
  [
    "opus",
    "Нужна помощь в сессии? Хочешь, чтобы тебе помогли, а не просто купить сочинение? “Без пересдач” -  мы оказываем помощь в написании сочинения на заказ.",
  ],
  [
    "article",
    "Нужна помощь в сессии? Хочешь, чтобы тебе помогли, а не просто купить статью? “Без пересдач” -  мы оказываем помощь в написании статьи на заказ.",
  ],
  [
    "tests",
    "Нужна помощь в сессии? Хочешь, чтобы тебе помогли, а не просто решили тесты? “Без пересдач” -  мы оказываем помощь в решении тестов на заказ.",
  ],
  [
    "scheme",
    "Нужна помощь в сессии? Хочешь, чтобы тебе помогли, а не просто заказать чертеж? “Без пересдач” -  мы оказываем помощь в подготовке чертежа на заказ.",
  ],
  [
    "essay",
    "Нужна помощь в сессии? Хочешь, чтобы тебе помогли, а не просто купить эссе? “Без пересдач” -  мы оказываем помощь в написании эссе на заказ.",
  ],
  [
    "tasks",
    "Нужна помощь в сессии? Хочешь, чтобы тебе помогли, а не просто решили задачу? “Без пересдач” -  мы оказываем помощь в решении и объяснении задач на заказ.",
  ],
  [
    "other",
    "Нужна помощь в сессии? Хочешь, чтобы тебе помогли, но не знаешь с чем? “Без пересдач” -  мы оказываем помощь в подготовке и сдаче сессии и решение задач на заказ.",
  ],
  [
    "new",
    "Нужна помощь в сессии? Хочешь, чтобы тебе помогли, но не знаешь с чем? “Без пересдач” -  мы оказываем помощь в подготовке и сдаче сессии и решение задач на заказ.",
  ],
]);
