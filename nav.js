let visible = false;
let nav_bar = document.querySelector(".nav_bar").style;
let button = document.querySelector(".nav").style;

document.querySelector(".nav").onclick = function(){
    if(!visible){
        nav_bar.left = "0px";
        button.left = "304px";
        button.transform = "rotate(180deg)";
        visible = true;
    }
    else{
        nav_bar.left = "-304px";
        button.left = "0px";
        button.transform = "rotate(360deg)";
        visible = false;
    }
}