// Browser storage shared by Discover and the administration page.
const key = "campus-life-planner:events:v1";

export function loadEvents() {
    const saved = localStorage.getItem(key);
    if (saved === null) return null;
    const records = JSON.parse(saved);
    if (!Array.isArray(records)) throw new Error("Saved records must be a list.");
    const ids = new Set();
    for (const record of records) {
        if (!record || typeof record.id !== "string" || ids.has(record.id) ||
            typeof record.title !== "string" || typeof record.description !== "string" ||
            typeof record.tag !== "string" || typeof record.venue !== "string" ||
            typeof record.organizerId !== "string" || typeof record.dueDate !== "string" ||
            typeof record.duration !== "number" || !Number.isFinite(record.duration) || record.duration < 0 ||
            typeof record.price !== "number" || !Number.isFinite(record.price) || record.price < 0 ||
            typeof record.createdAt !== "string" || typeof record.updatedAt !== "string") {
            throw new Error("Saved event data is invalid.");
        }
        ids.add(record.id);
    }
    return records;
}

export function saveEvents(records) {
    localStorage.setItem(key, JSON.stringify(records));
}
