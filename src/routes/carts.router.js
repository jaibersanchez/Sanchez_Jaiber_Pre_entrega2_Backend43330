import express from 'express';
import CartsManager from '../cartsManager.js';
import ProductoManager from '../productoManager.js';

const containerCarts = new CartsManager('./src/data/carts.json');
const containerProducts = new ProductoManager('./src/data/products.json');

export const cartsRouter = express.Router();

cartsRouter.get('/', async (req, res) => {
  try {
    const limit = req.query.limit;
    const carts = await containerCarts.getCarts();
    if (limit) {
      return res.status(200).json(carts.slice(0, limit));
    } else {
      return res.status(200).json(carts);
    }
  } catch (error) {
    console.log(error);
  }
});

cartsRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const cart = await containerCarts.getCartsById(id);
    if (cart) {
      return res.status(201).json(cart);
    } else {
      return res.status(400).json({ error: 'Carro no encontrado'});
    }
  } catch (error) {
    console.log(error);
  }
});

cartsRouter.post('/', async (req, res) => {
  try {
    const data = await containerCarts.createCart();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
});

cartsRouter.post('/:cid/products/:pid', async (req, res) => {
  try {
    const dataCarts = await containerCarts.getCarts();
    const dataProducts = await containerProducts.getProducts();
    const cartID = req.params.cid;
    const productID = req.params.pid;
    const cartFound = dataCarts.find((item) => item.idCart == parseInt(cartID));
    if (!cartFound) {
      return res.status(200).json({ error: 'No existe el carrito id:' + cartID });
    }

    const productFound = dataProducts.find((item) => item.id == parseInt(productID));
    if (!productFound) {
      return res.status(200).json({ error: 'no existe el producto' + productID });
    }
    const product = await containerCarts.updateCart(parseInt(cartID), parseInt(productID));
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
});