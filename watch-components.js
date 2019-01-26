const fs = require('fs');
const fileName = 'components.json';
const componentsPath = `${__dirname}/components`;

function createList(data) {
    fs.writeFile(fileName, data, error => {
        if (error) throw error;
    })
}

function wrireComponentsList() {
    fs.readdir(componentsPath, (error, contents) => {
        if (error) throw error;
        const data = JSON.stringify(contents);
        console.log('​data', data)
        createList(data);
    });
}

wrireComponentsList();

const watcher = fs.watch(componentsPath, (event, filename) => {
    wrireComponentsList();
});

watcher.on('error', error => {
	console.log("​error", error)
})
