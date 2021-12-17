//these could be a variable
var SIZE=100;
var MAX = 100;
SPEED = 5;

class sortGraphDiv{
    constructor(wrapperDivId){
        this.valuesToSort=[];
        this.wrapperDiv=document.getElementById(wrapperDivId);
        this.elementWidth = this.wrapperDiv.clientWidth/SIZE;
        this.wrapperHeight = this.wrapperDiv.clientHeight;
        this.bubbleVars={i:0,unsorted:0};
        this.selectionVars={cursor:0,sorted:0,biggestI:0};
        this.quickVars={i:0,j:0,partitions:[]};
        this.tick=function(){};
        this.sorted=false;
        this.swaps=0;
        this.comparisons=0;
    }
    
    init(){
        this.resetRandomValues();
        this.swaps=0;
        this.comparisons=0;
        this.renderValues();
        this.sorted=false;
        this.resetBubbleVars();
        this.resetSelectionVars();
        this.resetQuickVars();
        
        this.comparisons=0;
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

    resetQuickVars(){
        this.quickVars.partitions=[];
        this.quickVars.partitions.push(new PartitionInstance(0,SIZE-1));
        this.quickVars.i = 0;
        this.quickVars.j = -1;
    }

    doSort(sortName){
        switch (sortName){
            case "bubble":
                this.tick=this.bubbleSort;
                break;
            case "selection":
                this.tick=this.selectionSort;
                break;
            case "quick":
                this.tick=this.quickSort;
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
        this.showSwapCounter();
        this.showComparisonCounter();
    }

    showSwapCounter(){
        document.getElementById("swapCounter").innerText="Swaps : "+this.swaps;
    }

    showComparisonCounter(){
        document.getElementById("comparisonCounter").innerText="Comparisons : "+this.comparisons;
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
            div.style.float="left";
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
        if(i1>=0 && i2>=0 && i1<SIZE && i2<SIZE){
            var temp = this.valuesToSort[i1];
            this.valuesToSort[i1]=this.valuesToSort[i2];
            this.valuesToSort[i2]=temp;
            this.swaps++;
        }else{
            console.log("Bad swap Value!");
        }
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
            setTimeout( () =>{this.loop();},SPEED);
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
                this.comparisons++;
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
                this.comparisons++;
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
                this.swaps++;
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

    quickSort(){
        if(this.quickVars.partitions.length==0){
            this.sorted = true;
        }
        else{
            var currentPartition = this.quickVars.partitions[0];
            var i = this.quickVars.i;
            var j = this.quickVars.j;
            var low = currentPartition.low;
            var high = currentPartition.high;
            var pivot = currentPartition.pivot;

            if(i<=high){
                this.comparisons++;
                if (this.valuesToSort[i].num<this.valuesToSort[pivot].num){
                    j++;
                    this.swap(i,j);
                }
                if (i>0){
                    this.valuesToSort[i-1].cursor=false;
                }
                this.valuesToSort[i].cursor=true;
                
                i++;
                
            }else{
                this.swap(j+1,pivot)
                this.valuesToSort[j+1].sorted=true;
                this.quickVars.partitions.shift();
                if(j+2<high){
                    this.quickVars.partitions.unshift(new PartitionInstance(j+2,high));
                }else{
                    if(j+2<SIZE){
                        this.valuesToSort[j+2].sorted=true;
                    }
                }
                if (j>low){
                    this.quickVars.partitions.unshift(new PartitionInstance(low, j));
                }else{
                    if (j>-1){
                        this.valuesToSort[j].sorted=true;
                    }
                }
                if (this.quickVars.partitions.length>0){
                    i = this.quickVars.partitions[0].low;
                    j  = this.quickVars.partitions[0].low-1;
                }
            }
            this.quickVars.i=i;
            this.quickVars.j=j;
        }
    }
}

class arrElement{
    constructor(value){
        this.num = value;
        this.sorted = false;
        this.cursor = false;
    }
} 

class PartitionInstance{
    constructor(low,high){
        this.low = low;
        this.high = high;
        this.pivot = high;
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