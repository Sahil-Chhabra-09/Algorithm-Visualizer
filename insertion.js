import * as f from "./fun.js";

let num;

let token = 0;

let arr = [];

let stopToken = 0;

document.getElementsByClassName("stop")[2].onclick = function(){
    if(token == 0){
        console.log("No Sorting in Progress");
    }
    else{
        stopToken = 1;
    }
}

document.getElementsByClassName("start")[2].onclick = function(){
    let temp_arr = f.start(token, stopToken, 2);
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

function change_back(a, b){
    a.style.backgroundColor = "#131317";
    b.style.backgroundColor = "#131317";
    a.style.borderColor = "#d7ddea";
    b.style.borderColor = "#d7ddea";
}

document.getElementsByClassName("sort")[2].onclick = async function(){
    if(token == 0){
        token = 1;
        f.State("Insertion Sort in Progress.", 2);
        let ele = document.getElementsByClassName("subele");
        for(let i=1;i<num;i++){
            let key_ind = i;
            changeToRed(value_in_p[key_ind]);
            let noswap = false;
            for(let j=i-1;j>=0;j--){
                if(f.main_algo_no!=3){
                    stopToken = 1;
                    token = 0;
                }
                if(noswap){
                    break;
                }
                if(!stopToken){     //if not paused
                    f.change(ele[j], ele[key_ind]);
                    let old_min_ind = key_ind;
                    await f.sleep(f.speed);
                    if(arr[j]>arr[key_ind]){
                        let temp = arr[j];
                        arr[j] = arr[key_ind];
                        arr[key_ind] = temp;
                        ele[key_ind].style.height = `${arr[key_ind]}%`;
                        ele[j].style.height = `${arr[j]}%`;
                        //updating the text element above subelement
                        f.update_p(value_in_p[key_ind], value_in_p[j]);
                        changeBackFromRed(value_in_p[key_ind]);
                        key_ind = j;
                        changeToRed(value_in_p[key_ind]);
                    }
                    else{
                        noswap = true;
                    }
                    change_back(ele[j], ele[old_min_ind]);
                    await f.sleep(f.speed);
                }
                else{
                    break;
                }
            }
            if(stopToken){
                break;
            }
            changeBackFromRed(value_in_p[key_ind]);
            
            ele[i].style.backgroundColor = "#131317";
            await f.sleep(f.speed);
        }
        if(stopToken){
            f.State("Stopped", 1);
        }
        else{
            f.State("Insertion Sort complete.", 2);
            console.log(arr);
        }
        token = 0;
    }
    else{
        console.log("Token not present.");
    }
}