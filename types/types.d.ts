interface Window {
  ym: (id: number, goal: string, goalName: string) => void;
}

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
}

interface IUser {
  identifier: string;
  password: string;
}
