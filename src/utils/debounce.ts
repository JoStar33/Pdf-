const debounce = (func: (...arg0: any) => void, delay: number | undefined) => {
  let timeoutId: string | number | NodeJS.Timeout | undefined;
  return (...args: any) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export default debounce;
