const fs = require("fs");

export default function handler(req, res) {
  var db = JSON.parse(fs.readFileSync("./db.json"));
  var users = db.users;
  const id = req.query.id;
  let ind = users.findIndex((ele) => ele.id === id);

  if (ind !== -1) res.status(201).json(users[ind]);
  else res.status(404).json("no user found");
}
