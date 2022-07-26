// reference site for creating a grid layout:
// https://www.w3schools.com/css/css_grid.asp
// grid layout cheatsheets
// https://grid.malven.co/
// https://chriskonings.com/side/grid-cheat-sheet/
// grid tutorials (probably the most helpful since it is interactive practice)
// https://cssgridgarden.com/

// grab the div that all the grid-cells will be shoved into
let container = document.querySelector('#container');
// create the intial cell element and add additional properties to it below
let cell = document.createElement('div');

// how to store a value inside an html tag (use "dataset" to create a custom "data-*" thing)
// https://stackoverflow.com/questions/11286661/set-custom-attribute-using-javascript
// how many times the cell has been colorized
cell.dataset.colorCount = '0';

// create data attributes to store the intialy applied rgb value
cell.dataset.initRed = '0';
cell.dataset.initGreen = '0';
cell.dataset.initBlue = '0';

// these two classes could be condensed into one, but eh... it works
cell.classList.add('default-cell', 'cell-item');

function refreshGrid(width,gridDiv){
    // clears the grid of any previous child nodes
    // https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
    gridDiv.textContent = '';

    // create enough elements and columns for a fully populated square grid
    let nCells = width * width;
    gridDiv.style='grid-template-columns: repeat('+width+',1fr);';

    for (i=0; i<nCells; i++){
        // need to use "cloneNode" as "appendChild" does not properly populate the grid
        // cloneNode() works being set to "true" or "false", I suspect it is because
        // it will clone the cell element either way, true just enables a "deep clone" where
        // all of "cell's" child nodes would be copied too, but it has no children so it 
        // doesn't matter if set to "true" or "false"
        // https://javascript.tutorialink.com/how-to-appendchildelement-many-times-the-same-element/
        gridDiv.appendChild(cell.cloneNode());
    }
    
    // add eventListener to multiple items so each cell can change color
    // https://bobbyhadz.com/blog/javascript-add-event-listener-to-all-elements-with-class
    // the below code needs to be inside the function "refreshGrid" so it is always executed
    const allCells = document.querySelectorAll('.cell-item');
    allCells.forEach(item => { item.addEventListener('mouseover', randColor)})
}

function randColor(e) {
    // how to grab a "data-*" value
    // https://stackoverflow.com/questions/33760520/how-can-i-get-the-values-of-data-attributes-in-javascript-code
    let colorCount = e.target.dataset.colorCount;

    // how many ADDITIONAL colorations until the cell turns pure black
    // default was 10
    let colorationsTillBlack = 10;
    let cTBRatio = 1/colorationsTillBlack;
    
    // colorizes cell on intial iteration
    if (colorCount == 0) {
        // create and apply initial random rgb value
        let colorRange = 256;
        let red = Math.floor(Math.random()*colorRange);
        let green = Math.floor(Math.random()*colorRange);
        let blue = Math.floor(Math.random()*colorRange);
        e.target.style.backgroundColor='rgb('+red+','+green+','+blue+')';
        // save the intial rgb values for future reference
        e.target.dataset.initRed = red;
        e.target.dataset.initGreen = green;
        e.target.dataset.initBlue = blue;
        // increment the number of times the div was colorized
        e.target.dataset.colorCount++;               
    } 
    // linearly blacken the cell until purely black
    else if (colorCount <= colorationsTillBlack) {
        // grab initial rgb coloration
        let red = e.target.dataset.initRed;
        let green = e.target.dataset.initGreen;
        let blue = e.target.dataset.initBlue;
        // darken the grabbed initial rgb according to the current coloration iteration
        // in other words: by default blacken the cell by another 10%
        red = red - (red*(colorCount * cTBRatio));
        green = green - (green*(colorCount * cTBRatio));
        blue = blue - (blue*(colorCount * cTBRatio));
        // update the current rgb colorization with the darkened RGB values
        e.target.style.backgroundColor='rgb('+red+','+green+','+blue+')';
        // increment the number of times the cell has been colored
        e.target.dataset.colorCount++;
    }
}

function buttonRefresh(){
    let minGridSize = 1;
    let maxGridSize = 100;
    
    let message = prompt('Enter a number from 1 to 100:');
    
    console.log('Inputted Value: '+message);
    // filter out non-positive-integer values too big or too small (filters text too :D)
    if (!isNaN(message) && message >= minGridSize && message <= maxGridSize){
        // rounding down "message" is required or the grid will not populate correctly
        message = Math.floor(message);
        refreshGrid(message,container);
        container.dataset.currentSize = message;
    }
}

// reset the grid according to the current size
function buttonReset(){
    refreshGrid(container.dataset.currentSize,container);
}

// Default generation of grid
let defaultWidth = 16;
container.dataset.currentSize = defaultWidth;
refreshGrid(defaultWidth,container);