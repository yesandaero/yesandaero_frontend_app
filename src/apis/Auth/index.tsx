import { api } from "..";
import { LoginProps, LoginResponse, SignupProps } from "./type";

export const createUser = async ({
  username,
  email,
  password,
  role,
}: SignupProps) => {
  const response = await api.post(`/auth/signup`, {
    username,
    email,
    password,
    role,
  });
  return response.data;
};

export const loginUser = async ({ email, password }: LoginProps) => {
  const response = await api.post<LoginResponse>(`/auth/login`, {
    email,
    password,
  });
  return response.data;
};
