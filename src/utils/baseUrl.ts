const getBaseUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://mern-bookstore-backend-2.onrender.com";
  }
  return "http://localhost:5000";
};

export default getBaseUrl;
