const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const frontendPath = path.resolve(__dirname, 'wwwroot');
const frontendVirtualPath = '/';

app.get('/file', (req, res) => {
  console.log(req.url);
  res.send(['file1.txt', 'file2.txt', 'file4.txt']);
});

app.get('/file/:name', (req, res) => {
  console.log(req.url);

  res.send(`Hello world ${req.params.name}`);
});

app.use(frontendVirtualPath, express.static(frontendPath));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
