const fs = require("fs");

export default function handler(req, res) {
  var db = JSON.parse(fs.readFileSync("./db.json"));
  var products = db.products;
  let r = req.body;
  products.push(r);
  db = { ...db, products };
  fs.writeFileSync("./db.json", JSON.stringify(db, null, 2));
  res.status(201).json(products[products.length - 1]);
}
