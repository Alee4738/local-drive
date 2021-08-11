const express = require('express');
const { networkInterfaces } = require('os');
const path = require('path');
const { access, readdir, writeFile, mkdir } = require('fs/promises');
const { constants } = require('fs');
const app = express();
const port = 3000;

const localDrivePath = path.resolve(__dirname, 'files');
const localDriveVirtualPath = '/file';

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

async function createDriveFolderIfNotExists() {
  try {
    await access(localDrivePath, constants.R_OK | constants.W_OK);
    console.log('Can access folder', localDrivePath);
  } catch (err) {
    const pathDoesNotExist = err.code === 'ENOENT';
    if (pathDoesNotExist) {
      console.log('Creating folder', localDrivePath);
      await mkdir(localDrivePath);
    } else {
      throw err;
    }
  }
}

createDriveFolderIfNotExists();

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

app.get(localDriveVirtualPath, async (req, res) => {
  const files = await readdir(localDrivePath);
  files.sort(compareStringsCaseInsensitive);
  res.send(files);
});

app.get(`${localDriveVirtualPath}/:name`, (req, res) => {
  const actualFilePath = path.resolve(localDrivePath, req.params.name);
  res.sendFile(actualFilePath);
});

app.put(`${localDriveVirtualPath}/:name`, async (req, res) => {
  const fileName = path.normalize(`/${req.params.name}`);
  const filePath = path.normalize(path.join(localDrivePath, fileName));
  try {
    await writeFile(filePath, req.body);
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
