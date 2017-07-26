window.onload = function() {

    function SubType() {
    	var doc = document;
    	this.cvs = doc.querySelector('#myCanvas');
    	this.ctx = this.cvs.getContext('2d');
    	this.imgList = doc.querySelectorAll('.img');
    	this.imgIndex = 0;

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

    		this.ctx.beginPath();

    		for (var i = 0; i < this.I; i ++) {
    			for (var j = 0; j < this.J; j ++) {
    				this.ctx.drawImage(this.imgList[this.imgIndex], this.DW*j, this.DH*i, this.DW, this.DH, this.dw*j, this.dh*i, this.dw, this.dh);
    			}
    		}

    		this.ctx.closePath();
    		this.ctx.stroke();
    	},

    	start(i, j, callback) {

    		this.imgIndex ++;

    		if (this.imgIndex > (this.imgList.length - 1)) this.imgIndex = 0;

    		var _this = this,
    			dst = 0,
    			intervalObj = setInterval(function() {
	    			var resArr = _this.countAround(i, j, dst);

	    			resArr.forEach(function(item, index) {
	    				_this.handleDraw(app.imgList[_this.imgIndex], item.x, item.y);
	    			});
	    			
	    			if (!resArr.length) {
	    				clearInterval(intervalObj);
	    				return callback();
	    			}
	    			dst ++;
	    		}, 30);
    	},

    	handleClick(e) {
    		var offsetX = e.offsetX,
    			offsetY = e.offsetY,
    			j = Math.floor(offsetX / this.dw),
    			i = Math.floor(offsetY / this.dh);

    		// console.log(i, j);

    		this.start(i, j, function() {

    		});

    	},

    	handleDraw(nextImg, i, j) { //负责绘制，nextImg: 下张图片；i: 单元行号；j: 单元列号
    		var _this = this,
    			actH = this.dh,
    			turnFlag = false;

    			this.ctx.clearRect(this.dw*j, this.dh*i, this.dw, this.dh);

    			this.ctx.drawImage(this.imgList[this.imgIndex], this.DW*j, this.DH*i, this.DW, this.DH, this.dw*j, this.dh*i, this.dw, actH);

    			// intervalObj = setInterval(function() {
    			// 	_this.ctx.clearRect(_this.dw*j, _this.dh*i, _this.dw, _this.dh);

    			// 	if (actH <= 0) {
    			// 		turnFlag = true;
    			// 		img = nextImg;
    			// 	}

    			// 	if (turnFlag && actH >= _this.dh) {
    			// 		clearInterval(intervalObj);
    			// 	}

    			// 	turnFlag ? actH += 50 : actH -= 50;

    			// 	actH = actH > _this.dh ? _this.dh : actH;

    			// 	_this.ctx.drawImage(img, _this.DW*j, _this.DH*i, _this.DW, _this.DH, _this.dw*j, _this.dh*i, _this.dw, actH);

    			// }, 20);
    	},

    	countAround(i, j, dst) {
    		// console.log(i, j);
    		var resArr = [];
    		for (var m = (i-dst); m <= (i+dst); m++) {
    			for (var n = (j-dst); n <= (j+dst); n++) {
    				if ((Math.abs(m-i) + Math.abs(n-j) == dst) && (m >=0 && n >= 0) && (m <= (this.I-1) && n <= (this.J-1))) {
    					resArr.push({x: m, y: n});
    				}
    			}
    		}
    		// console.log(resArr);
    		return resArr;
    	}
    };

    var app = new SubType();

    app.init();

    app.cvs.onclick = function(e) {
    	app.handleClick(e);
    }

   	// app.handleDraw(app.imgList[1], 3, 7);

   	// app.start(15,0);

};