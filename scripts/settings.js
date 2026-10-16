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
        unitSelect.textContent  = "The preference could not be saved."
    }
});