import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import { Server } from 'socket.io';
import ProductoManager from './ProductoManager.js';
import { cartsRouter } from './routes/carts.router.js';
import { productsHtml } from './routes/homeProducts.router.js';
import { productsRouter } from './routes/products.router.js';
import { productsRealTime } from './routes/realTimeProducts.router.js';
import { __dirname } from './utils.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(8080, () => {
    console.log('Se escucha el 8080');
});

const socketServer = new Server(httpServer);

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.get('*', (req, res) => {
  return res.status(404).json({ status: 'error', message: 'No encontrado' });
});

app.use('/home', productsHtml);
app.use('/realtimeproducts', productsRealTime);

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

socketServer.on('connection', (socket) => {
  console.log('Un cliente se ha conectado ' + socket.id);

  socket.on('new-product', async (newProduct) => {
    const data = new ProductoManager('./src/data/products.json');
    await data.addProduct(newProduct);

    const products = await data.getProducts();
    console.log(products);
    socketServer.emit('products', products);
  });

  socket.on('delete-product', async (productId) => {
    const data = new ProductoManager('./src/data/products.json');
    await data.deleteProduct(productId);

    const products = await data.getProducts();
    socketServer.emit('products', products);
  });
});

app.get('*', (req, res) => {
  return res.status(404).json({ status: 'error', message: 'No encontrado' });
});