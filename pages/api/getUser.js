//get request

const fs = require("fs");
export default function handler(req, res) {
  var db = JSON.parse(fs.readFileSync("./db.json"));
  var users = db.users;
  const email = req.query.email;
  let ind = users.findIndex((ele) => ele.email === email);

  if (ind !== -1) res.status(201).json(users[ind]);
  else res.status(404).json("no user found");
}
