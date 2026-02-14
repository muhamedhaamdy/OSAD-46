const fs = require('fs');
const inventory = JSON.parse(fs.readFileSync('./inventory.json').toString());

exports.destock = (req, res) => {
    const item = inventory.find(item => item.id == req.params.id);
    if (!item)
    {
        return res.status(404).json({msg: 'this id not valid'});
    }
    item.quantity--;
    fs.writeFile('./inventory.json', JSON.stringify(inventory), (err) => {
        if (err)
        {
            res.status(500).json({msg: 'error while saving file'});
        }
        res.status(200).json(item);
    });
};

exports.restock = (req, res) => {
    const item = inventory.find(item => item.id == req.params.id);
    if (!item)
    {
        return res.status(404).json({msg: 'this id not valid'});
    }
    item.quantity++;
    fs.writeFile('./inventory.json', JSON.stringify(inventory), (err) => {
        if (err)
        {
            res.status(500).json({msg: 'error while saving file'});
        }
        res.status(200).json(item);
    });
};