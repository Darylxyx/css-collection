window.onload = function() {
	// var ctx = document.querySelector('#myCanvas').getContext('2d'),
	// 	img = document.querySelector('#imgA');

	// ctx.beginPath();

 //    ctx.drawImage(img, 0, 0, 960, 540, 0, 0, 400, 225);
 //    ctx.drawImage(img, 960, 0, 960, 540, 400, 0, 400, 225);
 //    ctx.drawImage(img, 0, 540, 960, 540, 0, 225, 400, 225);
 //    ctx.drawImage(img, 960, 540, 960, 540, 400, 225, 400, 225);
    
 //    ctx.closePath();
 //    ctx.stroke();

    function SubType() {
    	var doc = document;
    	this.ctx = doc.querySelector('#myCanvas').getContext('2d');
    	this.img = doc.querySelector('#imgA');

    	this.I = 16;
    	this.J = 9;
    	this.dw = 50;
    	this.dh = 50;

    	this.imgW = 1920;
    	this.imgH = 1080;
    }

    SubType.prototype = {
    	init() {
    		this.ctx.beginPath();

    		var DW = this.imgW / this.I,
    			DH = this.imgH / this.J;

    		for (var i = 0; i < this.I; i ++) {
    			for (var j = 0; j < this.J; j ++) {
    				this.ctx.drawImage(this.img, DW*i, DH*j, DW, DH, this.dw*i, this.dh*j, this.dw, this.dh);
    			}
    		}

    		this.ctx.closePath();
    		this.ctx.stroke();
    	}
    };

    var app = new SubType();

    app.init();
};