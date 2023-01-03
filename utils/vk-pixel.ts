const isDevelopment = process.env.NODE_ENV === "development";

export const VK = {
  Goal: function (goalType: VKGoalTypes, options?: { value: number }) {
    if (isDevelopment) {
      console.log(`%c[VK](HIT)`, `color: blue`, goalType, options ?? "");
    } else {
      window.VK.Goal(goalType, options);
    }
  },
};
