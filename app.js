const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const db = [
  {
    name: "Tom Jerry",
    phone: "123-123-1234",
    email: "Tom@gmail.com",
    id: "1"
  }
];

//! Must need middleware
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//! API
app.get("/api/reservation", (req, res) => {
  console.log("hit get api", req.data);
  res.status(200).json({
    status: "succes",
    message: "The data from get api",
    data: db
  });
});
app.post("/api/reservation", (req, res) => {
  console.log("hit post api", req.body);
  res.status(200).json({
    status: "success",
    message: "The data from post api",
    data: db
  });
});
app.get("/api/tables", (req, res) => {
  console.log("hit get tables api", req.body);
  res.status(200).json({
    status: "success",
    message: "The data from get tables api",
    data: db
  });
});

//! Render pages
app.get("/", (req, res) => {
  res.sendFile(path.join(`${__dirname}/public`, "home.html"), err => {
    if (err) console.log(err);
  });
});

app.get("/tables", (req, res) => {
  res.sendFile(path.join(`${__dirname}/public`, "home.html"), err => {
    if (err) console.log(err);
  });
});

app.get("/reserve", (req, res) => {
  res.sendFile(path.join(`${__dirname}/public`, "reserve.html"), err => {
    if (err) console.log(err);
  });
});

//! Server
app.listen(PORT, () => {
  console.log(`Listening from ${PORT}....`);
});

// DB
