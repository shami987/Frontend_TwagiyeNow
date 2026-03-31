import api from './client';

export type ChatHistory = { role: 'user' | 'model'; text: string }[];

export async function sendMessageToGemini(message: string, history: ChatHistory = []): Promise<string> {
  const response = await api.post('/ai/chat', { message, history });
  return response.data.reply ?? '';
}
