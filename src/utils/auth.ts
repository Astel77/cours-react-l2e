export const getUser = () =>
    JSON.parse(localStorage.getItem("user") || "null");
  
  export const setUser = (user: any) => {
    localStorage.setItem("user", JSON.stringify(user));
  };
  
  export const logout = () => {
    localStorage.removeItem("user");
  };