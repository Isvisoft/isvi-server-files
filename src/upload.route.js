var express = require('express');

var app = express();
const fs = require('fs');

var multer = require('multer');
const exec = require('child_process').exec;

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("req", req.body.folder)

        const folder = req.body.folder;

        if (folder) {
            if (!fs.existsSync('uploads/' + folder)) {
                fs.mkdirSync('uploads/' + folder);
            }
            cb(null, 'uploads/' + folder)
        } else {
            cb(null, 'uploads')
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })


app.post('/', upload.single('file'), (req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    const folder = req.body.folder;
    if (folder) {
        res.send({ ok: true, path: "uploads/" + folder + "/" + file.originalname })
    } else {
        res.send({ ok: true, path: "uploads/" + file.originalname })
    }

})

app.get('/', (req, res, next) => {

    res.send({ ok: true })

})

module.exports = app;