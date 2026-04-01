import api from './client';

export type ChatHistory = { role: 'user' | 'model'; text: string }[];

export async function sendMessageToGemini(message: string, history: ChatHistory = []): Promise<string> {
  const response = await api.post('/ai/chat', { message, history });
  return response.data.reply ?? '';
}

export async function sendVoiceToGemini(audioBase64: string, history: ChatHistory = []): Promise<string> {
  const response = await api.post('/ai/voice', { audioBase64, history });
  return response.data.reply ?? '';
}

export async function searchTripsForAI(from: string, to: string, date?: string): Promise<any[]> {
  const params: any = { from, to };
  if (date) params.date = date;
  const response = await api.get('/ai/search-trips', { params });
  return response.data.trips ?? [];
}
