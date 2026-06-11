import {format} from 'date-fns';

export const formatTransactionDate = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : format(date, 'MMM dd yyyy');
};
