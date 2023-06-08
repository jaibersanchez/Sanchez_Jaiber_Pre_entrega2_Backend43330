import express from 'express';
import ProductoManager from '../productoManager.js';
import { ProductService } from '../services/products.service.js';

const container = new ProductoManager('./src/data/products.json');

const Service = new ProductService();

export const productsRouter = express.Router();

productsRouter.get('/', async (req, res) => {
  
  try {
    const products = await Service.getAll();
    return res.status(200).json({
      status: 'success',
      msg: 'listado de productos',
      data: products,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});

productsRouter.get('/:id', async (req, res) => {
  
  try {
    const { id } = req.params;
    const product = await Service.getOneById(id);
    return res.status(200).json({
      status: 'success',
      msg: 'listado de productos',
      data: product,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});

productsRouter.post(
  '/',
 async (req, res) => {
   
    try {
      const { title, description, price, thumbnail, code, stock, category, status } = req.body;

      const productCreated = await Service.createOne(title, description, price, thumbnail, code, stock, category, status);
      return res.status(201).json({
        status: 'success',
        msg: 'product created',
        data: productCreated,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: 'error',
        msg: 'something went wrong :(',
        data: {},
      });
    }
  }
);

productsRouter.put('/:id', async (req, res) => {
  
  try {
    const { id } = req.params;
    const { title, description, price, thumbnail, code, stock, category, status } = req.body;

    const productUptaded = await Service.updateOne(id, title, description, price, thumbnail, code, stock, category, status);

    return res.status(201).json({
      status: 'success',
      msg: 'product uptaded',
      data: productUptaded,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});

productsRouter.delete('/:id', async (req, res) => {
  
  try {
    const { id } = req.params;

    const deleted = await Service.deleteOne(id);
    return res.status(200).json({
      status: 'success',
      msg: 'product deleted',
      data: {},
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});