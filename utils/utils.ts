export const showAndHideError = (callback: () => void, delayedCallback: () => void, delay: number) => {
  callback();
  setTimeout(() => delayedCallback(), delay);
};

export const convertBytesToAppropriateUnit = (bytes: number): string => {
  if (bytes < 1024) {
    return bytes + " Б";
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2) + " КБ";
  } else if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + " МБ";
  } else {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " ГБ";
  }
};

export const roundTo = (n: number, decimalPlaces: number): number => {
  // Check if the number has fewer decimal places than the specified number
  if (n.toString().split(".")[1]?.length < decimalPlaces) {
    // If it does, return the original number
    return n;
  } else {
    // Otherwise, round the number to the specified number of decimal places
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(n * factor) / factor;
  }
};
