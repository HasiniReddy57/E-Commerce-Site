const fs = require("fs");

export default function handler(req, res) {
    var db = JSON.parse(fs.readFileSync("./db.json"));
    var products = db.products
    const productId = req.query.productId
    const deletedProduct = products.find((product) => product.id ==productId)
    const index = products.findIndex((product) => product.id ==productId)
    products.splice(index, 1) 
    db = { ...db, products }
    fs.writeFileSync('./db.json', JSON.stringify(db, null, 1))
    res.status(300).json(deletedProduct);
}