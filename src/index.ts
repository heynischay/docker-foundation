import "dotenv/config";
import client from "./db.js";
import express from "express";

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  const data = await client.user.findMany();

console.log("server check")

  res.json({
    message: "Healthy server",
    data:data,
  });
});

app.post("/", async (req, res) => {
  await client.user.create({
    data: {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    },
  });

  res.json({
    message: "Done signing up!",
  });
});

app.listen(3000);
