
const STORAGE_KEY = "checkoutData";

export const getCheckoutData = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
    items: [],
    address: {},
    schedule: {},
    payment: {},
  };
};

export const saveCheckoutData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const clearCheckoutData = () => {
  localStorage.removeItem(STORAGE_KEY);
};