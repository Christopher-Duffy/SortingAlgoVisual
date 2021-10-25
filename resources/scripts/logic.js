class arrElement{
    constructor(value){
        this.num = value;
        this.cursor = false;
        this.inPlace = false;
    }
} 

var valuesToSort=[];

function doSort(){
    alert("I am now doing the sort");
}
function resetValues(){
    valuesToSort=[];
    var size=100;
    var max=100;
    for(var i=0;i<size;i++){
        valuesToSort.push(new arrElement(Math.floor(Math.random()*max)+1));
    }
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

function makeDivsFromArray(arr,width,height){
    arr.forEach(element => {
        document.getElementById("visualizer").append(makeElement(width,height*element.num/100));
    });
}

function makeElement(width,height){
    var div = document.createElement("div");
    div.style.width=width+"px";
    div.style.height=height+"px";
    div.classList.add("element");
    return div;
}
function step(){
    //do thing to loop
    valuesToSort=shuffle(valuesToSort);
    //wait
    renderValues();
    setTimeout(step, 100);
}

function shuffle(arr){
    var currentIndex = arr.length-1, randomIndex;
    while (currentIndex >=0){
        randomIndex= Math.floor(Math.random()*arr.length);
        arr = swap(arr,currentIndex,randomIndex)
        currentIndex--;
    }
    return arr;
}

function swap(arr,i1,i2){
    var temp = arr[i1]
    arr[i1]=arr[i2];
    arr[i2]=temp;
    return arr;
}
//make a graphics loop
//have cursors on values
//have value change