const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(`
    <form action="/submit-data" method="post">
      <input type="text" name="data">
      <button type="submit">Submit</button>
    </form>
    `);
});

app.post("/submit-data", (req, res) => {
  // Spara data till databasen
  const data = req.body.data;
  connection.query(
    "INSERT INTO guestbook (comment) VALUES (?)",
    [data],
    (error) => {
      if (error) throw error;
    }
  );

  // Läs data från databasen
  connection.query("SELECT * FROM guestbook", (error, results) => {
    if (error) throw error;
    let html = "";
    results.forEach((row) => {
      html += "</br>";
      html += row.comment;
    });
    // Returnera HTML med resultatet
    res.send(html);
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// "INSERT INTO `guestbook` (`id`, `name`, `comment`, `time`) VALUES (NULL, '', '', 'x', current_timestamp());""

app.get("/a", (req, res) => {
  res.send(`
      <form action="/submit-data" method="post">
        <input type="text" name="data">
        <button type="submit">Submit</button>
      </form>
      `);
});
