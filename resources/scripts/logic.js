var valuesToSort=[];

function doSort(){
    alert("I am now doing the sort");
}
function resetSort(){
    valuesToSort=makeRandomArray(100);
}

function makeRandomArray(size){
    var arr=[];
    for (var i=0; i<size; i++){
        arr.push(Math.floor(Math.random()*100));
    }
    return arr;
}