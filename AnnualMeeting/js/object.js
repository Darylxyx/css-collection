define(function(require, exports, module) {
	
	function Person(list, container, width, height, duration) {
		this.list = list;
		this.$container = container;
		this.photoWidth = width;
		this.photoHeight = height;
		this.duration = duration;
		this.endFlag = false;
	}

	Person.prototype = {
		createList: function() {
			var templ = '',
				_this = this;
			$.each(this.list, function(index, item) {
				templ += '<div data-name="'+item.name+'" class="photo-item l bgImg" style="background-image:url('+item.photo+');width:'+_this.photoWidth+'px;height:'+_this.photoHeight+'px">' +
							'<p class="name name-animate" style="font-size:'+_this.photoWidth * 0.12+'px">'+item.name+'</p>'+
						 '</div>';
			});
			this.$container.html(templ);
		},

		createCircle: function() {
			var _this = this;
			this.$container.animate({top: '-'+this.photoHeight}, this.duration, 'linear', function() {
				var firstNode = $(this).find('.photo-item').first();
				if (!_this.endFlag) {
					var cloneNode = firstNode.clone();
					$(this).append(cloneNode).css('top','0');
					firstNode.remove();
				} else {
					$(this).css('top','0');
					firstNode.remove();
					_this.endFlag = false;
				}
			});
		}
	};
	module.exports = Person;
})