export function totalPages(results: { totalResults: number, pageSize: number }) {
    return Math.ceil(results.totalResults / results.pageSize);
};
