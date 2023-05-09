const fs = require("fs");
var db = JSON.parse(fs.readFileSync("./db.json"));
var users = db.users;

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(users);
  }
}
