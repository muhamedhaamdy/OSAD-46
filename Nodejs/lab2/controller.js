const fs = require('fs');

function serveStaticFile(res, filePath, contentType) {
    res.writeHead(200, { 'Content-Type': contentType });
    const stream = fs.createReadStream(filePath);
    
    stream.on('error', () => {
        res.writeHead(404);
        res.end();
    });
    
    stream.pipe(res);
}

const controller = {
    getHome: (req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile('inventory.json', (err, data) => {
      
          if (err) {
                res.writeHead(500);
                return res.end('Error loading data');
            }
            
            const items = JSON.parse(data);
            const itemsHtml = items.map(item => `
                <div>
                    <h2>${item.id} ${item.name || item.item}</h2>
                </div>
            `).join('');

            res.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Home</title>
                </head>
                <body>
                    <h1>Welcome to landing page</h1>
                    ${itemsHtml}
                </body>
                </html>
            `);
            res.end();
        });
    },

    addInventoryItem: (req, res) => {
        let incomingData = '';

        req.on('data', (chunk) => {
            incomingData += chunk.toString();
        });

        req.on('end', () => {
            const newItem = JSON.parse(incomingData);

            fs.readFile('./inventory.json', 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    return; 
                }

                const currentItems = JSON.parse(data);
                newItem.id = currentItems.length + 1;
                currentItems.push(newItem);

                fs.writeFile('./inventory.json', JSON.stringify(currentItems), (err) => {
                    if (err) {
                        res.writeHead(500);
                        res.end('Error saving data');
                    } else {
                        res.writeHead(201, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Item added!', item: newItem }));
                    }
                });
            });
        });
    },

    getAstronomyPage: (req, res) => serveStaticFile(res, './static/astronomy.html', 'text/html'),
    getAstronomyImg: (req, res) => serveStaticFile(res, './static/imgs/astronomy.jpg', 'image/jpeg'),
    getSerbalPage: (req, res) => serveStaticFile(res, './static/serbal.html', 'text/html'),
    getSerbalImg: (req, res) => serveStaticFile(res, './static/imgs/serbal.jpeg', 'image/jpeg'), // Fixed the css/jpeg bug here!
    getCSS: (req, res) => serveStaticFile(res, './static/style/style.css', 'text/css'),
};

module.exports = controller;