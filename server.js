var express = require('express');
var busboy = require('connect-busboy'); //文件上传的中间件
var path = require('path');
var fs = require('fs-extra');
var app = express();
app.use(busboy());

app.use(express.static('public'));

app.get('/success',function(req,res,next){
    res.send("<h1>上传成功</h1><a href='/'>返回</a>");
});

app.post('/upload',function (req, res, next) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("正在上传: " + filename);
        fstream = fs.createWriteStream(__dirname + '/img/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            console.log("上传成功：" + filename);
            res.redirect('success');
        });
    });
});

var server = app.listen(3001, function() {
    console.log('监听端口:%d', server.address().port);
});