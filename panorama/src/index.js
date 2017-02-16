function SubType() {
	this.$container = document.querySelector('#container');
	this.I = 0;
	this.J = 0;
	this.rowNum = 10;
	this.colNum = 6;
	this.max = 60;
	this.conWidth = 1024;
	this.conHeight = 450;
	this.prevX = 0;
}

SubType.prototype = {
	init: function() {
		var img = new Image(),
			url = './src/Group.jpg',
			_this = this;

		img.onload = function() {
			_this.$container.style.backgroundImage = 'url('+url+')';

			var hammer = new Hammer(_this.$container);

			hammer.on('pan', function(e) {
				// console.log(e);

				if (e.deltaX > _this.prevX) {
					_this.rotate('anti');
				} else {
					_this.rotate('clockwise');
				}

				_this.prevX = e.deltaX;

			});
		}
		img.src = url;
		this.createMatrix();
	},

	rotate(type) { //clockwise: 顺时针, anti: 逆时针 
		if (type == 'clockwise') {
			this.I ++;

			if (this.I >= this.colNum) {
				this.I = 0;
				this.J ++;
				if (this.J >= this.rowNum) this.J = 0;
			}

		} else if (type == 'anti') {
			this.I --;

			if (this.I < 0) {
				this.I = this.colNum - 1;
				this.J --;
				if (this.J < 0) this.J = this.rowNum - 1;
			}
		}
		// console.log(this.I, this.J);
		this.changePosition();
	},

	changePosition() {
		// console.log(this.matrix[this.J][this.I]);
		this.$container.style.backgroundPosition = this.matrix[this.J][this.I];
	},

	createMatrix() {
		this.matrix = [];

		var arr = [],
			_this = this;

		for (var i = 0; i < this.max; i ++) {
			var position = '-' + _this.I * _this.conWidth + ' -' + _this.J * _this.conHeight;	
			arr.push(position);

			_this.I ++;

			if ((i+1) % _this.colNum == 0) {
				_this.matrix.push(arr);
				arr = [];
				_this.I = 0;
				_this.J ++;
			}
		}
		// console.log(this.matrix);
		this.I = 0;
		this.J = 0;
	}
};

var app = new SubType();

app.init();