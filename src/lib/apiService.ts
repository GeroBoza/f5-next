import axios from "axios";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";

import { HeadersAdapter } from "next/dist/server/web/spec-extension/adapters/headers";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

const getSessionData = async () => {
  return await getServerSession(authOptions);
};

// import cookie from "cookie";

const headersJson = {
  headers: {
    "Content-Type": "application/json",
  },
};

const headersJsonAuthServer = async () => {
  const sessionData = await getSessionData();
  const token = sessionData.user.token;
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
};
const headersJsonAuthClient = async (token: string) => {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
};

const headersMultipart = async () => {
  const sessionData = await getSessionData();
  const token = sessionData.user.token;
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token.value,
    },
  };
};

const api = process.env.NEXT_PUBLIC_BACKEND_URL;

export const ApiService = {
  login: async (data: Record<string, string>) => {
    const res = await axios.post(`${api}/users/login`, data);
    return res;
  },
  me: async (userId: number | any, token: string | any) => {
    const headers = await headersJsonAuthClient(token);
    const res = await axios.get(`${api}/users/me/${userId}`, headers);
    return res;
  },
  findUser: async (name: string) => {
    const res = await axios.post(`${api}/users/findUser`, { name: name });
    return res.data;
  },
  getUsersClient: async (token: string) => {
    const headers = await headersJsonAuthClient(token);
    const res = await axios.get(`${api}/users`, headers);
    return res.data;
  },
  getUsersServer: async () => {
    const headers = await headersJsonAuthServer();
    const res = await axios.get(`${api}/users`, headers);
    return res.data;
  },
  getUserSkillsAverage: async (userId: number, token: string) => {
    const headers = await headersJsonAuthClient(token);
    const res = await axios.get(
      `${api}/users/getUserSkillsAverage/${userId}`,
      headers,
    );
    return res.data;
  },
  getSkills: async () => {
    // const headers = await headersJsonAuth();
    const res = await axios.get(`${api}/skills/getAll`);
    return res.data;
  },
};
