import api from './client';
import { getToken } from '../services/storage';

const authHeader = async () => {
  const token = await getToken();
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const scheduleApi = {
  search: (from: string, to: string, date: string) =>
    api.get(`/schedules?from=${from}&to=${to}&date=${date}`),
  getAll: (date: string) =>
    api.get(`/schedules/all?date=${date}`),
  getSeats: (scheduleId: string) =>
    api.get(`/schedules/${scheduleId}/seats`),
};

export const bookingApi = {
  create: async (schedule_id: string, seat_numbers: number[]) => {
    const config = await authHeader();
    return api.post('/bookings', { schedule_id, seat_numbers }, config);
  },
  pay: async (bookingId: string, payment_method: string) => {
    const config = await authHeader();
    return api.post(`/bookings/${bookingId}/pay`, { payment_method }, config);
  },
  getById: async (bookingId: string) => {
    const config = await authHeader();
    return api.get(`/bookings/${bookingId}`, config);
  },
  getMyBookings: async () => {
    const config = await authHeader();
    return api.get('/bookings/my', config);
  },
  cancel: async (bookingId: string) => {
    const config = await authHeader();
    return api.put(`/bookings/${bookingId}/cancel`, {}, config);
  },
};

export const privateCarApi = {
  getAll: () => api.get('/private-cars'),

  book: async (data: {
    car_id: string;
    pickup_location: string;
    dropoff_location: string;
    pickup_time: string;
    distance_km: number;
  }) => {
    const config = await authHeader();
    return api.post('/private-cars/book', data, config);
  },

  pay: async (bookingId: string, payment_method: string) => {
    const config = await authHeader();
    return api.post(`/private-cars/book/${bookingId}/pay`, { payment_method }, config);
  },

  getMyBookings: async () => {
    const config = await authHeader();
    return api.get('/private-cars/my-bookings', config);
  },

  cancel: async (bookingId: string) => {
    const config = await authHeader();
    return api.put(`/private-cars/book/${bookingId}/cancel`, {}, config);
  },
};
