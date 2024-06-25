import axios from "axios";

const headersJson = {
  headers: {
    "Content-Type": "application/json",
  },
};

const headersJsonAuth = () => {
  const token = localStorage.getItem("jwt-f5-token");
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
};

const headersMultipart = () => {
  const token = localStorage.getItem("jwt-f5-token");
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    },
  };
};

const api = process.env.NEXT_PUBLIC_BACKEND_URL;

export const ApiService = {
  login: async (data: Record<string, string>) => {
    const res = await axios.post(`${api}/users/login`, data);
    return res;
  },
  getUsers: async () => {
    const res = await axios.get(`${api}/users`);
    return res.data;
  },
};
