export interface LoginRequestData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface MeResponse {
  id: number;
  email: string;
  login: string;
}
