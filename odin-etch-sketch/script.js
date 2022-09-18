/* eslint-disable no-undef */
/* eslint linebreak-style:["error", "windows"] */
/* */
const INIT_CELLS_PER_ROW = 4;
let noOfCellsPerRow = 0;

function setupCells(n) {
  const container = document.querySelector(".grid-container");
  container.style.gridTemplateColumns = `repeat(${n}, 60px)`;
  container.style.gridTemplateRows = `repeat(${n}, 60px)`;

  for (let i = 1; i <= n * n; i += 1) {
    const cell = document.createElement("div");
    cell.className = "grid-cell";
    cell.id = `cell${i}`;
    cell.innerHTML = i;
    container.appendChild(cell);
  }
  noOfCellsPerRow = n;
}

function setupCellsEvtHandler() {
  const cells = document.querySelectorAll(".grid-cell");
  cells.forEach((cell) => {
    cell.addEventListener("mouseenter", () => {
      r = Math.random() * 255;
      g = Math.random() * 255;
      b = Math.random() * 255;
      cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    });
  });
}

function destroyCanvas() {
  for (let i = 1; i <= noOfCellsPerRow ** 2; i += 1) {
    const cell = document.querySelector(`#cell${i}`);
    cell.remove();
  }
}

function resetCanvas(newSize) {
  destroyCanvas();
  setupCells(newSize);
  setupCellsEvtHandler();
}

function setupBtnEvtHandler() {
  document.querySelector(".button").addEventListener("click", () => {
    let n = prompt("Enter a number between 0 and 20", "4");
    n = Number(n);
    if (n >= 100 || Number.isNaN(n)) {
      n = 4;
    }
    resetCanvas(n);
  });
}

function setupEvtHandlers() {
  setupCellsEvtHandler();
  setupBtnEvtHandler();
}

function setupCanvas() {
  setupCells(INIT_CELLS_PER_ROW);
}
setupCanvas();
setupEvtHandlers();
