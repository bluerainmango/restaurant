const express = require("express");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");

const app = express();
const PORT = process.env.PORT || 3000;

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

//! Middleware
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//! API
app.get("/api/reservations", async (req, res) => {
  // Get reservations from DB
  const db = await readFile(path.join(__dirname, "database/db.json"), "utf-8");

  const savedReservations = JSON.parse(db);

  res.status(200).json({
    status: "succes",
    message: "The data from get api",
    result: savedReservations.length,
    data: savedReservations
  });
});

app.post("/api/reservations", async (req, res) => {
  const db = await readFile(path.join(__dirname, "database/db.json"), "utf-8");

  let parsedDB = JSON.parse(db);

  parsedDB.push(req.body);

  let stringifiedDB = JSON.stringify(parsedDB);

  await writeFile(path.join(__dirname, "database/db.json"), stringifiedDB);

  res.status(200).json({
    status: "success",
    message: "Successfully added your reservation!",
    data: req.body
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
