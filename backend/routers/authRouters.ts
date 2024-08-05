import bcrypt from "bcryptjs";
import express from "express";
import fs from "fs";
import jwt from "jsonwebtoken";

const authRouter = express.Router();
export const authSecret = "FJSDHGLSJGKLSDJFLASJFLSHGLSKFJDLS";

interface User {
  email: string;
  password: string;
}

authRouter.post("/register", (req, res) => {
  const user = req.body;
  const { email, password } = user;
  const isValid = email.length > 0 && password.length > 0;
  if (!isValid) return res.status(400).send("Bad Request");
  const salt = bcrypt.genSaltSync();
  const hashPassword = bcrypt.hashSync(password, salt);
  const newUser = { email, password: hashPassword };
  const exist = fs.existsSync("user.json");
  if (!exist) {
    fs.writeFileSync("user.json", JSON.stringify([newUser]));
  }
  const usersStr = fs.readFileSync("user.json", "utf-8");
  const users: User[] = JSON.parse(usersStr);
  const existUser = users.map((user) => user.email === email);
  if (existUser) return res.status(400).send("Bad Request.");
  users.push(newUser);
  fs.writeFileSync("user.json", JSON.stringify(users));
  res.end();
});

authRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  const isValid = email.length > 0 && password.length > 0;
  if (!isValid) return res.status(400).send("Bad Request");
  const exist = fs.existsSync("user.json");
  if (!exist) {
    res.status(500).end();
  } else {
    const users: User[] = JSON.parse(fs.readFileSync("user.json", "utf-8"));
    const user = users.find((user) => user.email === email);
    if (!user) {
      res.status(400).send("404 not Found user");
    } else {
      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (passwordMatch) {
        const token = jwt.sign({ email }, authSecret, {expiresIn: '1hr'});
        res.send({ token });
      } else {
        res.status(401).end();
      }
    }
  }
});

export default authRouter;
