const fs = require("fs");
var db = JSON.parse(fs.readFileSync("./db.json"));
var users = db.users;

export default function handler(req, res) {
  if (req.method == "PATCH") {
    let id = req.query.id;
    let ind = users.findIndex((ele) => String(ele.id) == id);
    users[ind].cart = req.body.cart;
    db = { ...db, users };
    fs.writeFileSync("./db.json", JSON.stringify(db, 0, 1));
    res.status(200).json(users[ind]);
  }
}
