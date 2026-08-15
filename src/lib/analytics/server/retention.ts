/** Number of days in the calendar month containing `date` (28–31). */
export function getDaysInMonth(date: Date = new Date()): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

/** Retention window: length of the current calendar month in days. */
export function getEventRetentionDays(date: Date = new Date()): number {
  return getDaysInMonth(date);
}

/** Delete events strictly before this instant (start of retention window). */
export function getEventRetentionCutoff(date: Date = new Date()): Date {
  const cutoff = new Date(date);
  cutoff.setDate(cutoff.getDate() - getEventRetentionDays(date));
  cutoff.setHours(0, 0, 0, 0);
  return cutoff;
}
