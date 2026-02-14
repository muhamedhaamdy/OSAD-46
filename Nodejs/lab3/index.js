const express = require('express');
const app = express();
const productRouter = require('./routes/productRouter'); 
const stockRouter = require('./routes/stockRouter');
const { pugController } = require('./controllers/pugController');

app.use(express.json());

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', pugController);

app.use('/products', productRouter);
app.use('/stock', stockRouter);

app.listen(3000, () => {
    console.log('server working on https://127.0.0.1:3000');
});
