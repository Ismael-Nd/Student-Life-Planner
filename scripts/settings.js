import { events } from "./state.js";

const unitSelect = document.querySelector("#display-unit");
const unitStatus = document.querySelector("#unit-status");


try {
    const saveUnit = localStorage.getItem("campus:unit");

    if (saveUnit === "hours" ) {
        unitSelect.value = "hours";
    }
} catch {
    unitStatus.textContent = "The saved preference could not be loaded.";
}

unitSelect.addEventListener("change", function(){
    try {
        localStorage.setItem("campus:unit", unitSelect.value);
        unitStatus.textContent = "Preference saved.";
    }catch {
        unitStatus.textContent  = "The preference could not be saved."
    }
});


const exportButton = document.querySelector("#export-json");
const dataStatus = document.querySelector("#settings-status");

exportButton.addEventListener("click", function() {
    try {
        const json = JSON.stringify(events, null, 2);
        const file = new Blob([json], {type: "application/json"});
        const url = URL.createObjectURL(file);


        const link = document.createElement("a");
        link.href = url;
        link.download = "campus-events.json";
        document.body.append(link); 
        link.click();
        link.remove();

        setTimeout(function() {
            URL.revokeObjectURL(url);
        }, 1000);

        dataStatus.textContent = "Event backup downlaoded.";
    }catch {
        dataStatus.textContent = "The backup could not be downloaded.";
    }
});