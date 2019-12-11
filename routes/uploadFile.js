const express = require('express');
const path = require('path');
const shortid = require('shortid');
const fs = require('fs');
const formidable = require('formidable');
const os = require('os');
const util = require('util');
const {Storage} = require('@google-cloud/storage');
const app = express();

const storage = new Storage({
    projectId: 'ajirkhabar',
    keyFilename: path.join(__dirname,"../ajirkhabar-3c865acc2bdd.json")
});

const bucketName = 'ajirkhabar';
const bucket = storage.bucket(bucketName);

exports.getFileInput = (req,res) => {
    let totalFileSize = null;
    let uploadedFileSize = null;
    if (req.method.toLowerCase() === 'post') {
        // console.log(req);
        const form = new formidable.IncomingForm({multiples: true});
       // form
        form.uploadDir = os.tmpdir();
        form.parse(req);

        form.on('file', function(field, file) {
            const Uname = shortid.generate()+file.name;
            const Fsname = bucket.file(Uname);
            fs.createReadStream(file.path)
            .pipe(Fsname.createWriteStream())
            .on('error', function(err) {})
            .on('finish', function() {
                    uploadedFileSize = uploadedFileSize + file.size;
                     if(totalFileSize === uploadedFileSize)
                     {
                        res.render('index',{msg:1});
                     }
                });
        });

     form.on('end', function() {
        totalFileSize = form._fileSize;
     });   
     form.on('error', function(err) {
        res.render('index',{msg:1});
     });

     form.on('aborted', function() {
        res.render('index',{msg:1});
     });

    } 
    
};