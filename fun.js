export function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

//To update the element denoting Current State
export function State(a, algoNo){
    let para = document.getElementsByClassName("progress")[algoNo];
    para.innerHTML = `Current State: ${a}`;
}

//swapping the values of inner HTML which is at the upper portion of elements
export function update_p(a, b){
    let temp = a.innerHTML;
    a.innerHTML = b.innerHTML;
    b.innerHTML = temp;
}


export function start(token, stopToken, algoNo){ //eleNo tells which div with class name "ele"
    let arr = [];
    let parentDiv = document.getElementsByClassName("Ele")[algoNo];
    if(token == 0){     //if there is no sorting only then we will fill new elements else console.log("message")
        stopToken = 0;      //stopToken = 0 will mean that sorting is now allowed to continue once new elements are filled in.
        let num = document.getElementsByClassName("elements")[algoNo].value;
        console.log(num);
        popit(arr);    //clearing out array

        //filling new random elements in array
        for(let i=0;i<num;i++){
            let ele = Math.round(Math.random()*100);
            arr.push(ele);
        }
        arr.push(stopToken);
        console.log(arr);
        removeit();     //empty out the parent Div
        for(let i = 0;i<num;i++){       //fill in new elements in div
            var div = document.createElement("div");
            div.style.height = `${arr[i]}%`;
            div.className = "subele";
            parentDiv.appendChild(div);
            //Adding text elements inside created elements
            var para_ele = document.createElement("p");
            para_ele.className = "val";     //class of those text elements
            div.appendChild(para_ele);
            para_ele.innerHTML = `${arr[i]}`;
        }
        document.getElementsByClassName("no_of_ele")[algoNo].innerHTML = `Number of Elements: ${num}`;
        State("Elements filled.", algoNo);
        return arr;
    }
    else{
        return -1;
    }
}


//to remove all the elements already present inside div tag for placing the new ones.
export function removeit(){
    let ele = document.getElementsByClassName("subele");
    const len = ele.length;
    for(let i=0;i<len;i++){
        ele[0].remove();    // the error encountered was that i was removing the i'th element inside the for loop, but i forgot that elements get reordered after each removal.
    }
}

//to empty out the array
export function popit(arr){
    for(let i=0;i<arr.length;i++){
        arr.pop();
    }
}


//functions for changing colors of element in focus:
export function change(a, b){
    a.style.backgroundColor = "#d7ddea";
    b.style.backgroundColor = "#d7ddea";
    a.style.borderColor = "#2b2c3e";
    b.style.borderColor = "#2b2c3e";
}

//changing colors back to normal
export function change_back(a, b){
    a.style.backgroundColor = "#2b2c3e";
    b.style.backgroundColor = "#2b2c3e";
    a.style.borderColor = "#d7ddea";
    b.style.borderColor = "#d7ddea";
}

export let main_algo_no = 1;

export function algo_being_executed(){
    document.querySelector("#bubbleAlgo").onclick = () =>{
        speed = 500;
        uncheck(speedup[0]);
        main_algo_no = 1;
    }
    document.querySelector("#selectionAlgo").onclick = () =>{
        speed = 500;
        uncheck(speedup[1]);
        main_algo_no = 2;
    }
    document.querySelector("#insertionAlgo").onclick = () =>{
        speed = 500;
        uncheck(speedup[2]);
        main_algo_no = 3;
    }
    document.querySelector("#quickAlgo").onclick = () =>{
        speed = 500;
        uncheck(speedup[3]);
        main_algo_no = 4;
    }
    document.querySelector("#mergeAlgo").onclick = () =>{
        speed = 500;
        uncheck(speedup[4]);
        main_algo_no = 5;
    }
    document.querySelector("#countingAlgo").onclick = () =>{
        speed = 500;
        uncheck(speedup[5]);
        main_algo_no = 6;
    }
    document.querySelector("#radixAlgo").onclick = () =>{
        speed = 500;
        uncheck(speedup[6]);
        main_algo_no = 7;
    }
}

algo_being_executed();

//speed utility
export let speed = 500;
let speedup = document.getElementsByClassName("speedup");

function check_for_speed(ele){

    ele.onclick = () => {
        speed = ele.value;
        console.log(speed);
    }
}

function uncheck(ele){
    ele.checked = false;
}

for(let i=0;i<speedup.length;i++){
    check_for_speed(speedup[i]);
}