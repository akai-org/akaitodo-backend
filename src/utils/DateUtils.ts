export const addDays = (date: Date, days: number) => {
    return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
};

export const addWeeks = (date: Date, weeks: number) => {
    return new Date(date.getTime() + weeks * 7 * 24 * 60 * 60 * 1000);
};
