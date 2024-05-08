export const addDays = (date: Date, days: number) => {
    return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
};

export const nextMonthWithDate = (date: Date, monthsToAdd: number) => {
    let month = date.getMonth();
    const dateInMonth = date.getDate();
    while (true) {
        month += monthsToAdd;
        const x = maxDayInMonth(month + 1, date.getFullYear());
        if (dateInMonth <= x) {
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

export const maxDayInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
};
