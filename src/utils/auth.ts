export const registerUser = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};

export const loginUser = (email: string, password: string) => {
  const user = getUser();

  if (!user) return false;

  return user.email === email && user.password === password;
};

export const resetPassword = (newPassword: string) => {
  const user = getUser();

  if (!user) return;

  user.password = newPassword;

  localStorage.setItem("user", JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem("user");
};