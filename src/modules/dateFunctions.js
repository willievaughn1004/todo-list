import {
  startOfWeek,
  isAfter,
  isBefore,
  endOfWeek,
  parseISO,
  isSameDay,
} from "date-fns";

// Contains functions needed about dates
export const getCurrentDatesInfo = () => {
  const todayDate = new Date();
  const startOfThisWeek = startOfWeek(todayDate);
  const endOfThisWeek = endOfWeek(todayDate);

  // Checks whether the date provided is today's date based on the local machine.
  const confirmToday = (date) => {
    const parsedToday = parseISO(date);

    return isSameDay(parsedToday, todayDate);
  };

  // Checks whether the date provided is within the week, but after today's date based on the local machine.
  const confirmWeek = (date) => {
    const currentDate = parseISO(date);

    return (
      isBefore(currentDate, endOfThisWeek) &&
      isAfter(currentDate, startOfThisWeek) &&
      (isAfter(currentDate, todayDate) || isSameDay(currentDate, todayDate))
    );
  };

  return {
    todayDate,
    confirmToday,
    confirmWeek,
  };
};

// Formates dates into a different style

export const formatDate = (date) => {
  if (!date) {
    return "";
  }

  const splitDate = date.split("-");

  const newDate = `${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`;

  return newDate;
};
