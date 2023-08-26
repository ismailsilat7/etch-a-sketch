let gridRow = 16;
let gridCol = 16;

let sketchColor = 'black'

const colorPicker = document.querySelector('.c-picker')
colorPicker.addEventListener('input', (color) => {
    sketchColor = color.target.value;
});


function makeGrid() {
  const gridContainer = document.querySelector('.gridContainer');
  for (let row = 0; row < gridRow; row ++) {
    for (let col = 0; col < gridCol; col ++) {
      const box = document.createElement('div');
      box.classList.add('box');
      gridContainer.appendChild(box);
      box.style.width = `calc(100%/${gridRow})`;
      box.style.height = `calc(100%/${gridCol})`;

      box.addEventListener('mouseover', () => {
        box.style.backgroundColor = sketchColor;
      })
    }
  }
}


makeGrid();