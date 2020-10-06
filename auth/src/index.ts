import express, { json } from "express";

const app = express();
app.use(json());

app.get("/api/users/currentuser", (req, res) => {
  res.send("Hlo there user");
});

app.listen(3000, () => {
  console.log("Auth service started on port 3000 !");
});
