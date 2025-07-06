// A function to store the user in local storage
export const addUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};
// Function to delete user from local storage
export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};
// Function to retrieve user from local storage
export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null;
  return user;
};
