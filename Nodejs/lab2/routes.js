const controller = require('./controller');

const requestHandler = (req, res) => {

    if (req.url === '/') {
        controller.getHome(req, res);
    } 
    else if (req.url === '/astronomy') {
        controller.getAstronomyPage(req, res);
    }
    else if (req.url === '/imgs/astronomy.jpg') {
        controller.getAstronomyImg(req, res);
    }
    else if (req.url === '/serbal') {
        controller.getSerbalPage(req, res);
    }
    else if (req.url === '/imgs/serbal.jpeg') {
        controller.getSerbalImg(req, res);
    }
    else if (req.url === '/style/style.css') {
        controller.getCSS(req, res);
    }
    else if (req.url === '/inventory' && req.method === 'POST') {
        controller.addInventoryItem(req, res);
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 Not Found');
    }
};

module.exports = requestHandler;