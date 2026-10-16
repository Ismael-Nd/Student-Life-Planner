import { events, replaceEvents } from "./state.js";
import { loadEvents } from "./storage.js";

const unitSelect = document.querySelector("#display-unit");
const unitStatus = document.querySelector("#unit-status");

try {
  const saveUnit = localStorage.getItem("campus:unit");

  if (saveUnit === "hours") {
    unitSelect.value = "hours";
  }
} catch {
  unitStatus.textContent = "The saved preference could not be loaded.";
}

unitSelect.addEventListener("change", function () {
  try {
    localStorage.setItem("campus:unit", unitSelect.value);
    unitStatus.textContent = "Preference saved.";
  } catch {
    unitStatus.textContent = "The preference could not be saved.";
  }
});

const exportButton = document.querySelector("#export-json");
const dataStatus = document.querySelector("#settings-status");

exportButton.addEventListener("click", function () {
  try {
    const json = JSON.stringify(events, null, 2);
    const file = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(file);

    const link = document.createElement("a");
    link.href = url;
    link.download = "campus-events.json";
    document.body.append(link);
    link.click();
    link.remove();

    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);

    dataStatus.textContent = "Event backup downlaoded.";
  } catch {
    dataStatus.textContent = "The backup could not be downloaded.";
  }
});

const importButton = document.querySelector("#import-json");
const fileInput = document.querySelector("#json-import");

importButton.addEventListener("click", async function () {
  const file = fileInput.files[0];

  if (!file) {
    dataStatus.textContent = "Choose a JSON file first.";
    return;
  }

  try {
    const text = await file.text();
    const records = loadEvents(text);

    if (!confirm("Replace your events with this backup?")) return;

    replaceEvents(records);
    dataStatus.textContent = records.length + " events imported.";
  } catch (error) {
    dataStatus.textContent = "Import failed: " + error.message;
  }
});

// Loads validated demo events and skips IDs already saved in this browser.
document.querySelector("#load-demo").addEventListener("click", async function () {
  try {
    const response = await fetch("seed.json");
    if (!response.ok) throw new Error("The demo file could not be loaded.");
    const demoEvents = loadEvents(await response.text());
    const nextEvents = events.slice();
    let added = 0;

    for (const demo of demoEvents) {
      // Checks whether this demo event is already in the list.
      const exists = nextEvents.some(function (event) {
        return event.id === demo.id;
      });
      if (!exists) {
        nextEvents.push(demo);
        added++;
      }
    }

    replaceEvents(nextEvents);
    dataStatus.textContent = added + " demo events added. Open Discover to see them.";
  } catch (error) {
    dataStatus.textContent = "Demo loading failed: " + error.message;
  }
});
