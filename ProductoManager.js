const fs = require('fs');
class ProductManager {
  id = 1;
    constructor(path) {
      this.path = path;
    }
    async addProduct(producto) {
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.path, '[]');
      }
      
      const { title, description, price, thumbnail, code, stock } = producto;
      
      if (title == undefined || description == undefined || price == undefined || thumbnail == undefined || code == undefined || stock == undefined) {
        return 'Completar todos los campos';
      } else {
       let products = [];
       
       let productsContent = await fs.promises.readFile(this.path, 'utf-8');
       products = JSON.parse(productsContent);

       const productFound = products.some((item) => item.code == code);
       if (productFound) {

        return 'El producto ya existe';

       } else {
        if (products.length > 0) {
          this.id = products [products.length - 1].id + 1;
        }

        const product = { id: this.id, ...producto};
        products.push(product);
        let productString = JSON.stringify(products, null, 2);
        await fs.promises.writeFile(this.path, productString);
        return 'Producto adicionado!';

        }
      }
    }
    
    async getProducts() {
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.path, '[]');
      }
      let products = [];

      let productsContent = await fs.promises.readFile(this.path, 'utf-8');
      products = JSON.parse(productsContent);
      return products;
    }
    async getProductById(id) {
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.path, '[]');
      } 
      let products = [];
      let productsContent = await fs.promises.readFile(this.path, 'utf-8');
      products = JSON.parse(productsContent);

      const productFound = products.find((item) => item.id == id);
      if (productFound) {
        console.log('El producto encontrado es');
        return productFound;
      }else{
      return 'producto No encontrado';
      }
    }
    async updateProduct(id, modifProducto) {
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.path, '[]');
      }
      let products = [];
      let productsContent = await fs.promises.readFile(this.path, 'utf-8');
      products = JSON.parse(productsContent);
  
      const { title, description, price, thumbnail, stock } = modifProducto;
      let indexProduct = products.findIndex((index) => index.id === id);
      if (indexProduct !== -1) {
        products[indexProduct].title = title || products[indexProduct].title;
        products[indexProduct].description = description || products[indexProduct].description;
        products[indexProduct].price = price || products[indexProduct].price;
        products[indexProduct].thumbnail = thumbnail || products[indexProduct].thumbnail;
        products[indexProduct].stock = stock || products[indexProduct].stock;
  
        let productString = JSON.stringify(products, null, 2);
        await fs.promises.writeFile(this.path, productString);
        return 'Producto modificado';
      } else {
        return 'Producto no encontrado';
      }
    }

    async deleteProduct(id) {
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.path, '[]');
      }
      let products = [];
      let productsContent = await fs.promises.readFile(this.path, 'utf-8');
      products = JSON.parse(productsContent);
  
      let indexProduct = products.findIndex((index) => index.id === id);
      if (indexProduct !== -1) {
        products.splice(indexProduct, 1);
        let productString = JSON.stringify(products, null, 2);
        await fs.promises.writeFile(this.path, productString);
        return 'producto eliminado';
      } else {
        return 'Producto no encontrado';
      }
    }
  }

  const product1 = {
    title: 'producto prueba 1',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25,
  };

  const product2 = {
    title: 'producto prueba 2',
    description: 'Este es un producto prueba',
    price: 400,
    thumbnail: 'Sin imagen',
    code: 'abc124',
    stock: 44,
  };

  const modifProduct = {
    description: 'Modificar descripción',
  };

  const productManager = new ProductManager('products.json');

  productManager
  .updateProduct(9, modifProduct)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

  productManager
  .addProduct(product1)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

productManager
  .addProduct(product2)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  }); 

productManager
  .getProducts()
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
 
 productManager
  .getProductById(0)
  .then((result) => console.log(result))
  .catch((error) => console.log(error)); 

 
