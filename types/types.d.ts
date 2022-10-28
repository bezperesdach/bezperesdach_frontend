interface IOrder {
  projectType: string;
  subject: string;
  projectName: string;
  description: string;
  dueDate: date;
  originality: string;
  antiPlagiarism: "Бесплатный" | "Платный";
  email: string;
}
