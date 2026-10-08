const KEY = 'campus-life-planner:bookmarks:v1';

export function loadBookmarks(storage, validIds) {
    try {
        const raw = storage.getItem(KEY);
        if (raw === null) return { ids: [], error: null };
        const ids = JSON.parse(raw);
        if (!Array.isArray(ids) || !ids.every(id => typeof id === 'string')) {
            throw new Error('Invalid bookmark data');
        }
        return { ids: [...new Set(ids)].filter(id => validIds.includes(id)), error: null };
    } catch {
        return { ids: [], error: 'Saved bookmarks could not be loaded in this browser.' };
    }
}

export function saveBookmarks(storage, ids) {
    try {
        storage.setItem(KEY, JSON.stringify([...ids]));
        return true;
    } catch {
        return false;
    }
}
