// src/services/authService.ts
import { AuthCredentials, RegisterRequest, AuthResponse } from '../models/User';
import { post } from './api';

export const login = async (credentials: AuthCredentials): Promise<AuthResponse> => {
  try {
    const response = await post('/auth/login', credentials, false);
    return response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Login failed');
  }
};

export const register = async (userData: RegisterRequest): Promise<AuthResponse> => {
  if (userData.password !== userData.confirmPassword) {
    throw new Error('Passwords do not match');
  }
  
  try {
    // Remove confirmPassword as it's not needed on the server
    const { confirmPassword, ...registrationData } = userData;
    const response = await post('/auth/register', registrationData, false);
    return response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Registration failed');
  }
};

export const logout = (): void => {
  // Client-side logout only - the JWT will be removed from localStorage
  // For server-side logout (if implementing refresh tokens), you would add an API call here
};

export const validateToken = async (): Promise<boolean> => {
  try {
    await post('/auth/validate-token', {});
    return true;
  } catch (error) {
    return false;
  }
};