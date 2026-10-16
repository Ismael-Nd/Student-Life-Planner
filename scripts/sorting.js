// Copy before sorting so the original event order is preserved.
export function sortEvents(records, order) {
    const sorted = records.slice();
    sorted.sort(function (a, b) {
        if (order === "date-asc") return a.dueDate.localeCompare(b.dueDate);
        if (order === "date-desc") return b.dueDate.localeCompare(a.dueDate);
        if (order === "title-asc") return a.title.localeCompare(b.title);
        if (order === "title-desc") return b.title.localeCompare(a.title);
        if (order === "duration-asc") return a.duration - b.duration;
        if (order === "duration-desc") return b.duration - a.duration;
        if (order === "newest") return b.createdAt.localeCompare(a.createdAt);
        if (order === "oldest") return a.createdAt.localeCompare(b.createdAt);
        if (order === "popular") return (b.popularity || 0) - (a.popularity || 0);
        return (b.recentInterest || 0) - (a.recentInterest || 0);
    });
    
    return sorted
}
