const fs = require("fs");
export default function handler(req, res) {
  var db = JSON.parse(fs.readFileSync("./db.json"));
  var products = db.products;
  const id = req.query.id;
  let ind = products.findIndex((ele) => ele.id == id);
  if (ind === -1) {
    res.status(404).json("product not found");
  }
  products[ind] = req.body;

  db = { ...db, products };
  fs.writeFileSync("./db.json", JSON.stringify(db, null, 2));
  res.status(201).json(products[ind]);
}
