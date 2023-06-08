import fs from 'fs';

class CartManager {
  id = 1;
  constructor(path) {
    this.path = path;
  }

  async createCart() {
    try {
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.path, '[]');
      }

      let carts = [];
      let cartsContent = await fs.promises.readFile(this.path, 'utf-8');
      carts = JSON.parse(cartsContent);

      if (carts.length > 0) {
        this.id = carts[carts.length - 1].idCart + 1;
      }

      const newCart = {
        idCart: this.id,
        products: [],
      };

      carts.push(newCart);
      let cartString = JSON.stringify(carts, null, 2);
      await fs.promises.writeFile(this.path, cartString);
      return 'Carrito creado!';
    } catch (error) {
      console.log(error);
    }
  }

  async updateCart(cartId, productId) {
    try {
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.patch, '[]');
      }

      let carts = [];
      let cartContent = await fs.promises.readFile(this.path, 'utf-8');
      carts = JSON.parse(cartContent);

      const cartFound = carts.find((item) => item.idCart == cartId);
      if (cartFound) {
        const productFound = cartFound.products.find((item) => item.idProduct == productId);
        if (productFound) {
          productFound.quantity++;
          const index = cartFound.products.indexOf(productFound);
          cartFound.products.splice(index, 1, productFound);
          const indexCart = carts.indexOf(cartFound);
          carts.splice(indexCart, 1, cartFound);
          let cartString = JSON.stringify(carts, null, 2);
          await fs.promises.writeFile(this.path, cartString);
          return 'Agregaste un producto más';
        } else {
          cartFound.products.push({ idProduct: productId, quantity: 1 });
          const indexCart = carts.indexOf(cartFound);
          carts.splice(indexCart, 1, cartFound);
          let cartString = JSON.stringify(carts, null, 2);
          await fs.promises.writeFile(this.path, cartString);
          return 'producto agregado al carrito';
        }
      } else {
        return 'No existe el carrito';
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getCarts() {
    try {
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.patch, '[]');
      }
      let carts = [];
      let cartContent = await fs.promises.readFile(this.path, 'utf-8');
      carts = JSON.parse(cartContent);
      return carts;
    } catch (error) {
      console.log(error);
    }
  }

  async getCartsById(id) {
    try {
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.patch, '[]');
      }

      let carts = [];
      let cartContent = await fs.promises.readFile(this.path, 'utf-8');
      carts = JSON.parse(cartContent);

      const cartFound = carts.find((item) => item.idCart == id);
      if (cartFound) {
        return cartFound;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default CartManager;