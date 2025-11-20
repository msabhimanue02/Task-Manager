export const sanitizeInput = (value: string) => value.replace(/<[^>]*>?/gm, '').trim();
