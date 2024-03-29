﻿import React, { ChangeEvent } from "react";
import { useLocation } from "react-router";

export function randomString() {
    return Math.random().toString(36).substring(7);
};

export function camelCaseToTitleCase(word: string) {
    return capitalize(word.replace(/((?<=[a-z])(?=[A-Z\d]))|((?<=\d)(?=[A-Z]))/g, ' '));
}

export function capitalize(word: string) {
    return `${word[0].toUpperCase()}${word.substr(1)}`;
};

function dateToIso(date: Date): string {
    date = new Date(date);
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - (offset * 60 * 1000));
    return date.toISOString().split('T')[0];
}

export function formattedDate(date?: Date): string {
    return date ? dateToIso(date) : '';
};

export function formattedDateAllowUndefined(date?: Date): string | undefined {
    return date ? formattedDate(date) : undefined;
}

export function convertDateChange(event: ChangeEvent<HTMLInputElement>) : Date | undefined {
    return event.target.value.length ? new Date(event.target.value) : undefined
}

export function parenthesize(number: number, addText?: string): string {
    return `(${number.toLocaleString()}${addText ? ` ${addText}` : ''})`;
};

export function parenthesizeIfNegative(number?: number, addText?: string): string {
    return number === undefined ? ''
        : number < 0 ? parenthesize(-number, addText)
            : `${number.toLocaleString()}${addText ? ` ${addText}` : ''}`;
}

export function useQueryParams() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}