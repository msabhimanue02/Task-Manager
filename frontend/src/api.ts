import axios, { type AxiosRequestHeaders } from 'axios';
import { API_BASE_URL, BASIC_AUTH_HEADER } from './config';
import type {
  PaginatedLogResponse,
  PaginatedTaskResponse,
  TaskPayload,
} from './types';

const client = axios.create({
  baseURL: API_BASE_URL,
});

client.interceptors.request.use((config) => {
  config.headers = {
    ...(config.headers ?? {}),
    Authorization: BASIC_AUTH_HEADER,
    'Content-Type': 'application/json',
  } as AxiosRequestHeaders;
  return config;
});

export const fetchTasks = async (page: number, query: string) => {
  const params = new URLSearchParams();
  params.set('page', String(page));
  if (query.trim()) params.set('q', query.trim());
  const { data } = await client.get<PaginatedTaskResponse>(`/tasks?${params.toString()}`);
  return data;
};

export const createTask = async (payload: TaskPayload) => {
  const { data } = await client.post('/tasks', payload);
  return data;
};

export const updateTask = async (id: number, payload: TaskPayload) => {
  const { data } = await client.put(`/tasks/${id}`, payload);
  return data;
};

export const deleteTask = async (id: number) => {
  await client.delete(`/tasks/${id}`);
};

export const fetchAuditLogs = async (page: number, actionFilter: string | null) => {
  const params = new URLSearchParams();
  params.set('page', String(page));
  if (actionFilter) params.set('action', actionFilter);
  const { data } = await client.get<PaginatedLogResponse>(`/logs?${params.toString()}`);
  return data;
};
