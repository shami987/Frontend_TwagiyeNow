import api from './client';

export const authApi = {
  signup: (data: { name: string; email: string; password: string }) =>
    api.post('/auth/signup', data),

  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),

  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),

  verifyOtp: (email: string, otp: string) =>
    api.post('/auth/verify-otp', { email, otp }),

  resetPassword: (email: string, otp: string, newPassword: string) =>
    api.post('/auth/reset-password', { email, otp, newPassword }),
};
