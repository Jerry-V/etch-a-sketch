// reference site for creating a grid layout:
// https://www.w3schools.com/css/css_grid.asp
// grid layout cheatsheets
// https://grid.malven.co/
// https://chriskonings.com/side/grid-cheat-sheet/
// grid tutorials
// https://cssgridgarden.com/

let container = document.querySelector('#container');
let cell = document.createElement('div');
cell.classList.add('default-cell', 'cell-item');

function refreshGrid(width,gridDiv){
    // clears the grid of any previous child nodes
    // https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
    gridDiv.textContent = '';
    // console.log('cells removed');
    
    // populates grid fully and keeps it a square
    let nCells = width * width;
    gridDiv.style='grid-template-columns: repeat('+width+',1fr);';

    for (i=0; i<nCells; i++){
        // without cloneNode set to true to add multiple elements
        // https://javascript.tutorialink.com/how-to-appendchildelement-many-times-the-same-element/
        gridDiv.appendChild(cell.cloneNode(true));
        // console.log('cells added');
    }
    
    // add eventListener to multiple items so each cell can change color
    // https://bobbyhadz.com/blog/javascript-add-event-listener-to-all-elements-with-class
    // Needs to be inside this function or it is not always called
    const allCells = document.querySelectorAll('.cell-item');
    allCells.forEach(item => { item.addEventListener('mouseover', randColor)})
}

function randColor(e) {
    let colorRange = 256;
    let a = Math.floor(Math.random()*colorRange);
    let b = Math.floor(Math.random()*colorRange);
    let c = Math.floor(Math.random()*colorRange);
    e.target.style.backgroundColor='rgb('+a+','+b+','+c+')';
    console.log('rand color applied');
}

function buttonRefresh(){
    let message = prompt('Enter a number from 1 to 100:');
    
    console.log('Inputted Value: '+message);
    if (!isNaN(message) && message > 0 && message <= 100){
        // console.log('is a number');
        refreshGrid(message,container);        
    } else {
        // console.log('not a number');
    }
}

// Default generation of grid
refreshGrid(16,container);