const http = require('http');
const router = require('./routes');
const server = http.createServer(router);

server.listen(3000, () => {
    console.log('Server is running on port 3000...');
});


// const http = require('http');
// const fs = require('fs');

// const server = http.createServer((req, res) => {
//     // console.log(req.url);
//     if (req.url === "/")
//     {
//         res.writeHead(200, {'content-type' : 'text/html'});
//         fs.readFile('inventory.json', (err, data) => {
//             items = JSON.parse(data);
//             const itemsHtml = items.map(item => `
//                 <div>
//                     <h2>${item.id} ${item.item}</h2>
//                 </div>
//                 `).join('');
//             res.write(
// `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>home</title>
// </head>
// <body>
//     <h1>Welcome to landing page</h1>
//     ${itemsHtml}
// </body>
// </html>`
// );
//             res.end();
//         })
//     }
//     if (req.url === "/astronomy")
//     {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         fs.createReadStream('./static/astronomy.html').pipe(res);
//         return;
//     }
//     else if (req.url === '/imgs/astronomy.jpg')
//     {
//         res.writeHead(200, { 'Content-Type': 'image/jpeg' });
//         fs.createReadStream('./static/imgs/astronomy.jpg').pipe(res);
//         return;
//     }
//     else if (req.url === '/serbal')
//     {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         fs.createReadStream('./static/serbal.html').pipe(res);
//         return;
//     }
//     else if (req.url === '/imgs/serbal.jpeg')
//         {
//         res.writeHead(200, { 'Content-Type': 'text/css' });
//         fs.createReadStream('./static/imgs/serbal.jpeg').pipe(res);
//         return;
//         }
//         else if (req.url === "/style/style.css")
//         {
//             res.writeHead(200, { 'content-type': 'text/css' });
//             fs.readFile('./static/style/style.css', (err, data) => {
//                 res.write(data);
//                 res.end();
//             })
//         }
//         else if (req.url === "/inventory" && req.method === "POST") {
//             let incomingData = '';
    
//             req.on('data', (chunk) => {
//                 incomingData += chunk.toString();
//             });
//             req.on('end', () => {
//                 const newItem = JSON.parse(incomingData);
    
//                 fs.readFile('./inventory.json', 'utf8', (err, data) => {
//                     if (err) {
//                         console.error(err);
//                         return; 
//                     }
    
//                     const currentItems = JSON.parse(data);
                    
//                     newItem.id = currentItems.length + 1;
    
//                     currentItems.push(newItem);
    
//                     fs.writeFile('./inventory.json', JSON.stringify(currentItems), (err) => {
//                         if (err) {
//                             res.writeHead(500);
//                             res.end("Error saving data");
//                         } else {
//                             res.writeHead(201, { 'Content-Type': 'application/json' });
//                             res.end(JSON.stringify({ message: "Item added!", item: newItem }));
//                         }
//                     });
//                 });
//             });
//         }
// })
// server.listen(3000, (req, res) => {
//     console.log('running XD');
// })