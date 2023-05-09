const fs = require("fs");
export default function handler(req, res) {
  var db = JSON.parse(fs.readFileSync("./db.json"));
  var products = db.products;
  const id = req.query.id;
  let ind = products.findIndex((ele) => ele.id == id);
  if (ind !== -1) res.status(201).json(products[ind]);
  else res.status(404).json("no products found");
}
