import React from "react";
import { useLocation } from "react-router";

export function randomString() {
    return Math.random().toString(36).substring(7);
};

export function camelCaseToTitleCase(word: string) {
    return capitalize(word.replace(/(?=[A-Z])/g, ' '));
}

export function capitalize(word: string) {
    return `${word[0].toUpperCase()}${word.substr(1)}`;
};

export function formattedDate(date?: Date): string {
    return date ? new Date(date).toLocaleDateString('en-ca') : ''
};

export function parenthesize(number: number): string {
    return `(${number})`;
};

export function parenthesizeIfNegative(number: number): string {
    return number < 0 ? parenthesize(-number) : number.toString();
}

export function useQueryParams() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}