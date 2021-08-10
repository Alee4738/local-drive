const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const filePath = './files';
const fileVirtualPath = '/file';

const frontendPath = path.resolve(__dirname, 'wwwroot');
const frontendVirtualPath = '/';

app.get(fileVirtualPath, (req, res) => {
  console.log(req.url);
  res.send(['hello.txt', 'file1.txt', 'file2.txt', 'file4.txt']);
});

app.get(`${fileVirtualPath}/:name`, (req, res) => {
  console.log(req.url);
  const actualFilePath = path.resolve(filePath, req.params.name);
  res.sendFile(actualFilePath);
});

app.use(frontendVirtualPath, express.static(frontendPath));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
