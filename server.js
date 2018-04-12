const express = require('express');
const app = express();
const path = require('path');

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/allure-data'));

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', (req, res) => res.sendFile(path.join(__dirname + '/allure-data/index.html')));

// Start the app by listening on the default
app.listen(process.env.PORT || 8080);
