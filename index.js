const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const frontendPath = path.resolve(__dirname, "wwwroot");

app.get("/", (req, res) => {
  res.sendFile(`${frontendPath}/index.html`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
