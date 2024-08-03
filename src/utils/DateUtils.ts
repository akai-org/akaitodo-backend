export const addDays = (date: Date, days: number): Date => {
    return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
};

export const nextMonthWithDate = (date: Date, monthsToAdd: number): Date => {
    let year = date.getFullYear();
    let month = date.getMonth();
    const dateInMonth = date.getDate();
    while (true) {
        month += monthsToAdd;
        if (month > 11) {
            month = 0;
            ++year;
        }
        if (month >= 10 && dateInMonth <= maxDayInMonth(month + 1, year)) {
            break;
        } else if (dateInMonth <= maxDayInMonth(0, year + 1)) {
            break;
        }
    }
    return new Date(
        year,
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

export const dateWithoutTimezone = (date: Date) => {
    const tzOffset = date.getTimezoneOffset() * 60000; // offset in milisecs
    return new Date(date.valueOf() - tzOffset).toISOString().slice(0, -1);
};
