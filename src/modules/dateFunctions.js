import {
  startOfWeek,
  isAfter,
  isBefore,
  endOfWeek,
  parseISO,
  isSameDay,
} from "date-fns";

export function getCurrentDatesInfo() {
  const todayDate = new Date();
  const startOfThisWeek = startOfWeek(todayDate);
  const endOfThisWeek = endOfWeek(todayDate);

  function confirmToday(date) {
    const parsedToday = parseISO(date);

    return isSameDay(parsedToday, todayDate);
  }

  function confirmWeek(date) {
    const currentDate = parseISO(date);

    return (
      isBefore(currentDate, endOfThisWeek) &&
      isAfter(currentDate, startOfThisWeek) &&
      (isAfter(currentDate, todayDate) || isSameDay(currentDate, todayDate))
    );
  }

  return {
    todayDate,
    confirmToday,
    confirmWeek,
  };
};

// Formatting dates

export function formatDate(date) {
    if (!date) {
        return ''
    }
    
    const splitDate = date.split("-");
  
    const newDate = `${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`;
  
    return newDate;
  };
