import jwt from "jsonwebtoken";
const secret = process.env.SECRET;

export default async function (req, res) {
  const { email } = req.body;
  const token = jwt.sign(
    {
      email: email,
    },
    secret
  );
  res.json({ token, message: "Success!" });
}
