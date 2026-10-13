import {
    isValidDuration,
    isValidTitle,
    hasDuplicateWords,
    collapseTitleSpaces
} from "./validators.js";

const durationInput = document.querySelector("#event-duration");
const durationError = document.querySelector("#duration-error");

function validateDurationField() {
    const valid = isValidDuration(durationInput.value);

    if (valid) {
        durationError.textContent = "";
        durationInput.setAttribute("aria-invalid", "false");
    } else {
        durationError.textContent =
            "Enter a duration such as 90 or 45.50.";
        durationInput.setAttribute("aria-invalid", "true");
    }
}

durationInput.addEventListener("blur", validateDurationField);
durationInput.addEventListener("input", validateDurationField);


const titleInput = document.querySelector("#event-title");
const titleError = document.querySelector("#title-error");

function validateTitleField() {
    let message = "";

    if (!isValidTitle(titleInput.value)) {
        message = "Enter a title without spaces at the beginning or end.";
    } else if (hasDuplicateWords(titleInput.value)) {
        message = "Remove repeated words from the title.";
    }

    titleError.textContent = message;
    titleInput.setAttribute(
        "aria-invalid",
        message !== "" ? "true" : "false"
    );
}

titleInput.addEventListener("input", validateTitleField);

titleInput.addEventListener("blur", function () {
    titleInput.value = collapseTitleSpaces(titleInput.value);
    validateTitleField();
});