const fs = require("fs");
var db = JSON.parse(fs.readFileSync("./db.json"));
var products = db.products;

export default function handler(req, res) {
  if (req.method == "PATCH") {
    let id = req.query.id;
    let ind = products.findIndex((ele) => String(ele.id) == id);

    products[ind].quantity = req.body.quantity;
    products[ind].itemssold = req.body.itemssold;
    db = { ...db, products };
    fs.writeFileSync("./db.json", JSON.stringify(db, null, 2));
    res.status(200).json(products[ind]);
  }
}
