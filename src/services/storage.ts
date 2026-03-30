import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToken = (token: string) => AsyncStorage.setItem('token', token);
export const getToken = () => AsyncStorage.getItem('token');
export const removeToken = () => AsyncStorage.removeItem('token');

export const saveUser = (user: object) => AsyncStorage.setItem('user', JSON.stringify(user));
export const getUser = async () => {
  const user = await AsyncStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
export const removeUser = () => AsyncStorage.removeItem('user');
