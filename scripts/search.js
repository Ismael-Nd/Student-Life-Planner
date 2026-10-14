export function compileRegex(value, ignoreCase = true) {
    return new RegExp(value, ignoreCase ? "i" : "");
}

export function highlightMatch(element, text, pattern) {
    element.textContent = "";

    const match = pattern.exec(text);

    if (!match || match[0] === "") {
        element.textContent = text;
        return;
    }

    const before = text.slice(0, match.index);
    const after = text.slice(match.index + match[0].length);

    const mark = document.createElement("mark");
    mark.textContent = match[0];

    element.append(before, mark, after);
}
