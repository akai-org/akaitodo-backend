export const addDays = (date: Date, days: number): Date => {
    return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
};

export const nextMonthWithDate = (date: Date, monthsToAdd: number): Date => {
    let month = date.getMonth();
    const dateInMonth = date.getDate();
    while (true) {
        month += monthsToAdd;
        if (dateInMonth <= maxDayInMonth(month + 1, date.getFullYear())) {
            break;
        }
    }
    return new Date(
        date.getFullYear(),
        month,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds(),
    );
};

export const maxDayInMonth = (month: number, year: number): number => {
    return new Date(year, month, 0).getDate();
};
