export interface SignupProps {
  username: string;
  email: string;
  password: string;
  role: "CUSTOMER";
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}
