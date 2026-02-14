import { formatDistanceToNow } from "date-fns";

export const formatTime = (seconds: number): string => {
    if (isNaN(seconds) || seconds === 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export const formatRelativeTime = (date: string | Date): string => {
  if (!date) return '';
  
  return formatDistanceToNow(new Date(date), { 
    addSuffix: true, // Adds 'ago' or 'in'
    includeSeconds: false 
  });
};