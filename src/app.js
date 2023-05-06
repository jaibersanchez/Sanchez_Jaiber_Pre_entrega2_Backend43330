import express from 'express';
import ProductoManager from './ProductoManager.js';
const container = new ProductoManager ('./src/products.json');

const app = express();

app.listen(8080, () => {
    console.log('Se escucha el 8080');
});

app.get('/products', async (req, res)=> {
    try{
        const limit = req.query.limit;
        const products = await container.getProducts ();
        if (limit) {
            return res.json(products.slice(0, limit));
        } else {
            return res.json(products);
        }
    } catch (error){
        console.log(error)
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        const id = req.params.pid;
        const product = await container.getProductById(parseInt(id));
        if(typeof product === 'objeto'){
            return res.json(product);
        }
        if(typeof product === 'string'){
            return res.json({error: 'Producto no encontrado'});
        }
    }catch (error){
        console.log(error);
    }
});

