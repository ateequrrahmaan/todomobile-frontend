import { api } from "./client";

export interface AuthUser {
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

type ApiAuthResponse = {
  success: boolean;
  data: AuthResponse;
};

export const login = async (email: string, password: string) => {
  const response = await api.post<ApiAuthResponse>("/auth/login", {
    email,
    password
  });
  return response.data.data;
};

export const register = async (email: string, password: string) => {
  const response = await api.post<ApiAuthResponse>("/auth/register", {
    email,
    password
  });
  return response.data.data;
};

