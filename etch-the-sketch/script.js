/* eslint-disable no-undef */
/* eslint-disable space-before-function-paren */
// @ts-check

setupEventHandler();

/* Event handlers */

function setupEventHandler() {
    const gridCells = fetchGridCells();
    gridCells.forEach(gridCell => gridCell.addEventListener('mouseover', handleHoverEventOnGrid));
    const reset = document.querySelector('button');
    if (reset) {
        reset.addEventListener('click', resetEvtHandler);
    }
}

function handleHoverEventOnGrid(/** @type {Event} */ evt) {
    const computedStyle = getComputedStyle(this);
    let rgb = parseRGBString(computedStyle.getPropertyValue('background-color'));
    rgb = rgb.map(color => Math.round(color * 0.9));
    const rgbString = generateRGBString(rgb);
    this.style['background-color'] = rgbString;
}

/**
 * @param {Event} evt
 */
function resetEvtHandler(evt) {
    const gridCells = fetchGridCells();
    gridCells.forEach(gridCell => gridCell.removeAttribute('style'));
}

/* helper functions */

function parseRGBString(/** @type {String} */ str) {
    str = str.split('(')[1];
    const strSplitMid = str.split(')')[0];
    const arr = strSplitMid.split(',');
    return arr.map(item => Number(item.trim()));
}

function generateRGBString(/** @type {number[]} */ colorArr) {
    return `rgb(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]})`;
}

function fetchGridCells() {
    const gridCells = document.querySelectorAll('.grid-cell');
    if (!gridCells) {
        throw new Error('Grid cells not found');
    }
    return gridCells;
}