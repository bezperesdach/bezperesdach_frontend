interface Window {
  ym: (id: number, goal: string, goalName: string) => void;
  VK: {
    Goal: (goalType: VKGoalTypes, options?: { value: number }) => void;
  };
}

type VKGoalTypes =
  | "add_to_cart" // равносильно событию динамического ретаргетинга add_to_cart (рус. Добавление в корзину)— добавление товара в корзину.
  | "add_to_wishlist" // равносильно событию динамического ретаргетинга add_to_wishlist (рус. Добавление в список желаний)— добавление товара в список желаний.
  | "customize_product" // (рус. Уточнение сведений) — уточнение сведений о товаре.
  | "initiate_checkout" // (рус. Начало оформления заказа) — начало оформления заказа.
  | "add_payment_info" // равносильно событию динамического ретаргетинга add_payment_info (рус. Добавление платежной информации) — добавление платежной информации в процессе оформления заказа, например, сохранение данных банковской карты.
  | "purchase" // равносильно событию динамического ретаргетинга purchase (рус. Покупка)— совершение покупки или завершение оформления заказа.
  | "contact" // (рус. Контакт) — пользователь совершил действие, чтобы связаться с вами, например, открыл чат, просмотрел страницу с вашими контактами, отправил свои контактные данные для обратного звонка.
  | "lead" // (рус. Получение потенциального клиента) — получение данных о потенциальном клиенте, контактной информации о покупателе, например, в виде заполненной заявки.
  | "schedule" // (рус. Запись на приём) — запись на приём в одном из ваших магазинов или офисов на определённое время или дату.
  | "complete_registration" // (рус. Регистрация)— регистрация, заполнение регистрационной формы.
  | "submit_application" // (рус. Подача заявки) — подача заявки на предлагаемый вами товар, услугу или программу.
  | "start_trial" // (рус. Использование пробной версии) — начало использования бесплатной/пробной версии предлагаемого вами товара или услуги.
  | "subscribe" // (рус. Оформление подписки) — оформление подписки на товар или услугу.
  | "page_view" // (рус. Посещение страницы) — просмотр страницы. Вы можете прописать это событие на любой важной странице сайта.
  | "view_content" // (рус. Просмотр контента)— просмотр определенного контента, например, вы можете вызывать событие для пользователей, досмотревших страницу до конца.
  | "search" // (рус. Использование поиска)— использование поиска, например, по статьям или товарам на сайте.
  | "find_location" // (рус. Поиск местонахождения)— поиск местонахождения вашей компании, например, открытие карты с филиалами компании.
  | "donate" // (рус. Пожертвование средств) — пожертвование средств.
  | "conversion"; // (рус. Конверсия) — конверсия, или целевое действия без уточнения подробностей. Используйте этот тип события, если в списке событий выше вы не нашли подходящее для вашего целевого действия.

interface IOrder {
  contactType: string;
  contact: string;
  projectType: string;
  subject: string;
  projectName: string;
  description: string;
  dueDate: date;
  originality: string;
  antiPlagiarism: "free" | "paid" | "none";
  expectedPrice: string;
  promoCode: string;
  media?: File[] | null;
}

interface IUser {
  identifier: string;
  password: string;
}

interface ReactSelectOption {
  label: string;
  value: string;
}

interface RandomReviews {
  avgRating: number;
  reviews: Review[];
}

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: Date;
  avatar: string;
}
