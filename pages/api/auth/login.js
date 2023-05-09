import jwt from "jsonwebtoken";
const secret = process.env.SECRET;

export default async function (req, res) {
  const { email, password } = req.body;

  const resp = await fetch(
    `http://localhost:3000/api/getValidUser?email=${email}&password=${password}`
  );

  const user = await resp.json();
  if (user === "no user found")
    res.status(404).json({ message: "Invalid credentials!" });
  else {
    if (user) {
      const email = user.email;
      const token = jwt.sign(
        {
          email: email,
        },
        secret
      );

      res.status(200).json({ token, message: "Success!" });
    }
  }
  if (!user) res.status(404).json("check");
}
