const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

main()
  .then(() => console.log("MongoDB is Successfully connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vrdje6l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  );
}

app.get("/", (req, res) => {
  res.send("Hello from StyleBask server....!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
