/**
 * @type HTMLCanvasElement
 */
const canvas = document.getElementById("canvas");
const guide = document.getElementById("guide");
const colorInput = document.getElementById("colorInput");
const clearButton = document.getElementById("clearButton");
const toggleGuide = document.getElementById("toggleGuide");
const drawingContext = canvas.getContext("2d");

const CELL_SIDE_COUNT = 5;
const cellPixelLength = canvas.width / CELL_SIDE_COUNT;
const colorHistory = {};


//Set default color
colorInput.value = "#009578";

//Initialize the canvas background
drawingContext.fillStyle = "#ffffff";
drawingContext.fillRect(0,0, canvas.width, canvas.height);

// Setup the guide 
{
   guide.style.width = `${canvas.width}px`;
   guide.style.height = `${canvas.height}px`;
   guide.style.gridTemplateColumns = `repeat(${CELL_SIDE_COUNT}, 1fr)`;
   guide.style.gridTemplateRows = `repeat(${CELL_SIDE_COUNT}, 1fr)`;

   [...Array(CELL_SIDE_COUNT ** 2)].forEach(()=> guide.insertAdjacentHTML("beforeend", "<div></div>"))
}



function handleCanvasMousedown(e){
   // Ensure user is using their primary mouse button 
   if(e.button !== 0){
    return;
   }

   const canvasBoundingRect = canvas.getBoundingClientRect();
   const x =  e.clientX - canvasBoundingRect.left;
   const y =  e.clientY - canvasBoundingRect.top;
   //calculate the L of whole number

   const cellX = Math.floor(x / cellPixelLength);
   const cellY = Math.floor(y / cellPixelLength);
   const currentcolor = colorHistory[`${cellX}_${cellY}`];

   if(e.ctrlKey){
      if(currentcolor){
         colorInput.value = currentcolor;
      }
   } else {
      fillCell(cellX, cellY);
   }
   
}

function handleClearButtonClick(){
   const yes = confirm("Are you sure you wish to clear the canvas?");

   if(!yes) return;

   drawingContext.fillStyle = "#ffffff";
   
   drawingContext.fillRect(0,0, canvas.width, canvas.height);
}

function handleToggleGuideChange(){
   guide.style.display = toggleGuide.checked ? null : "none";
}

function fillCell(cellX, cellY){
  const startX = cellX * cellPixelLength;
  const startY = cellY * cellPixelLength;

 drawingContext.fillStyle = colorInput.value;
 drawingContext.fillRect(startX , startY,  cellPixelLength, cellPixelLength);
 colorHistory[`${cellX}_${cellY}`] = colorInput.value
}


canvas.addEventListener("mousedown", handleCanvasMousedown);
clearButton.addEventListener("click", handleClearButtonClick);
toggleGuide.addEventListener("change", handleToggleGuideChange);