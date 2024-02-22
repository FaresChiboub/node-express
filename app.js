const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const checkWorkingHours = (req, res, next) => {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();

  if ((day >= 1 && day <= 5 && hour >= 9 && hour < 17) || (day === 5 && hour < 17)) {
    next();
  } else {
    res.send(
      "This coffee shop is only open during working hours (Monday to Friday, from 9 AM to 5 PM)."
    );
  }
};



app.use(checkWorkingHours);

app.use(express.static(path.join(__dirname, "public")));

app.use("/styles.css", express.static(path.join(__dirname, "styles.css")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/menu", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "menu.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

app.listen(port, () => {
  console.log(`Coffee shop website is running on http://localhost:${port}`);
});
