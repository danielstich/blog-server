let inlineScroll = document.getElementById("inlineScroll");
let pause = document.getElementById("pause");
let play = document.getElementById("play");


let string = inlineScroll.innerText;
let length = string.length;
let i = 1;
let paused = false;

play.addEventListener('click', e => {
    paused = false;
    play.style.display = 'none';
    pause.style.display = 'block';
    console.log("play")
})

pause.addEventListener('click', e => {
    paused = true;
    play.style.display = 'block';
    pause.style.display = 'none';
    console.log("pause")
})

console.log("hello world")

setInterval(function() {
    
    if (!paused) {
        i = i % length + 1;
    }
    else {
        i = i;
    }
    
    if (i > length) i = 1;
    inlineScroll.innerText = string.substring(0, i) + ((i % 2 == 0 || i % 3 == 0) ? "_" : "");
    inlineScroll.style.display = "inline";

    

}, 250)

const playText = e => {

}

const pauseText = e => {

}

let hideBar = document.getElementById("hideBar");
let header = document.getElementById("header");
let container = document.getElementById("container")

hideBar.addEventListener("click", e => {
    header.style.display = 'none';
    container.style.height = '100vh'
})


let navbar = document.getElementById("navbar")
let mainHeader = document.getElementById("mainHeader")

navbar.addEventListener("click", e => {
    let listItems = document.getElementsByTagName('li');
    let sections = document.getElementsByTagName('section');
    
    let page = e.target.getAttribute('Page')
    console.log(sections[page]);
    mainHeader.innerText = page;


    for (let section of sections) {
        if (page != section.id) {
            section.style.display = 'none';
        }
        else {
            section.style.display = 'flex';
        }
    }
    
})

