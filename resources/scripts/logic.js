//these could be a variable
var SIZE=100;
var MAX = 100;

class sortGraphDiv{
    constructor(wrapperDivId){
        this.valuesToSort=[];
        this.wrapperDiv=document.getElementById(wrapperDivId);
        this.elementWidth = this.wrapperDiv.clientWidth/SIZE;
        this.elementHeight = this.wrapperDiv.clientHeight;
    }
    
    init(){
        this.resetRandomValues();
        this.renderValues();
    }

    resetRandomValues(){
        this.valuesToSort=[];
        for(var i=0;i<SIZE;i++){
            this.valuesToSort.push(new arrElement(Math.floor(Math.random()*MAX)+1));
        }
    }

    renderValues(){
        this.deleteElementDivs();
        this.makeDivsFromArray(this.valuesToSort, this.elementWidth, this.elementHeight);
    }

    deleteElementDivs(){
        var divs= document.getElementsByClassName("arrayElementVisual");
        while(divs[0]){
            divs[0].parentNode.removeChild(divs[0]);
        }
     }
     
    makeDivsFromArray(arr,width,height){
        arr.forEach(element => {
            this.wrapperDiv.append(this.makeElement(width,height*element.num/100));

        });
    }
     
    makeElement(width,height){
        var div = document.createElement("div");
        div.style.width=width+"px";
        div.style.height=height+"px";
        div.style.backgroundColor="steelblue";
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

}

class arrElement{
    constructor(value){
        this.num = value;
        this.cursor = false;
        this.inPlace = false;
    }
} 

class sortingAlgo{
    constructor(){
        this.numSteps;
        this.currentStep;
        this.steps=[];
    }
}





function step(){
    //do thing to loop
    valuesToSort=shuffle(valuesToSort);
    //wait
    renderValues();
    setTimeout(step, 100);
}

//make a graphics loop
//have cursors on values
//have value change