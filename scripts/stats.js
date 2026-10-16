import { events } from "./state.js";
import { showWeeklyChart } from "./discovery.js"

let totalMinutes = 0;

for (const event of events) {
    totalMinutes = totalMinutes + event.duration;
}

document.querySelector("#total-records").textContent = events.length;
document.querySelector("#total-duration").textContent = totalMinutes;


let topCategory = "-";
let highestCount = 0;

for (const event of events) {
    let count = 0;

    for (const otherEvent of events) {
        if (otherEvent.tag === event.tag) {
            count = count + 1;
        }
    }

    if (count > highestCount) {
        highestCount = count;
        topCategory = event.tag;
    }
}

document.querySelector("#top-category").textContent = topCategory;


showWeeklyChart(); 
