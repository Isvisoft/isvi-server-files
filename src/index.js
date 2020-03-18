// server.js

const express = require('express');
const app = express();
const port = process.env.PORT || 25478;

// cors conf
const cors = require('cors')({ origin: true });
app.use(cors);

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// routes 
app.use("/uploads", express.static(__dirname + '/../uploads')); //Serves resources from public folder

const uploadRoutes = require('./upload.route');
app.use('/', uploadRoutes);

// start 
app.listen(port, function () {
    console.log('Server is running on PORT', port);
});