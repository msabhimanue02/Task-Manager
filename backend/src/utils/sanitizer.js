import sanitizeHtml from 'sanitize-html';
export function sanitizeInput(input) {
    return sanitizeHtml(input, { allowedTags: [], allowedAttributes: {} }).trim();
}
//# sourceMappingURL=sanitizer.js.map