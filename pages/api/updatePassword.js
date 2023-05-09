const fs = require("fs");
export default function handler(req, res) {
  var db = JSON.parse(fs.readFileSync("./db.json"));
  var users = db.users;
  const id = req.query.id;
  let ind = users.findIndex((ele) => ele.id === id);

  if (ind === -1) {
    res.status(404).json("user not found");
  }

  users[ind] = { ...users[ind], password: req.body.password };

  db = { ...db, users };
  fs.writeFileSync("./db.json", JSON.stringify(db, null, 2));
  res.status(201).json(users[ind]);
}
