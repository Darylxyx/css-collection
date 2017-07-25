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
    				this.ctx.drawImage(this.currentImg, this.DW*j, this.DH*i, this.DW, this.DH, this.dw*j, this.dh*i, this.dw, this.dh);
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
    				_this.ctx.clearRect(_this.dw*j, _this.dh*i, _this.dw, _this.dh);

    				if (actH <= 0) {
    					turnFlag = true;
    					img = nextImg;
    				}

    				if (turnFlag && actH >= _this.dh) {
    					clearInterval(intervalObj);
    				}

    				turnFlag ? actH += 1 : actH -= 1;

    				_this.ctx.drawImage(img, _this.DW*j, _this.DH*i, _this.DW, _this.DH, _this.dw*j, _this.dh*i, _this.dw, actH);

    			}, 2);
    	},

    	countAround(i, j) {
    		console.log(i, j);
    		var resArr = [];
    		// resArr.push(i-1+','+j);
    		// resArr.push(i+1+','+j);
    		// resArr.push(i+','+(j-1));
    		// resArr.push(i+','+(j+1));
    		// console.log(resArr);
    	}
    };

    var app = new SubType();

    app.init();

   	app.handleDraw(app.imgList[1], 3, 7);

   	app.countAround(3, 3);
};