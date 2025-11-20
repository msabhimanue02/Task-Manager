export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api';
export const BASIC_AUTH_USER = import.meta.env.VITE_BASIC_AUTH_USER ?? 'admin';
export const BASIC_AUTH_PASS = import.meta.env.VITE_BASIC_AUTH_PASS ?? 'password123';

export const BASIC_AUTH_HEADER = `Basic ${btoa(`${BASIC_AUTH_USER}:${BASIC_AUTH_PASS}`)}`;

export const TASKS_PER_PAGE = 5;
export const LOGS_PER_PAGE = 10;
