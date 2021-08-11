const express = require('express');
const { networkInterfaces } = require('os');
const path = require('path');
const fs = require('fs/promises');
const app = express();
const port = 3000;

const localDrivePath = './files';
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

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use(
  express.raw({
    type: 'text/plain',
    limit: '50mb',
  })
);

app.get(fileVirtualPath, async (req, res) => {
  const files = await fs.readdir(localDrivePath);
  files.sort(compareStringsCaseInsensitive);
  res.send(files);
});

app.get(`${fileVirtualPath}/:name`, (req, res) => {
  const actualFilePath = path.resolve(localDrivePath, req.params.name);
  res.sendFile(actualFilePath);
});

app.put(`${fileVirtualPath}/:name`, async (req, res) => {
  const fileName = path.normalize(`/${req.params.name}`);
  const filePath = path.normalize(path.join(localDrivePath, fileName));
  try {
    await fs.writeFile(filePath, req.body);
    res.end();
  } catch (err) {
    console.error(err);
    res.send(400);
  }
});

app.use(frontendVirtualPath, express.static(frontendPath));

function getNetworkInterfaces() {
  const nets = networkInterfaces();
  const results = Object.create(null); // Or just '{}', an empty object

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === 'IPv4' && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }
  return results;
}

app.listen(port, () => {
  const interfaces = getNetworkInterfaces();
  for (const interfaceName in interfaces) {
    const ip = interfaces[interfaceName];
    console.log(`Local Drive listening at http://${ip}:${port}`);
  }
});
