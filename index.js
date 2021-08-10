const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const app = express();
const port = 3000;

const filePath = './files';
const fileVirtualPath = '/file';

const frontendPath = path.resolve(__dirname, 'wwwroot');
const frontendVirtualPath = '/';

function compareStringsCaseInsensitive(first, second) {
  const lowerFirst = first.toLowerCase();
  const lowerSecond = second.toLowerCase();
  if (lowerFirst < lowerSecond) {
    return -1;
  } else if (lowerFirst > lowerSecond) {
    return 1;
  } else {
    return 0;
  }
}

app.get(fileVirtualPath, async (req, res) => {
  console.log(req.url);
  const files = await fs.readdir(filePath);
  files.sort(compareStringsCaseInsensitive);
  res.send(files);
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
