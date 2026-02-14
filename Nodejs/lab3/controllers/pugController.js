const fs = require('fs');

exports.pugController = (req, res) =>{
    const inventory = JSON.parse(fs.readFileSync('./inventory.json'));
    res.render('index', {items: inventory});
};