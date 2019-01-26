const container = document.querySelector('.component-container');
const menu = document.querySelector('.app__menu');


function menuItemClickHandler(evt) {
    const name = evt.target.textContent;
    const activeItem = document.querySelector('.app__menu .active');
    if (activeItem) {
        activeItem.classList.remove('active');
    }
    evt.target.classList.add('active');
    window.history.pushState(null, name, `#${name}`);
    fetchComponent(name);
} 

function addMenuItem(name) {
    const item = document.createElement('LI');
    item.innerText = name;
    item.addEventListener('click', menuItemClickHandler);
    menu.appendChild(item);
}
 
function getComponentsList() {
    fetch('components.json')
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                addMenuItem(element);
            });
        })
        .catch((error) => alert(error.message))
}

getComponentsList();


async function fetchComponent(name) {
    const endpoint = `components/${name}/`;
    const path = {
        HTML: `${endpoint}template.html`,
        CSS: `${endpoint}style.css`,
        JS: `${endpoint}script.js`,
    }

    const styleSheetsLinks = Object.keys(document.styleSheets).map(item => document.styleSheets[item].href);
    const scriptsLinks = Object.keys(document.scripts).map(item => document.scripts[item].src);

    // insert html
    const template = await fetch(path.HTML);
    const componentString = await template.text();
    container.innerHTML = componentString;

    // insert css
    if (!styleSheetsLinks.includes(`${location.origin}/${path.CSS}`)) {
        const styleLink = document.createElement('link');
        styleLink.rel = 'stylesheet';
        styleLink.href = path.CSS;
        document.body.appendChild(styleLink);
    }

    // insert js
    const componentScript = await fetch(path.JS);
    
    if (componentScript.statusText !== 'Not Found' && !scriptsLinks.includes(`${location.origin}/${path.JS}`)) {
        console.log(`${location.origin}/${path.JS}`)
        console.log('not found js')
        const script = document.createElement('script');
        script.src = path.JS;
        document.body.appendChild(script);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const currentRout = location.hash;
    if (currentRout) {
        fetchComponent(currentRout.substr(1));
    }
})
 
