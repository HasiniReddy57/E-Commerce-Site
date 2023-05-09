const fs = require("fs");

export default function handler(req, res) {
  var db = JSON.parse(fs.readFileSync("./db.json"));
  var users = db.users;
  let r = req.body;
  users.push(r);
  db = { ...db, users };
  fs.writeFileSync("./db.json", JSON.stringify(db, null, 2));
  res.status(201).json(users[users.length - 1]);
}
