// A function to store the user in local storage
export const addUserToLocalStorage = (key,value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
// Function to delete user from local storage
export const removeUserFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};
// Function to retrieve user from local storage
export const getUserFromLocalStorage = (key) => {
  const result = localStorage.getItem(key);
  const value = result ? JSON.parse(result) : null;
  return value;
};
