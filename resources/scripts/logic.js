//these could be a variable
var SIZE=100;
var MAX = 100;

class sortGraphDiv{
    constructor(wrapperDivId){
        this.valuesToSort=[];
        this.wrapperDiv=document.getElementById(wrapperDivId);
        this.elementWidth = this.wrapperDiv.clientWidth/SIZE;
        this.wrapperHeight = this.wrapperDiv.clientHeight;
        this.bubbleVars={i:0,unsorted:0};
        this.selectionVars={cursor:0,sorted:0,biggestI:0};
        this.tick=function(){};
        this.sorted=false;
    }
    
    init(){
        this.resetRandomValues();
        this.renderValues();
        this.sorted=false;
        this.resetBubbleVars();
        this.resetSelectionVars();
    }

    resetBubbleVars(){
        this.bubbleVars.i=0;
        this.bubbleVars.unsorted=SIZE;
    }

    resetSelectionVars(){
        this.selectionVars.cursor=0;
        this.selectionVars.sorted=0;
        this.selectionVars.biggestI=0;
    }

    doSort(sortName){
        switch (sortName){
            case "bubble":
                this.tick=this.bubbleSort;
                break;
            case "selection":
                this.tick=this.selectionSort;
                break;
        }
        this.loop();
    }

    resetRandomValues(){
        this.valuesToSort=[];
        for(var i=0;i<SIZE;i++){
            this.valuesToSort.push(new arrElement(Math.floor(Math.random()*MAX)+1));
        }
    }

    renderValues(){
        this.deleteElementDivs();
        this.makeDivsFromArray();
    }

    deleteElementDivs(){
        var divs= document.getElementsByClassName("arrayElementVisual");
        while(divs[0]){
            divs[0].parentNode.removeChild(divs[0]);
        }
     }
    //this needs to be retooled to use class variables instead of parameters 
    makeDivsFromArray(){
        this.valuesToSort.forEach(element => {
            var div = document.createElement("div");
            div.style.width=this.elementWidth+"px";
            div.style.height=this.wrapperHeight*element.num/100+"px";
            div.style.float="right";
            if (element.sorted){
                div.style.backgroundColor="green";
            }else if(element.cursor){
                div.style.backgroundColor="yellow";
            }else{
                div.style.backgroundColor="blue";
            }
            div.classList.add("arrayElementVisual");
            this.wrapperDiv.append(div);
        });
    }
     
    makeElement(width,height){
        var div = document.createElement("div");
        div.style.width=width+"px";
        div.style.height=height+"px";
        div.style.float="right";
        

        div.classList.add("arrayElementVisual");
        return div;
    }

    swap(i1,i2){
        var temp = this.valuesToSort[i1];
        this.valuesToSort[i1]=this.valuesToSort[i2];
        this.valuesToSort[i2]=temp;
    }

    shuffle(){
        var currentIndex = this.valuesToSort.length-1;
        var randomIndex = 0;
        while (currentIndex >=0){
            randomIndex = Math.floor(Math.random()*this.valuesToSort.length);
            this.swap(currentIndex,randomIndex)
            currentIndex--;
        }
    }

    loop(){
        this.tick();
        this.renderValues();
        if(!this.sorted){
            setTimeout( () =>{this.loop();},5);
        }
    }

    bubbleSort(){
        var i = this.bubbleVars.i;
        var unsorted = this.bubbleVars.unsorted;
        if (unsorted>0){
            if(i>unsorted-2){
                this.valuesToSort[i].sorted=true;
                if(i>0){
                    this.valuesToSort[i-1].cursor=false;
                }
                i = 0;
                unsorted--;
            }else{
                if (i>0){
                    this.valuesToSort[i-1].cursor=false;
                }
                this.valuesToSort[i].cursor=true;
                this.valuesToSort[i+1].cursor=true;
                if(this.valuesToSort[i].num>this.valuesToSort[i+1].num){
                    this.swap(i,i+1);
                }
                i++;
            }
        }else{
            this.sorted=true;
        }
        this.bubbleVars.i=i;
        this.bubbleVars.unsorted=unsorted;
    }
    selectionSort(){
        var i = this.selectionVars.cursor;
        var sorted = this.selectionVars.sorted;
        var biggestI = this.selectionVars.biggestI;

        if(sorted<SIZE){
            if(i<SIZE){
                this.valuesToSort[i].cursor=true;
                if(this.valuesToSort[i].num>this.valuesToSort[biggestI].num){
                    this.valuesToSort[biggestI].cursor=false;
                    biggestI = i;
                    this.valuesToSort[biggestI].cursor=true;
                }
                if (i>0 && biggestI!=(i-1)){
                    this.valuesToSort[i-1].cursor=false;
                }
                i++;
            }else{
                this.valuesToSort[i-1].cursor=false;
                var biggest = this.valuesToSort.splice(biggestI,1)[0];
                biggest.sorted=true;
                this.valuesToSort.unshift(biggest);
                sorted++;
                i=sorted;
                biggestI=sorted;
            }
        }else{
           this.sorted = true; 
        }

        this.selectionVars.cursor = i;
        this.selectionVars.sorted = sorted;
        this.selectionVars.biggestI=biggestI;
    }
}

class arrElement{
    constructor(value){
        this.num = value;
        this.sorted = false;
        this.cursor = false;
    }
} 

var chart = new sortGraphDiv("visualizer");
chart.init();

function doSort(){
    var sortName = document.getElementById("algo").value;                  
    chart.doSort(sortName); 
}

function resetSort(){
    chart.init();
}
// Selection Sort
// Bubble Sort
// Insertion Sort
// Merge Sort
// Quick Sort
// Heap Sort
// Counting Sort
// Radix Sort
// Bucket Sort