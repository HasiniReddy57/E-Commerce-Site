const fs = require("fs");
var db = JSON.parse(fs.readFileSync("./db.json"));
var products = db.products;

export default function handler(req, res) {
  const { ProductId } = req.query;
  let ind = products.findIndex((ele) => ele.id == ProductId);

  if (ind == -1) res.status(404).json("no products found");
  if (req.method == "GET") {
    res.status(200).json(products[ind]);
  }
  if (req.method == "PATCH") {
    products[ind].itemssold = products[ind].quantity + reqbody.quantity;
    products[ind].quantity = products[ind].quantity - reqbody.quantity;

    db = { ...db, products };
    fs.writeFileSync("./db.json", JSON.stringify(db, null, 2));
    res.status(201).json(products[ind]);
  }
}
