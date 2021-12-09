export function randomString() {
    return Math.random().toString(36).substring(7);
};

export function capitalize(word: string) {
    return `${word[0].toUpperCase()}${word.substr(1)}`;
};