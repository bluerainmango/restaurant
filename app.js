const express = require("express");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");

const app = express();
const PORT = process.env.PORT || 3000;

// const readFile = promisify(fs.readFile);
// const writeFile = promisify(fs.writeFile);

//! Middleware
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//! Initial DB
let data = {
  maxReservations: 5,
  reservDB: [{ name: "Emily Yu", email: "emily@gmail.com", phone: "123-456-7899", id: "1" }],
  waitDB: [{ name: "Andy Cho", email: "andy@gmail.com", phone: "424-326-1222", id: "2" }]
};

//! API
app.get("/api/reservations", async (req, res) => {
  // const db = await readFile(path.join(__dirname, "database/db.json"), "utf-8");

  res.status(200).json({
    status: "success",
    reservedSeats: data.reservDB.length,
    waitings: data.waitDB.length,
    data
  });
});

app.post("/api/reservations", async (req, res) => {
  // const db = await readFile(path.join(__dirname, "database/db.json"), "utf-8");
  // let parsedDB = JSON.parse(db);
  // parsedDB.push(req.body);
  // let stringifiedDB = JSON.stringify(parsedDB);
  // await writeFile(path.join(__dirname, "database/db.json"), stringifiedDB);

  // To retreive only designated inputs
  console.log(req.body);
  const { name, email, phone, id } = req.body;

  if (data.reservDB.length < data.maxReservations) {
    // push db
    data.reservDB.push({ name, email, phone, id });
  } else {
    // push wait
    data.waitDB.push({ name, email, phone, id });
  }
  res.status(200).json({
    status: "success",
    message: "Successfully added your reservation!",
    data
  });
});

//! Render pages
app.get("/", (req, res) => {
  res.sendFile(path.join(`${__dirname}/public`, "home.html"), err => {
    if (err) console.log(err);
  });
});

app.get("/tables", (req, res) => {
  res.sendFile(path.join(`${__dirname}/public`, "tables.html"), err => {
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
