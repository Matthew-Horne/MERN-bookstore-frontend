const getBaseUrl = () => {
  if (import.meta.env.PROD) {
    return "https://mern-bookstore-backend-2.onrender.com";
  }
  return "http://localhost:5000";
};

export default getBaseUrl;
