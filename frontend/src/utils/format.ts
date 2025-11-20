import { format } from 'date-fns';

export const formatTimestamp = (isoString: string) =>
  format(new Date(isoString), 'dd MMM yyyy • HH:mm');
