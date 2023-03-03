import * as f from "./fun.js";

let num;


let arr = []; 

//This is to stop Sort function to repeat itself once it's in progress. For that I have used token passing method where token = 0 means no sorting is in progress where as token = 1 means sorting is in progress. Initially, no sorting is there, so token = 0
let token = 0;

let stopToken = 1;      //This was added for adding the stop function
document.getElementsByClassName("stop")[0].onclick = function(){
    if(token == 0){
        console.log("No Sorting in Progress");
    }
    else{
        stopToken = 1;
    }
}

document.getElementsByClassName("start")[0].onclick = function(){
    let temp_arr = f.start(token, stopToken, 0);
    if(temp_arr != -1){      //arr == -1 when sorting is already in progress else returns array
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

//stopToken = 1 means command is to stop, if stopped, inside for loop, it will break and stopToken will be turned back to 0 once new elements are filled(for that see the start onclick)

document.getElementsByClassName("sort")[0].onclick = async function(){
    if(token == 0){
        token = 1;
        f.State("Bubble Sort in Progress.", 0);
        let ele = document.getElementsByClassName("subele");
        //Bubble Sort begins
        for(let i=0;i<num-1;i++){
            for(let j=0;j<num-i-1;j++){
                // if any other algorithms is selected, pause and reset the current one
                if(f.main_algo_no != 1){
                    stopToken = 1;
                    token = 0;
                }
                //when we change pages, this will pause the execution of the current algo and moving onto the next algo, the first thing that we will press is the start button which will automatically remove the previous elements from .Ele

                if(!stopToken){     //if not paused
                    f.change(ele[j], ele[j+1]);
                    await f.sleep(f.speed);
                    if(arr[j]>arr[j+1]){
                        let temp = arr[j+1];
                        arr[j+1] = arr[j];
                        arr[j] = temp;
                        ele[j].style.height = `${arr[j]}%`;
                        ele[j+1].style.height = `${arr[j+1]}%`;
                        //updating the text element above subelement
                        f.update_p(value_in_p[j], value_in_p[j+1]);
                    }
                    f.change_back(ele[j], ele[j+1]);
                    await f.sleep(f.speed);
                }
                else{
                    break;
                }
            }
            if(stopToken){
                break;
            }
            if(i==num-2){
                ele[0].style.backgroundColor = "#131317";
            }
            ele[num-i-1].style.backgroundColor = "#131317";
            await f.sleep(f.speed);
        }
        if(stopToken){
            f.State("Stopped", 0);
        }
        else{
            f.State("Bubble Sort complete.", 0);
            console.log(arr);
        }
        token = 0;
    }
    else{
        console.log("Token not present.");
    }
}

