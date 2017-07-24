var http = require("http"),
    fs = require("fs");
var imgPath = 'http://open.youtu.qq.com/content/img/product/face/face_';

fs.mkdir('./downloadImg', (err) => {
    if (err && err.code != 'EEXIST') return;
    downloadImg();
});

function downloadImg() {
    for (var i = 0; i < 16; i ++) {

        var index = (function() {
            var j = i + 1;
            j = j < 10 ? '0'+j : j;
            return j;
        })();

        var url = imgPath + index + ".jpg?v=2.0";
        // console.log(url);
        ((i) => {
             http.get(url, (res) => {
                var out = fs.createWriteStream('./downloadImg/face_'+i+'.jpg', {
                    encoding: 'binary'
                });

                res.on('data', (chunk) => {
                    out.write(chunk);
                });

                res.on('end', () => {
                    console.log('Image_'+i+' download complete.');
                    out.end('');
                });
            });
        })(i);
    }
}