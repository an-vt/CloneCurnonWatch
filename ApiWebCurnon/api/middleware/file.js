const multer = require('multer');
const fs = require('fs')
const http = require('http')
const request = require('request')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __basedir + "/resources/static/assets/uploads/");
    },
    filename: function (req, file, cb) {
        console.log(file.originalname);
        var typeImgae = (file.originalname).split('.')
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + typeImgae[1];
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

exports.upload = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: fileFilter
});

exports.download = async (req, res) => {
    let imageDirectory = "resources/static/assets/uploads/" + req.params.image
    await fs.readFile(imageDirectory, (err, imageData) => {
        if (err) {
            res.json({
                result: "Failed",
                message: "Cannot download image!"
            })
        }
        res.end(imageData)
    })
};