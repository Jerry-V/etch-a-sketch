
// reference site for creating a grid layout:
// https://www.w3schools.com/css/css_grid.asp
const body = document.body;
let container = document.querySelector('#container');
container.style = 'width: 500px; height: 500px;';
//container.style = 'display: inline-grid; gap: 50px 50px;'
container.style.backgroundColor = 'white';
container.style.border = 'solid black 5px';

let cell = document.createElement('div');
cell.className='cell-item';
cell.textContent='123';
cell.style = 'width: 100px; height: 100px; display: flex; justify-content: center; align-items: center;';
cell.style.backgroundColor='lightgrey';
cell.style.border = 'solid 5px grey';
cell.style.borderRadius = '5px';

let nCells = 20;

// without cloneNode set to true to add multiple elements
// https://javascript.tutorialink.com/how-to-appendchildelement-many-times-the-same-element/
container.appendChild(cell.cloneNode(true));
container.appendChild(cell.cloneNode(true));

// add eventListener to multiple items
// https://bobbyhadz.com/blog/javascript-add-event-listener-to-all-elements-with-class
const allCells = document.querySelectorAll('.cell-item');
allCells.forEach(item => { item.addEventListener('mouseleave', randColor)})

function randColor(e) {
    let colorRange = 256;
    let a = Math.floor(Math.random()*colorRange);
    let b = Math.floor(Math.random()*colorRange);
    let c = Math.floor(Math.random()*colorRange);
    e.target.style.backgroundColor='rgb('+a+','+b+','+c+')';
}