Local Drive
---
Upload and download files over a local wifi network. Use HTTP so that clients can access it with a web browser.

# Usage
```bash
# In a terminal, run frontend
cd frontend
# If you're modifying files
ng build --watch
# If you're not modifying files
ng build

# In a separate terminal, run backend
node index.js
```

# Roadmap

## Done
- Set up frontend and backend folder structure
- Hello world frontend
- Hello world backend
- Can serve main.js, runtime.js, etc.
- frontend can list files
- frontend can download files
- backend can return list of files
- frontend can upload new files
- backend can upload new files

## Todo



# Features
- Client can access server using a web browser and IP address and port
- Client can upload files to server
- Client can download files from server
- There is a root folder with files

# Limitations
- No nested folders allowed
- Can't delete files
- Can't rename files
- Can't search for files easily (but you can use Ctrl+F)

# Prerequisites
- Client and Server are on same wifi network

# Implementation Proposal

## Angular Frontend
- Lists the files in the folder
- When you click a file, you download it
- There is a button that allows you to upload files to the folder

## Express Backend
- Server runs node/express
- GET /path/to/file returns the file
- PUT /path/to/file uploads the file
