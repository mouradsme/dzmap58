export function addStyle(CSS) {
    const $style = document.createElement("style");
    document.head.appendChild($style);
    $style.innerHTML = CSS
}