var http = require("http"),
    fs = require("fs");

var imgPath = 'http://img.lexus.do2014.cn/images/es/car/spoke10a/Red_Mica_Crystal_Shine/';

fs.mkdir('./images', (err) => {
    if (err && err.code != 'EEXIST') return;
    downloadImg();
});

function downloadImg() {
    for (var i = 0; i < 60; i ++) {
        var url = imgPath + i + ".jpg!t1024x450.jpg";
        // console.log(url);
        ((i) => {
             http.get(url, (res) => {
                var out = fs.createWriteStream('./images/'+i+'.jpg', {
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