import { events } from "./state.js";
import { showWeeklyChart } from "./discovery.js"

let totalMinutes = 0;

for (const event of events) {
    totalMinutes = totalMinutes + event.duration;
}

document.querySelector("#total-records").textContent = events.length;

let unit = "minutes"; 

try {
    if (localStorage.getItem("campus:unit") === "hours") {
        unit = "hours";
    }
}catch {
    console.warn("The saved unit could not be laoded.");
}

if (unit === "hours") {
    document.querySelector("#total-duration").textContent = 
        (totalMinutes / 60).toFixed(2);
} else {
    document.querySelector("#total-duration").textContent = totalMinutes;
}

document.querySelector("#duration-unit").textContent = unit;

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

try {
    const savedCap = localStorage.getItem("campus:time-cap");

    if(savedCap !==null) {
        capInput.value = savedCap;

        if(capInput.value === "" || !capInput.checkVisibility()) {
            capInput.value = "300";
        }
    }
} catch {
    console.warn("The saved time cap could not be loaded.");
}

function updateCap () {
    remainingMessage.textContent = "";
    overageMessage.textContent = "";

    if(capInput.value === "" || !capInput.checkValidity()) {
        overageMessage.textContent = "Enter zero or more minutes.";
        return;
    } 

    const remaining = Number(capInput.value) - totalMinutes;

    if (remaining >=0 ) {
        remainingMessage.textContent =
            remaining.toFixed(2) + " minutes remaining.";
    }else {
        overageMessage.textContent = 
            Math.abs(remaining).toFixed(2) + " minutes over the cap.";
    }
}

capInput.addEventListener("change", function () {
    if (capInput.value === "" || !capInput.checkValidity()) return;

    try {
        localStorage.setItem("campus:time-cap", capInput.value);
    }catch {
        overageMessage.textContent = "The time cap could not be saved.";
    }
});

capInput.addEventListener("input", updateCap);

capInput.addEventListener("change", function () {
    if (capInput.value === "" || !capInput.checkValidity()) return;

    try {
        localStorage.setItem("campus:time-cap", capInput.value);
    }catch {
        overageMessage.textContent = "The rime cap could not be saved."
    }

});

updateCap();