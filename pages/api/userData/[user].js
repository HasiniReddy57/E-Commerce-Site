const fs = require("fs");

export default function handler(req, res) {
  var db = JSON.parse(fs.readFileSync("./db.json"));
  var users = db.users;
  const { user } = req.query;
  const result = users.findIndex((usr) => usr.email == user);
  if (result == -1) {
    res.status(404).json("user not found");
  }
  if (req.method == "GET") res.status(200).json([users[result]]);
  if (req.method == "PATCH") {
    const reqbody = JSON.parse(req.body);
    if (Object.keys(reqbody).indexOf("wishlist") != -1)
      users[result].wishlist = reqbody.wishlist;
    if (Object.keys(reqbody).indexOf("cart") != -1)
      users[result].cart = reqbody.cart;

    db = { ...db, users };
    fs.writeFileSync("./db.json", JSON.stringify(db, null, 2));
    res.status(201).json("done");
  }
}
