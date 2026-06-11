import {format} from 'date-fns';

export const formatTransactionDate = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : format(date, 'MMM dd yyyy');
};

export const transactionTimestamp = (createdAt: string) =>
  Date.parse(createdAt) || 0;

// FlexxTable sorts a column's cell value lexicographically; date cells hold a
// formatted string, so we sort the Date column on the raw timestamp kept in the
// row metadata instead (FlexxTable passes row metadata to a column comparator).
export const byTransactionTimestamp = (
  a?: {timestamp: number},
  b?: {timestamp: number},
) => (a?.timestamp ?? 0) > (b?.timestamp ?? 0);
