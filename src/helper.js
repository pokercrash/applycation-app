export const handleLogin = (credentials) => {
  // Assuming the credentials object contains { username, password, token }
  sessionStorage.setItem("sessionToken", JSON.stringify(credentials));
};

export const getUserFromSession = () => {
  const user = sessionStorage.getItem("sessionToken");
  return user ? JSON.parse(user) : null; // Parse the user data if it exists
};

export const handleLogout = () => {
  sessionStorage.removeItem("sessionToken");
};
