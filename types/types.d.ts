interface Window {
  ym: (id: number, goal: string, goalName: string) => void;
}

interface IOrder {
  projectType: string;
  subject: string;
  projectName: string;
  description: string;
  dueDate: date;
  originality: string;
  antiPlagiarism: "free" | "paid";
  email: string;
  expectedPrice: string;
  promoCode: string;
}

interface IUser {
  identifier: string;
  password: string;
}
