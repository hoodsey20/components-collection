const container = document.querySelector('.component-container');

// todo: async fetch component

async function fetchComponent(endpoint) {
    const path = {
        HTML: `${endpoint}template.html`,
        CSS: `${endpoint}style.css`,
        JS: `${endpoint}script.js`,
    }

    const styleSheetsLinks = Object.keys(document.styleSheets).map(item => document.styleSheets[item].href);
    const scriptsLinks = Object.keys(document.scripts).map(item => document.scripts[item].src);
    console.log('scriptsLinks', scriptsLinks);
    // insert html
    const template = await fetch(path.HTML);
    const componentString = await template.text();
    container.innerHTML = componentString;

    // insert css
    if (!styleSheetsLinks.includes(`${location.href}${path.CSS}`)) {
        const styleLink = document.createElement('link');
        styleLink.rel = 'stylesheet';
        styleLink.href = path.CSS;
        document.body.appendChild(styleLink);
    }

    // insert 
    const componentScript = await fetch(path.JS);
    
    if (componentScript.statusText !== 'Not Found' && !scriptsLinks.includes(`${location.href}${path.JS}`)) {
        console.log(`${location.href}${path.JS}`)
        const script = document.createElement('script');
        script.src = path.JS;
        document.body.appendChild(script);
    }
    
	
}

console.log('container2', container);

fetchComponent('components/counter/');
// fetchComponent('components/collapseCard/');
