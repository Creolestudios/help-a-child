import { format, formatRelative, parseISO } from "date-fns";

export function parseDateRelative(date: Date) {
  if (!date) return;
  return formatRelative(date, Date.now());
}

export function parseDateWithTime(date: string) {
  if (!date) return;
  return format(new Date(date), "dd-MM-yyy hh:mm:ss");
}

export function parseDate(date: Date) {
  if (!date) return;
  return format(date, "dd-MM-yyy");
}
