export function randomString() {
    return Math.random().toString(36).substring(7);
};

export function capitalize(word: string) {
    return `${word[0].toUpperCase()}${word.substr(1)}`;
};

export function formattedDate(item: { date?: Date }): string {
    return item.date ? new Date(item.date).toLocaleDateString('en-ca') : ''
}