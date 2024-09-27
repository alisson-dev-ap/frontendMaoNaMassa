export const generateRandomId = (name: string) => {
  return `${name}${Math.random().toString().split('.')[1]}`;
};
