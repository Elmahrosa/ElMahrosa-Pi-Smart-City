// formatter.ts

/**
 * Format a date to a readable string.
 * @param date - The date to format, can be a Date object or a string.
 * @param locale - The locale to use for formatting (default: 'en-US').
 * @param options - Options for date formatting.
 * @returns A formatted date string.
 */
export const formatDate = (date: Date | string, locale: string = 'en-US', options?: Intl.DateTimeFormatOptions): string => {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
        throw new Error('Invalid date provided');
    }
    return dateObj.toLocaleString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
        ...options,
    });
};

/**
 * Format a number as currency.
 * @param amount - The amount to format.
 * @param currency - The currency code (default: 'USD').
 * @param locale - The locale to use for formatting (default: 'en-US').
 * @returns A formatted currency string.
 */
export const formatCurrency = (amount: number, currency: string = 'USD', locale: string = 'en-US'): string => {
    if (isNaN(amount)) {
        throw new Error('Invalid amount provided');
    }
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(amount);
};

/**
 * Format an object to a readable string.
 * @param obj - The object to format.
 * @returns A pretty-printed JSON string.
 */
export const formatObject = (obj: Record<string, any>): string => {
    return JSON.stringify(obj, null, 2); // Pretty print with 2 spaces
};

/**
 * Format an array of objects to a readable string.
 * @param arr - The array to format.
 * @returns A string representation of the array.
 */
export const formatArray = (arr: any[]): string => {
    return arr.map(item => formatObject(item)).join('\n');
};

/**
 * Format a percentage.
 * @param value - The value to format as a percentage.
 * @param decimalPlaces - The number of decimal places to include (default: 2).
 * @returns A formatted percentage string.
 */
export const formatPercentage = (value: number, decimalPlaces: number = 2): string => {
    if (isNaN(value)) {
        throw new Error('Invalid value provided');
    }
    return `${(value * 100).toFixed(decimalPlaces)}%`;
};

/**
 * Format a string to title case.
 * @param str - The string to format.
 * @returns The string in title case.
 */
export const formatTitleCase = (str: string): string => {
    if (typeof str !== 'string') {
        throw new Error('Input must be a string');
    }
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

// Example usage of the formatter functions
if (require.main === module) {
    try {
        console.log(formatDate(new Date())); // Example date formatting
        console.log(formatCurrency(1234.56)); // Example currency formatting
        console.log(formatObject({ name: 'John', age: 30 })); // Example object formatting
        console.log(formatArray([{ name: 'Alice' }, { name: 'Bob' }])); // Example array formatting
        console.log(formatPercentage(0.1234)); // Example percentage formatting
        console.log(formatTitleCase('hello world from formatter')); // Example title case formatting
    } catch (error) {
        console.error(error.message);
    }
}
