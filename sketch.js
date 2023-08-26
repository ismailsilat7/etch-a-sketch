let gridRow = 16;
let gridCol = 16;
let sketchMode = 'classic';
let sketchColor = 'black';
const colorPicker = document.querySelector('.c-picker');
let darkIntensity = 0.1;
const sizeInput = document.querySelector('#size');
const submit = document.querySelector('.submit');
sizeInput.value = "16";
let gridInitialized = false; // Variable to track if the grid has been initialized

colorPicker.addEventListener('input', (e) => {
  sketchColor = e.target.value;
  colorPicker.style.boxShadow = `0px 0px 10px 5px ${hexToRgba(sketchColor, 0.2)}`;
  sketchMode = 'mix';
});

submit.addEventListener('click', (e) => {
  e.preventDefault();
  const sizeValue = parseInt(sizeInput.value);
  if (sizeValue < 1 || sizeValue > 60 || isNaN(sizeValue)) {
    alert("*Value is out of range (1-60)*");
    sizeInput.value = "";
  } else {
    if (!gridInitialized) {
      clearGridForNewSize(); // Clear the previous grid if it exists
      gridInitialized = true; // Set the gridInitialized variable to true
    }
    gridRow = sizeValue;
    gridCol = sizeValue;
    makeGrid(sizeValue, sizeValue);
    gridInitialized = false; // Set the gridInitialized variable to true
    const dimensions = document.querySelector('.dimensions')
    dimensions.textContent=`(${sizeValue}x${sizeValue})`
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
            box.style.backgroundColor = 'black';
            colorPicker.value = 'black';
            colorPicker.style.boxShadow = `0px 0px 10px 5px ${hexToRgba('#000000', 0.2)}`;
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
            box.style.backgroundColor = sketchColor;
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
  const boxes = document.querySelectorAll('.box');
  boxes.forEach((box) => {
    box.style.backgroundColor = 'white';
  });
}

function clearGridForNewSize() {
  const gridContainer = document.querySelector('.gridContainer');
  gridContainer.innerHTML = ''; // Remove all child elements (boxes)
}

function hexToRgba(hex, alpha) {
  // Remove the '#' symbol if it exists
  hex = hex.replace('#', '');

  // Parse the hexadecimal values for R, G, and B
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4, 6), 16);

  // Create the RGBA color string
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function scrollToSize() {
  const target = document.getElementById('form-container');
  target.scrollIntoView();
}

function scrollToSketch() {
  const target = document.getElementById('sketch-section');
  target.scrollIntoView();
}

// Initially create the grid
makeGrid(gridRow, gridCol);