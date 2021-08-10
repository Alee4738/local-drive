Local Drive
---
Upload and download files over a local wifi network. Use HTTP so that clients can access it with a web browser.

# Roadmap

## Done
- Set up frontend and backend folder structure
- Hello world frontend
- Hello world backend
- Can serve main.js, runtime.js, etc.
- frontend can list files

## Todo
- backend can return list of files
- frontend can download files
- frontend can upload files



# Features
- Client can access server using a web browser and IP address and port
- Client can upload files to server
- Client can download files from server
- There is a root folder with files

# Limitations
- No nested folders allowed

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

# How to Run
```bash
# In a terminal, run frontend
cd frontend
ng build --watch

# In a separate terminal, Run backend
node index.js
```
