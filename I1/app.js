class Product {
  constructor(sku, title, description, stockAmount, price) {
    this.sku = sku;
    this.title = title;
    this.description = description;
    this.stockAmount = stockAmount;
    this.price = price;

    stock.addProduct(sku, stockAmount);
  }

  get = () => {
    return {
      sku: this.sku,
      title: this.title,
      desription: this.description,
      stockAmount: this.stockAmount,
      price: this.price,
    };
  };

  changeStock(change) {
    this.stockAmount = this.stockAmount - change;
  }
}

class Toys extends Product {
  //ålder fromAge

  constructor(sku, title, description, stockAmount, price, fromAge) {
    super(sku, title, description, stockAmount, price);
    this.fromAge = fromAge;
  }
}

class Clothes extends Product {
  //size
  constructor(sku, title, description, stockAmount, price, size) {
    super(sku, title, description, stockAmount, price);
    this.size = size;
  }
}

class Stock {
  //         Det ska finnas en lager-klass som håller reda på alla produkter i butiken och hur många som finns i lager av varje produkt.
  // Det ska finnas en inventarie-metod som skriver ut en lista med alla produkter och hur många det finns av produkten.
  // Det ska finnas en metod som returnerar ett objekt baserat på sku. Om det t ex finns en produkt ”jacka” med sku ”456” så ska man kunna söka efter produkten genom att skicka artikelnumret till metoden och få tillbaka objektet.

  constructor() {
    this.stock = [];
  }
  addProduct(sku, stockAmount) {
    this.stock.push({ sku, stockAmount });
  }

  changeStock(sku, change) {
    let stockItem = this.stock.find((a) => a.sku === sku);
    stockItem.stockAmount = stockItem.stockAmount - change;
  }
  getStock(sku) {
    console.log(this.stock.find((a) => a.sku === sku).stockAmount);
    return this.stock.find((a) => a.sku === sku).stockAmount;
  }
  inventorize() {
    return this.stock;
  }
}

class Cart {
  constructor() {
    this.productList = [];
  }

  addProduct(product, qty) {
    if (!this.productList.find((a) => a.sku === product.sku)) {
      this.productList.push({ product, qty });
    } else {
      newQty = this.productList.find((a) => a.sku === sku).qty + qty;
      changeAmount(product, newQty);
    }
  }

  removeProduct(sku) {
    if (this.productList.find((a) => a.sku === sku).qty) {
      this.productList.splice(
        this.productList.findIndex((a) => a.sku === sku),
        1
      );
    } else {
      console.log("no such product");
    }
  }

  changeAmount(product, newAmount) {
    this.productList.find((a) => a.sku === sku).qty = newAmount;
  }
  getCart() {
    return this.productList;
  }

  getTotal() {
    let total = 0;
    this.productList.forEach((a) => {
      total += a.qty * a.product.price;
    });
    return total;
  }
}

class Customer {
  constructor(name) {
    this.name = name;
    this.orderHistory = [];
    this.cart = new Cart();
  }

  getOrderHistory() {
    return this.orderHistory;
  }

  setOrderHistory(sku, amount, date) {
    this.orderHistory.push({ sku, amount, date });
  }

  addToCart(product, qty) {}

  buy() {
    this.cart.getCart().forEach((a) => {
      this.setOrderHistory(
        a.product.sku,
        3,
        new Date().toLocaleString("se-SE")
      );
      a.product.changeStock(a.qty);
      stock.changeStock(a.product.sku, a.qty);
    });

    this.cart = new Cart();
  }
}

// Create the stock class
stock = new Stock();

// Create a few prodcuts
blackTShirt = new Clothes(
  "abc1",
  "Black T-Shirt",
  "Lorum ipsum dolor",
  5,
  99,
  "L"
);

movie1 = new Toys("abc2", "Plastanka", "Lorum ipsum dolor", 100, 49, 3);

greenHoodie = new Clothes(
  "abc3",
  "Green Hoodie",
  "Lorum ipsum dolor",
  10,
  249,
  "SL"
);

// Create customer
mattias = new Customer("mattias");

// Add som products to Mattias cart
mattias.cart.addProduct(movie1, 2);
mattias.cart.addProduct(blackTShirt, 1);

//check that total is working properly
console.log(mattias.cart.getTotal());

// Buy what is in cart - cart is set to empty
mattias.buy();

//console log stock and products to see that stock is infact updating
console.log(stock.inventorize());
console.log(movie1.get());

//Consoloe log to see that order history is working
console.log(mattias.getOrderHistory());
