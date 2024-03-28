class Product {
    constructor(name, price) {
        this.id = Symbol();
        this.name = name;
        this.price = price;
    }

}
class Supplier {
    constructor(name, productids) {
        this.name = name,
        this.productids = productids;
    }
}

let acmeProducts = [new Product("Hat", 200), new Product("Boots", 300)];
let zoomProducts = [new Product("Hat", 100), new Product("Boots", 300)];

let products = new Map();
[...acmeProducts, ...zoomProducts].forEach(p => products.set(p.id, p))
let suppliers = new Map();
suppliers.set("acme", new Supplier("Acme Co", acmeProducts.map(p => p.id)));
suppliers.set("zoom", new Supplier("Zoom Shoes", zoomProducts.map(p => p.id)));

suppliers.get("acme").productids.forEach(id => console.log(`Name: ${products.get(id).name}`));