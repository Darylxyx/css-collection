window.onload = function() {

    function SubType() {
    	var doc = document;
    	this.ctx = doc.querySelector('#myCanvas').getContext('2d');
    	this.imgList = doc.querySelectorAll('.img');

    	this.currentImg = null;

    	this.imgW = 1920; //图片原始宽/高
    	this.imgH = 1080;

    	this.conW = 800; //画布宽/高
    	this.conH = 450;

    	this.dw = 50; //画面单元宽/高
    	this.dh = 50;

    	this.I = this.conH / this.dh; //单元行/列数
    	this.J = this.conW / this.dw;

    	this.DW = this.imgW / this.J; //原图单元宽/高
    	this.DH = this.imgH / this.I;
    }

    SubType.prototype = {
    	init() {
    		this.currentImg = this.imgList[0];

    		this.ctx.beginPath();

    		for (var i = 0; i < this.I; i ++) {
    			for (var j = 0; j < this.J; j ++) {
    				this.ctx.drawImage(this.currentImg, this.DH*j, this.DW*i, this.DW, this.DH, this.dh*j, this.dw*i, this.dw, this.dh);
    			}
    		}

    		this.ctx.closePath();
    		this.ctx.stroke();
    	},

    	handleDraw(nextImg, i, j) { //负责绘制，nextImg: 下张图片；i: 单元行号；j: 单元列号
    		var _this = this,
    			actH = this.dh,
    			turnFlag = false,
    			img = this.currentImg,
    			intervalObj = setInterval(function() {
    				_this.ctx.clearRect(_this.dw*i, _this.dh*j, _this.dw, _this.dh);

    				if (actH <= 0) {
    					turnFlag = true;
    					img = nextImg;
    				}

    				if (turnFlag && actH >= _this.dh) {
    					clearInterval(intervalObj);
    				}

    				turnFlag ? actH += 1 : actH -= 1;

    				_this.ctx.drawImage(img, _this.DH*j, _this.DW*i, _this.DW, _this.DH, _this.dh*j, _this.dw*i, _this.dw, actH);

    			}, 2);
    	}
    };

    var app = new SubType();

    app.init();

    // app.currentImg = app.imgList[1];

   	app.handleDraw(app.imgList[1], 0, 0);
};