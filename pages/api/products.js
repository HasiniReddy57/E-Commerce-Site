const fs = require("fs");

export default function handler(req, res) {
  var db = JSON.parse(fs.readFileSync("./db.json"));
  var products = db.products;
  if (req.method === "GET") res.status(200).json(products);
}
