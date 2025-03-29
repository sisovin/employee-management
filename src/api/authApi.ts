import axiosInstance from './axiosInstance';

const signup = async (name: string, email: string, password: string) => {
  const response = await axiosInstance.post('/auth/signup', { name, email, password });
  return response.data;
};

const login = async (email: string, password: string) => {
  const response = await axiosInstance.post('/auth/login', { email, password });
  return response.data;
};

const logout = async () => {
  const response = await axiosInstance.post('/auth/logout');
  return response.data;
};

export { signup, login, logout };
