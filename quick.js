import * as f from "./fun.js";

let num;

let token = 0;

let arr = [];

let stopToken = 0;

document.getElementsByClassName("stop")[3].onclick = function(){
    if(token == 0){
        console.log("No Sorting in Progress");
    }
    else{
        stopToken = 1;
    }
}

document.getElementsByClassName("start")[3].onclick = function(){
    let temp_arr = f.start(token, stopToken, 3);
    if(temp_arr != -1){
        arr = temp_arr;
        num = arr.length -1;
        stopToken = arr[num];
        console.log("");
    }
    else{
        console.log("Sorting in progress.");
    }  
}

let value_in_p = document.getElementsByClassName("val");

function changeToRed(a){
    a.style.color = "red";
}

function changeBackFromRed(a){
    a.style.color = "#131317";
}

let ele = document.getElementsByClassName("subele");

const swap = (a, b) =>{
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
    ele[a].style.height = `${arr[a]}%`;
    ele[b].style.height = `${arr[b]}%`;
    f.update_p(value_in_p[a], value_in_p[b]);
}

const partition = async (low, high) =>{
    let piv = arr[high];
    await f.sleep(f.speed);
    changeToRed(value_in_p[high]);
    let i = (low-1);
    for(let j = low;j<high;j++){
        if(stopToken){
            return -1;
        }
        if(f.main_algo_no!=4){
            stopToken = 1;
            token = 0;
        }
        f.change(ele[j], ele[high]);
        await f.sleep(f.speed);
        if(arr[j]<=piv){
            i++;
            swap(i,j);
            value_in_p[i+1].style.color = "#00FF00";
            value_in_p[i].style.color = "#2b2c3e";
        }
        f.change_back(ele[j], ele[high]);
    }
    changeBackFromRed(value_in_p[high]);
    ele[i+1].style.backgroundColor = "#FFFF00";
    value_in_p[i+1].style.color = "#FFFF00"
    swap(i+1, high);
    return (i+1);
}

const quickSort = async (low, high) =>{
    if(stopToken){
        return;
    }
    if(low<high){
        let pi = await partition(low,high);
        if(pi == -1){
            return;
        }
        await quickSort(low, pi-1);
        await quickSort(pi+1, high);
    }
}

// f.update_p(value_in_p[min_ind], value_in_p[i]);
document.getElementsByClassName("sort")[3].onclick = async function(){
    if(f.main_algo_no!=4){
        window.alert("First click on the algo in the nav bar");
        stopToken = 1;
        token = 0;
    }
    else{
        if(token==1){
            console.log("Token not present.");
        }
        else{
            token = 1;
            f.State("Quick Sort in Progress", 3);
            await quickSort(0, num-1);
            if(stopToken){
                f.State("Stopped", 3);
            }
            else{
                f.State("Quick Sort complete", 3);
            }
            token = 0;
        }
    }
}
