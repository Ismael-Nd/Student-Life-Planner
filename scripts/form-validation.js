import {
    isValidDuration,
    isValidTitle,
    isValidTag,
    isValidDate,
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


const tagInput = document.querySelector("#event-tag");
const tagError = document.querySelector("#tag-error");

function validateTagField() {
    const valid = isValidTag(tagInput.value);

    if (valid) {
        tagError.textContent = "";
        tagInput.setAttribute("aria-invalid", "false");
    } else {
        tagError.textContent =
            "Use letters separated by single spaces or hyphens.";
        tagInput.setAttribute("aria-invalid", "true");
    }
}

tagInput.addEventListener("input", validateTagField);
tagInput.addEventListener("blur", validateTagField);

const dateInput = document.querySelector("#event-date");
const dateError = document.querySelector("#date-error");

function validateDateField() {
    const valid = isValidDate(dateInput.value);

    if (valid) {
        dateError.textContent = "";
        dateInput.setAttribute("aria-invalid", "false");
    } else {
        dateError.textContent = "Choose a valid event date.";
        dateInput.setAttribute("aria-invalid", "true");
    }
}

dateInput.addEventListener("input", validateDateField);
dateInput.addEventListener("blur", validateDateField);


const createForm = document.querySelector("#create-form");
const formStatus = document.querySelector("#form-status");

createForm.addEventListener("submit", function (event) {
    event.preventDefault();

    titleInput.value = collapseTitleSpaces(titleInput.value);

    validateTitleField();
    validateDurationField();
    validateTagField();
    validateDateField();

    const firstInvalid =
        createForm.querySelector('[aria-invalid="true"]');

    if (firstInvalid) {
        formStatus.textContent = "Please correct the highlighted fields.";
        firstInvalid.focus();
    } else {
        formStatus.textContent =
            "Validation passed for title, duration, category, and date. Saving is not connected yet.";
    }
});