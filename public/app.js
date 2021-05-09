// Scrolling Text 

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

setInterval(function() {
    if (!paused) i = i % length + 1;
    else i = i;
    
    if (i > length) i = 1;
    inlineScroll.innerText = string.substring(0, i) + ((i % 2 == 0 || i % 3 == 0) ? "_" : "");
    inlineScroll.style.display = "inline";
}, 250)

// Navbar

let header = document.getElementById("header");
let container = document.getElementById("container")
let navbar = document.getElementById("navbar")
let mainHeader = document.getElementById("mainHeader")

navbar.addEventListener("click", e => {
    let listItems = document.getElementsByTagName('li');
    let sections = document.getElementsByTagName('section');
    let page = e.target.getAttribute('Page')

    if (!page) return;
    
    for (let item of listItems) {
        if (e.target != item) item.style.backgroundColor = "#222";
        else item.style.backgroundColor = "#283656";
    }
    
    for (let section of sections) {
        if (page != section.id) section.style.display = 'none';
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
if (isTesting) uri = 'http://localhost:5000/api/posts/';

// function to create dom element
function createElement(type) {
    let el = document.createElement(type);
    return el;
}

// retrieve posts from Backend
async function getPosts(){
    let posts = await fetch(uri)
	.then(result => result.json())
	.catch(error => console.log(error));
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

// Login Button Actions

function openLogin() {
    let loginPage = document.getElementById('login');
    loginPage.style.display = "flex";
}

function closeLogin() {
    let loginPage = document.getElementById('login');
    loginPage.style.display = "none";
    document.getElementById('password').value = '';
    clearError();
}

function hideLogin() {
    let loginPage = document.getElementById('login');
    let loginbtn = document.getElementById('login-button');
    loginbtn.innerText = 'Logoff';
    loginbtn.onclick = logOff;
    loginPage.style.display = "none";
    
    clearError();
}

function logOff() {
    let loginbtn = document.getElementById('login-button');
    loginbtn.innerText = 'Blog Login';
    loginbtn.onclick = openLogin;
    localStorage.setItem('token', '');
    console.log(localStorage.getItem('token'));
    closeEditor();
    hideBlogEdit();
}

function addError() {
    let errorMsg = document.getElementById('login-error');
    errorMsg.style.display = "flex";
    errorMsg.innerText = "Error Logging In"
}

function clearError() {
    let errorMsg = document.getElementById('login-error');
    errorMsg.style.display = "none";
}

async function getToken() {
    event.preventDefault();
    let passwordObj = {
        password: document.getElementById('password').value
    }
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(passwordObj),
    }
    
    let loginURI = uri + "login/"
    await fetch(loginURI, options)
        .then(result => {
            if (!result.ok) {
                addError();
                document.getElementById('password').value = '';
                throw Error(result.statusText);
            }
            hideLogin();
            showBlogEdit();
            return result.json();
        })
        .then(token => {
            localStorage.setItem('token', token.token);
        })
        .catch(error => console.log(error))

        document.getElementById('password').value = '';
}

function showBlogEdit() {
    let editBlogButton = document.getElementById('edit-blog');
    let editMenuBar = document.getElementById('edit-menu-bar');
    editMenuBar.style.display = 'flex';
    editBlogButton.addEventListener('click', editBlog)
}

function hideBlogEdit() {
    let editMenuBar = document.getElementById('edit-menu-bar');
    editMenuBar.style.display = 'none';
}

function closeEditor() {
    let blogMain = document.getElementById('BlogMain');
    let blogEdit = document.getElementById('BlogEdit');
    let menuBar = document.getElementById('menu-bar');
    let editBar = document.getElementById('edit-menu-bar');

    blogMain.style.display = "flex";
    editBar.style.display = "flex";

    blogEdit.style.display = "none";
    menuBar.style.display = "none";
}

// Blog Edit Functions

class Blog {
    blogEdit = document.getElementById('BlogEdit');
    author = 'Daniel Stich'
    constructor() {
        this.sections = [];
        this.self = this;
    }

    addListener() {
        let addButton = document.getElementById('add-element');
        addButton.addEventListener('click', (event) => this.addElement(this.self, event));
        let submitButton = document.getElementById('submit-blog');
        submitButton.addEventListener('click', (event) => this.submitBlog(this.self, event));

        let closeEditorButton = document.getElementById('close-edit');
        closeEditorButton.addEventListener('click', closeEditor);
    }

    addElement(self, event) {
        // grab elements
        let el = document.getElementById('elements').value;
    
        // create new elements
        let title = createElement('label');
        let newElement = createElement(el);
        let deleteSection = createElement('button');
    
        // set text in elements
        title.innerText = 'Section';
        deleteSection.innerText = 'x';
    
        // add event listener to close element
        deleteSection.addEventListener('click', (event) => self.removeElement(self, event))
       
        // add elements to blog edit section
        self.blogEdit.appendChild(title);
        self.blogEdit.appendChild(newElement);
        self.blogEdit.appendChild(deleteSection);

        self.sections.push(newElement);
    }

    removeElement(self, event) {
        let section = event.target.previousSibling;
        let title = section.previousSibling;

        self.blogEdit.removeChild(section)
        self.blogEdit.removeChild(event.target)
        self.blogEdit.removeChild(title)

        self.sections = self.sections.filter(element => element != section);
    }

    submitBlog(self, event) {
        let firstTitle = document.getElementById('subtitle-1').value;
        let firstSection = document.getElementById('textarea-1').value;

        let blogObj = {
            title: document.getElementById('title').value,
            tags: document.getElementById('tags').value.split(','),
            date: Date.now(),
            author: self.author,
            likes: 0,
            comments: [],
            body: [{ h2: firstTitle }, { p: firstSection }],
            description: document.getElementById('description').value,
            visible: false
        }
        for (let section of self.sections) {
            console.log(section.type);
            if (section.type == 'textarea') {
                blogObj.body.push({ p: section.value});
            }
            if (section.type == 'text') {
                blogObj.body.push({ h3: section.value});
            }
        }

        console.log(blogObj);
    }
}

function editBlog() {
    let blogMain = document.getElementById('BlogMain');
    let blogEdit = document.getElementById('BlogEdit');
    let menuBar = document.getElementById('menu-bar');
    let editBar = document.getElementById('edit-menu-bar');

    blogMain.style.display = "none";
    editBar.style.display = "none";

    blogEdit.style.display = "grid";
    menuBar.style.display = "flex";

    let blog = new Blog();
    blog.addListener();
}