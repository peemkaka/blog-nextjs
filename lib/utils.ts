import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function parseServerActionResponse<T>(response: T) {
    return JSON.parse(JSON.stringify(response));
}

export function formatDate(date: string | undefined | null) {
    // Use current date as fallback if date is null/undefined
    const dateToFormat = date || new Date().toISOString();
    
    try {
        const parsedDate = new Date(dateToFormat);
        if (isNaN(parsedDate.getTime())) {
            return "Invalid Date";
        }
        
        return parsedDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    } catch (error) {
        return "Invalid Date";
    }
}

export function formatNumber(number: number) {
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1).replace(/\.0$/, "") + "M"; // Convert to millions
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1).replace(/\.0$/, "") + "k"; // Convert to thousands
    } else {
        return number.toString(); // Return the number as is if below 1000
    }
}