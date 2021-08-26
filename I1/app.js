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
      price: this.price
      }
  }

   changeStock(change) {
     this.stockAmount =   this.stockAmount - change;
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
    stockItem = this.stock.find((a) => a.sku === sku);
    stockItem.stockAmount = stockItem.stockItem - change;
  }
  getStock(sku) {
    console.log(this.stock.find((a) => a.sku === sku).stockAmount);
    return this.stock.find((a) => a.sku === sku).stockAmount;
  }
  inventorize() {
    console.log(this.stock);
    return this.stock;
  }
}

class Cart {
  //     Det ska finnas en varukorg som innehåller 0-n produkter. Varukorgen ska höra ihop med en kund.
  // Varukorgen ska ha en metod för att skriva ut innehållet i korgen.
  // Varukorgen ska ha en metod för att räkna ihop summan av värdet av alla produkter i korgen.
  // Varukorgen ska ha metoder för att lägga till och ta bort produkter i varukorgen.

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
    console.log(this.productList);
    return this.productList;
  }

  getTotal() {
    console.log(this.productList.forEach((a) => a.qty * a.price));
    return this.productList.forEach((a) => a.qty * a.price);
  }
}



class Customer {
  //     Det ska finnas en kund-klass som håller reda på namn, orderhistorik och nuvarande varukorg.
  // Det ska finnas en köp-metod som lägger till varukorgens innehåll i kundens köphistorik med datum och minskar lagervärdet på produkterna.

  constructor(name) {
    this.name = name;
    this.orderHistory = [];
    this.cart = new Cart();
  }

  getOrderHistory() {
    return this.orderHistory;
  }

  setOrderHistory({ sku, amount, date }) {
    this.orderHistory.push({ sku, amount, date });
  }

  addToCart(product, qty) {

  }

    buy() {
    console.log(this.cart.getCart())
    this.cart.getCart().forEach( a => {
     
     
    this.setOrderHistory(a.product.sku, 3, (new Date()).toLocaleString("se-SE"))
      a.product.changeStock(a.qty)
      stock.changeStock(a.product.sku, a.qty)

    // a.sku qty price
    //console.log(a.product.sku)

    })

    //minska lager
    // lägg till order obj
    // set cart to null
  }
}

// Create the stock class
stock = new Stock();

// Create a few prodcuts
blackTShirt = new Clothes(
  "abc123",
  "Black T-Shirt",
  "Lorum ipsum dolor",
  5,
  99,
  'L'
);


movie1 = new Toys(
  "atoy123",
  "Black T-Shirt",
  "Lorum ipsum dolor",
  5,
  99,
  12
);

// Create custoer 

mattias = new Customer( 
  'mattias'
)

mattias.cart.addProduct(movie1,2)
mattias.cart.addProduct(blackTShirt,1)
console.log(blackTShirt.get());

console.log(stock)
console.log(mattias.cart)
console.log(mattias)
mattias.buy()
console.log(mattias.getOrderHistory())
console.log(movie1)
console.log(stock)
//Create Customer

// Add products to Cart

// Buy prodcuts

//Get stock

// Get orders
