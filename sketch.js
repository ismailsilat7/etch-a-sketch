let gridRow = 16;
let gridCol = 16;
let sketchMode = 'classic';
let sketchColor = 'black';
const colorPicker = document.querySelector('.c-picker');
let darkIntensity = 0.1;
colorPicker.addEventListener('input', (e) => {
  sketchColor = e.target.value;
});
const sizeInput = document.querySelector('#size');
const submit = document.querySelector('.submit');

let gridInitialized = false; // Variable to track if the grid has been initialized

submit.addEventListener('click', (e) => {
  e.preventDefault();
  const sizeValue = parseInt(sizeInput.value);
  if (sizeValue < 1 || sizeValue > 60 || isNaN(sizeValue)) {
    alert("*Value is out of range (1-60)*");
    sizeInput.value = "";
  } else {
    if (!gridInitialized) {
      clearGrid(); // Clear the previous grid if it exists
      console.log("Clearing grid...");
      gridInitialized = true; // Set the gridInitialized variable to true
    }
    makeGrid(sizeValue, sizeValue);
    gridInitialized = false; // Set the gridInitialized variable to true
  }
});

function makeGrid(gridRow,gridCol) {
  const gridContainer = document.querySelector('.gridContainer');
  for (let row = 0; row < gridRow; row ++) {
    for (let col = 0; col < gridCol; col ++) {
      const box = document.createElement('div');
      box.classList.add('box');
      gridContainer.appendChild(box);
      box.style.width = `calc(100%/${gridRow})`;
      box.style.height = `calc(100%/${gridCol})`;

      box.addEventListener('mouseover', () => {
        switch (sketchMode) {
          case 'classic':
            box.style.backgroundColor = sketchColor;
            break;
          case 'rainbow':
            box.style.backgroundColor = randomColor();
            break;
          case 'eraser' :
            box.style.backgroundColor = 'white';
            break;
          case 'darken' :
            box.style.backgroundColor = darken(darkIntensity);
            if (darkIntensity <= 1) {
              darkIntensity = darkIntensity + 0.1;
            }
            break;
          default:
            box.style.backgroundColor = 'black';
        }
      })
    }
  }
}

function darken(darkIntensity) {
  const darkScale = 255*darkIntensity
  return `rgb(${255 - darkScale}, ${255 - darkScale}, ${255 - darkScale})`;
}

function randomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
}

function clearGrid() {
  const gridContainer = document.querySelector('.gridContainer');
  gridContainer.innerHTML = ''; // Remove all child elements (boxes)
}

// Initially create the grid
makeGrid(gridRow, gridCol);