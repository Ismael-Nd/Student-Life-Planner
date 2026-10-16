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


const capInput = document.querySelector("#time-cap");
const remainingMessage = document.querySelector("#cap-remaining");
const overageMessage = document.querySelector("#cap-overage");

function updateCap () {
    remainingMessage.textContent = "";
    overageMessage.textContent = "";

    if(capInput.value === "" || !capInput.checkVisibility()) {
        overageMessage.textContent = "Enter zero or more minutes.";
        return;
    } 

    const remaining = Number(capInput.value) - totalMinutes;

    if (remaining >=0 ) {
        remainingMessage.textContent =
            remaining.toFixed(2) + "minutes remaining.";
    }else {
        overageMessage.textContent = 
            Math.abs(remaining).toFixed(2) + "minutes over the cap.";
    }
}

capInput.addEventListener("input", updateCap);
updateCap();