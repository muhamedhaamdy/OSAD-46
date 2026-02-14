const fs = require('fs');
const inventory = JSON.parse(fs.readFileSync('./inventory.json').toString());


exports.getAllProducts = (req, res) => {
    // console.log('hello from products')
    const { status, category } = req.query;

    let filteredProducts = inventory;

    if (status !== undefined) {
        const isTrue = status === 'true';
        filteredProducts = filteredProducts.filter(p => p.status === isTrue);
    }

    if (category) {
        filteredProducts = filteredProducts.filter(p => 
            p.category.toLowerCase() === category.toLowerCase()
        );
    }

    res.json(filteredProducts);
};

exports.getProduct = (req,res) => {
    const item = inventory.find(obj => obj.id == req.params.id);
    if (!item)
    {
        res.status(404).json({'msg': 'this id not found'});
    }
    res.status(200).json(item);
};

exports.addProduct = (req, res) => {
    const newItem = {};
    newItem.id = inventory[inventory.length-1].id + 1;
    newItem.name = req.body.name;
    newItem.quantity = req.body.quantity;
    newItem.category = req.body.category;
    newItem.status = req.body.status;
    inventory.push(newItem);
    // console.log(inventory);
    fs.writeFile('./inventory.json', JSON.stringify(inventory), (err) => {
        if (err) {
            res.status(500).json({msg : 'Error saving data'});
        } else {
            res.status(201).json(newItem);
        }
    });
};

exports.deleteProduct = (req, res) => {
    const remainItems = inventory.filter(obj => obj.id != req.params.id);
    // console.log(remainItems);
    if (remainItems.length === inventory.length)
    {
        res.status(404).json({'msg': 'this id not found'});
    }
    fs.writeFile('./inventory.json', JSON.stringify(remainItems), (err) => {
        if (err) {
            res.status(500).json({msg : 'Error saving data'});
        } else {
            res.status(202).json({msg: 'item deleted successfully'});
        }
    });
};

exports.editProduct = (req, res) => {
    const item = inventory.find(obj => obj.id == req.params.id);
    if (!item)
    {
        res.status(404).json({'msg': 'this id not found'});
    }
    if (req.body.name) item.name = req.body.name;
    if (req.body.qantaty) item.qantaty = req.body.qantaty;
    if (req.body.category) item.category = req.body.category;
    if (req.body.status) item.status = req.body.status;
    fs.writeFile('./inventory.json', JSON.stringify(inventory), (err) => {
        if (err)
        {
            res.status(500).json({msg: 'error while saving'});
        }
        res.status(200).json({msg: 'updated successfully', updatedItem: item});
    });
};