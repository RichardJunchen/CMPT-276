const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});


// https://stackoverflow.com/questions/30838901/error-handling-when-uploading-file-using-multer-with-expressjs
function uploadFile(req, res, next) {
    var upload = multer({ storage : storage }).array('productPhotos',10)
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.render('404');
        } else if (err) {
            res.render('404');
        }
        // No errors during upload, call the next middleware function (leads to controller)
    })
    console.log(req.session.isAdmin);
    res.render('home', {admin: req.session.isAdmin});
}
module.exports = {
  uploadFile
}