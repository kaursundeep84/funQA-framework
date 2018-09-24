const express = require('express');
const app = express();
const path = require('path');
const opn = require('opn');

const directoryToServe = path.join(__dirname, '/allure-report');

// Run the app by serving the static files
// in the dist directory
app.use(express.static(directoryToServe));

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', (req, res) => res.sendFile(path.join(directoryToServe, 'index.html')));

// Start the app by listening on the default
app.listen(process.env.PORT || 8080);
console.log(`Server started!\nVisit http://localhost:${process.env.PORT || 8080} in your browser to see the results.`)
opn(`http://127.0.0.1:${process.env.PORT || 8080}`);
