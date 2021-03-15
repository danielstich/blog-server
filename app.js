let header1 = document.getElementById("header1");

let string = header1.innerText;
let length = string.length;
let i = 1;

console.log("hello world")

setInterval(function() {
    i = i % length + 1;
    if (i > length) i = 1;
    header1.innerText = string.substring(0, i) + ((i % 2 == 0 || i % 3 == 0) ? "_" : "");
    header1.style.display = "inline";
}, 250)

