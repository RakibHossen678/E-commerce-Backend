const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 5000;

//middleware
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173/",
    credentials: true,
  })
);

//all routes
const authRoutes = require("./src/users/user.route");

app.use("/api/auth", authRoutes);

async function main() {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vrdje6l.mongodb.net/StyleBask?retryWrites=true&w=majority&appName=Cluster0`
  );
}

main()
  .then(() => console.log("MongoDB is Successfully connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello from StyleBask server....!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
