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

// hideBar.addEventListener("click", e => {
//     header.style.display = 'none';
//     container.style.height = '100vh'
// })


let navbar = document.getElementById("navbar")
let mainHeader = document.getElementById("mainHeader")

navbar.addEventListener("click", e => {
    let listItems = document.getElementsByTagName('li');
    let sections = document.getElementsByTagName('section');

    for (let item of listItems) {
        if (e.target != item) {
            item.style.backgroundColor = "#45475f";
        }
        else {
            item.style.backgroundColor = "#182033";
        }
    }
    
    
    let page = e.target.getAttribute('Page')
    
    
    
    for (let section of sections) {
        if (page != section.id) {
            section.style.display = 'none';
        }
        else {
            section.style.display = 'flex';
            if (page == 'Blog') {
                renderBlog();
                section.style.display = 'grid';
            }
        }
    }

    
    
})


// BLOG SECTION //
// BLOG SECTION //
// BLOG SECTION //

let isTesting = true;
let uri = 'https://www.stich.pub/api/posts/';
if (isTesting) {
    uri = 'http://localhost:5000/api/posts/'
}

// function to create dom element
function createElement(type) {
    let el = document.createElement(type);
    return el;
}

// retrieve posts from Backend
async function getPosts(){
    let posts = await fetch(uri).then(result => result.json());
    return posts;
}

// retrieve post by ID
async function getPostByID(id){
    let post = await fetch(uri + "/" + id)
        .then(result => result.json())
        .catch(error => console.log(error));
    return post;
}

// render sidebar blog nav
function renderSide(posts) {
    let blogNav = document.getElementById("BlogNav")
    while (blogNav.firstChild) {
        blogNav.removeChild(blogNav.lastChild)
    }
    let ul = createElement('ul');
    for (let post of posts) {
        let li = createElement('li');
        li.innerText = post.title;
        li.setAttribute("postID" , post.post_id)
        li.addEventListener('click', clickPost)
        ul.appendChild(li);
    }
    blogNav.appendChild(ul);
}

async function clickPost(event) {
    let id = event.target.getAttribute("postID");
    let post = await getPostByID(id);
    console.log(post);
    renderBody(post);
}


// render Header
function renderHeader(post) {

}

// render Body
function renderBody(post) {
    let blogMain = document.getElementById('BlogMain')
    while (blogMain.firstChild) {
        blogMain.removeChild(blogMain.lastChild)
    }
    // render header

    // render body

    // iterate through body array and create section element
    let sections = post.body;

    for (let section of sections) {
        let postSection = createElement('section');

        // get keys for each object
        let elements = Object.keys(section);

        // iterate through keys array and create element based on key
        for (element of elements){
            let postElement = createElement(element);
            postElement.innerText = section[element];
            postSection.appendChild(postElement);
        }

        // append @postSection to main section under #Blog
        blogMain.appendChild(postSection);
    }
}

// render Footer
function renderFooter(post) {

}

// render Blog
async function renderBlog() {
    
    let posts = await getPosts(uri);
    console.log(posts.posts[0].title);

    renderSide(posts.posts);

    let firstID = posts.posts[0].post_id;
    let post = await getPostByID(firstID);
    renderBody(post);


}
