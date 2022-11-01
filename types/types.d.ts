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
  antiPlagiarism: "Бесплатная" | "Платная";
  email: string;
  expectedPrice: string;
}
