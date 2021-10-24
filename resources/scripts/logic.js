var valuesToSort=[];

function doSort(){
    alert("I am now doing the sort");
}
function resetValues(){
    valuesToSort=makeRandomArray(100);
}

function renderValues(){
    var visualizer = document.getElementById("visualizer");
    var width= visualizer.clientWidth / valuesToSort.length;
    var height = visualizer.clientHeight;
    deleteElementDivs();
    makeDivsFromArray(valuesToSort, width, height);
}

function deleteElementDivs(){
   var divs= document.getElementsByClassName("element");
   while(divs[0]){
       divs[0].parentNode.removeChild(divs[0]);
   }
}

function makeRandomArray(size){
    var arr=[];
    for (var i=0; i<size; i++){
        arr.push(Math.floor(Math.random()*100));
    }
    return arr;
}

function makeDivsFromArray(arr,width,height){
    arr.forEach(element => {
        document.getElementById("visualizer").append(makeElement(width,height*element/100));
    });
}

function makeElement(width,height){
    var div = document.createElement("div");
    div.style.width=width+"px";
    div.style.height=height+"px";
    div.classList.add("element");
    return div;
}