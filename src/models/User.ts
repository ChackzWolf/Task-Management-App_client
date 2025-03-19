export interface User {
    _id?: string;
    username: string;
    email: string;
    token?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterRequest extends AuthCredentials {
  username: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}