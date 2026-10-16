export function compileRegex(value, ignoreCase = true) {
    if (value === "") return null;
    return new RegExp(value, ignoreCase ? "i" : "");
}

// Build text and mark elements instead of inserting HTML strings.
export function highlightMatch(element, text, pattern) {
    element.textContent = "";
    if (!pattern) {
        element.textContent = text;
        return;
    }
    const matches = new RegExp(pattern.source, pattern.flags + "g");
    let position = 0;
    for (const match of text.matchAll(matches)) {
        // Patterns such as ^ can match an empty string; do not mark those.
        if (match[0] === "") continue;
        element.append(text.slice(position, match.index));
        const mark = document.createElement("mark");
        mark.textContent = match[0];
        element.append(mark);
        position = match.index + match[0].length;
    }
    element.append(text.slice(position));
}
