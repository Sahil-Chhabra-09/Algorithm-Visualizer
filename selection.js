import * as f from "./fun.js";

let num;

let token = 0;

let arr = [];

let stopToken = 0;

document.getElementsByClassName("stop")[1].onclick = function(){
    if(token == 0){
        console.log("No Sorting in Progress");
    }
    else{
        stopToken = 1;
    }
}

document.getElementsByClassName("start")[1].onclick = function(){
    let temp_arr = f.start(token, stopToken, 1);
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

document.getElementsByClassName("sort")[1].onclick = async function(){
    if(token == 0){
        token = 1;
        f.State("Selection Sort in Progress.", 1);
        let ele = document.getElementsByClassName("subele");
        for(let i=0;i<num-1;i++){
            let min_ind = i;
            changeToRed(value_in_p[min_ind]);
            for(let j=i+1;j<num;j++){
                if(f.main_algo_no!=2){
                    stopToken = 1;
                    token = 0;
                }
                if(!stopToken){     //if not paused
                    f.change(ele[j], ele[min_ind]);
                    let old_min_ind = min_ind;
                    await f.sleep(f.speed);
                    if(arr[j]<arr[min_ind]){
                        changeBackFromRed(value_in_p[min_ind]);
                        min_ind = j;
                        changeToRed(value_in_p[min_ind]);
                    }
                    f.change_back(ele[j], ele[old_min_ind]);
                    await f.sleep(f.speed);
                }
                else{
                    break;
                }
            }
            if(stopToken){
                break;
            }
            changeBackFromRed(value_in_p[min_ind]);
            let temp = arr[i];
            arr[i] = arr[min_ind];
            arr[min_ind] = temp;
            ele[min_ind].style.height = `${arr[min_ind]}%`;
            ele[i].style.height = `${arr[i]}%`;
            //updating the text element above subelement
            f.update_p(value_in_p[min_ind], value_in_p[i]);
            ele[i].style.backgroundColor = "#131317";
            await f.sleep(f.speed);
            if(i==num-2){
                ele[num-1].style.backgroundColor = "#131317";
            }
        }
        if(stopToken){
            f.State("Stopped", 1);
        }
        else{
            f.State("Selection Sort complete.", 1);
            console.log(arr);
        }
        token = 0;
    }
    else{
        console.log("Token not present.");
    }
}
