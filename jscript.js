
let dimension = null; 
let body = document.querySelector("body"); 
let container = document.querySelector(".container");
let buttonHeight; 
let containerHeight; 

function highlight(e){
    e.target.style.transition = "none";
    e.target.style.backgroundColor = "hotpink";
}

function unhighlight(e){
    e.target.style.transition = "background-color 1s ease";
    setTimeout(() => {e.target.style.backgroundColor = ""}, 30);
}

function makeButton(){ 
    let button = document.createElement("div");
    button.textContent = "RESET GRID";
    button.style.fontFamily = '"Lucida Console", Monaco, monospace';
    button.style.fontSize = "30px";
    button.classList.add("button");
    button.addEventListener("click", resetGrid);
    body.insertBefore(button, container);
    buttonHeight = button.offsetHeight; 
    container.style.height = `calc(100vh - ${buttonHeight}px - 20px)`; 
    containerHeight = container.style.height; 
}

function takeInput(){
    let newDimension = +prompt("Dimension?", "16");
    while(newDimension<1 || newDimension >40){
        alert("Inappropriate dimension provided. Must be greater than 0 and less than 41.");
        newDimension = +prompt("Dimension?", "16");
    }
    if(dimension === newDimension){
        return; 
    }
    dimension = newDimension; 
}

function resetGrid(e){
    takeInput();
    container.innerHTML = "";
    
    for(let j=1;j<=dimension;j++){
        let rowContainer = document.createElement("div");
        rowContainer.classList.add(`row-${j}`);
    
        for(let i=1; i<=dimension;i++){
            let gridItem = document.createElement("div");
            gridItem.classList.add("grid-item");
            gridItem.style.width = `min(calc((${containerHeight} - ${dimension+1} * 5px) / ${dimension}), calc(100vw / ${dimension}))`;
            rowContainer.appendChild(gridItem);
        }
        container.appendChild(rowContainer);
    }

    const gridItems = document.querySelectorAll(".grid-item");
    gridItems.forEach(gridItem => {
        gridItem.addEventListener("mouseenter", highlight);
        gridItem.addEventListener("mouseleave", unhighlight);
    })

}

// when page is loaded, then prompt and make grid and reset button 
document.addEventListener("DOMContentLoaded", ()=>{ 
    makeButton();
    resetGrid();
});











