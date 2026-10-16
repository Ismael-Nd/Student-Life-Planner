// import { events as sampleEvents } from "./events-data.js";
import { loadEvents, saveEvents } from "./storage.js";

export let events = [];
export let storageWarning = "";


try {
    const saved = loadEvents();
    
    if (saved !== null) {
        events = saved.filter(function (event){
            return event.id.startsWith("rec_")
        })

    }
} catch {
    storageWarning = "Events could not be loaded in this browser";
}

export function addEvent(record) {
    const nextEvents = events.slice();
    nextEvents.push(record);
    saveEvents(nextEvents);
    events = nextEvents;
}

export function updateEvent(record) {
    const index = events.findIndex(function (event) { return event.id === record.id; });
    if (index === -1) throw new Error("Event not found.");
    const nextEvents = events.slice();
    nextEvents[index] = record;
    saveEvents(nextEvents);
    events = nextEvents;
}

export function deleteEvent(id) {
    const nextEvents = events.filter(function (event) { return event.id !== id; });
    saveEvents(nextEvents);
    events = nextEvents;
}
