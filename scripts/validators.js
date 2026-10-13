export function isValidDuration(value) {
    const pattern = /^(0|[1-9]\d*)(\.\d{1,2})?$/; 
    return pattern.test(value);
}

export function isValidTitle(value) {
    const pattern = /^\S(?:.*\S)?$/;
    return pattern.test(value);
}

export function isValidTag(value) {
    const pattern = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
    return pattern.test(value);
}

export function isValidDateFormat(value) {
    const pattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    return pattern.test(value);
}

export function isValidDate(value) {
    if (!isValidDateFormat(value)) {
        return false;
    }

    const [year, month, day] = value.split("-").map(Number);

    const date = new Date(0);
    date.setUTCFullYear(year, month - 1, day);

    return (
        date.getUTCFullYear() === year &&
        date.getUTCMonth() === month - 1 &&
        date.getUTCDate() === day
    );

}

export function hasDuplicateWords(value) {
    const pattern =  /\b(\w+)\s+\1\b/i;
    return pattern.test(value);
}

export function collapseTitleSpaces(value) {
    return value.replace(/ {2,}/g, " ");
}