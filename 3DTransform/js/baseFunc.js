define(function(require, exports, module) {
	var a = {

		init: function($page) {

			this.current = 0; //当前页码

			this.intervalObj = null;

			this.$page = $page; //page集合

			this.$point = $('.point');

			// this.$pointList = $('.point-list').find('li');

			this.$page.each(function(index, item) {
				$(item).data('originalClassList', $(item).attr('class'));
			});

			this.$page.eq(0).addClass('page-current');

			// this.$pointList.eq(0).addClass('checked-point');

			this.isAnimating = false;
		},

		_turnPage: function(current, style, type) {

			var $page = this.$page,
				pageCount = $page.length,
				animationInName = '',
				animationOutName = '',
				animationEventNames = {
					'WebkitAnimation' : 'webkitAnimationEnd',
					'OAnimation' : 'oAnimationEnd',
					'msAnimation' : 'MSAnimationEnd',
					'animation' : 'animationend'
				},
				animationEventName = animationEventNames[Modernizr.prefixed('animation')],
				_this = this;

			// console.log(animationEventName);

			switch(style) {
				case 'cubeLeft':
					animationOutName = 'page-cubeLeftOut page-ontop';
					animationInName = 'page-cubeLeftIn';
					break;
				case 'cubeRight':
					animationOutName = 'page-cubeRightOut page-ontop';
					animationInName = 'page-cubeRightIn';
					break;
				case 'cubeTop':
					animationOutName = 'page-cubeTopOut page-ontop';
					animationInName = 'page-cubeTopIn';
					break;
				case 'cubeBottom':
					animationOutName = 'page-cubeBottomOut page-ontop';
					animationInName = 'page-cubeBottomIn';
			}

			var $outPage = $page.eq(current);

			if (type == 1) { //下一页
				if (current < pageCount - 1) {
					current ++;
				} else {
					current = 0;
				}
			} else if (type == 0) { //上一页
				if (current > 0) {
					current --;
				} else {
					current = pageCount - 1;
				}
			}

			var $inPage = $page.eq(current);
			$inPage.addClass('page-current');

			_this._checkPoint(current);

			$outPage.addClass(animationOutName).on(animationEventName, function() {
				$outPage.off(animationEventName).attr('class', $outPage.data('originalClassList'));
			});

			$inPage.addClass(animationInName).on(animationEventName, function() {
				$('.logo-box').hide();
				$inPage.off(animationEventName).attr('class', $inPage.data('originalClassList') + ' page-current');
				_this.isAnimating = false;
				_this.current = current;
			});
		},

		nextPage: function() {

			var _this = a;

			if (_this.isAnimating) { //正在切换页面
				return;
			};

			_this.isAnimating = true;

			var current = _this.current,
				animatNames = ['cubeTop', 'cubeBottom', 'cubeLeft', 'cubeRight'],
				animatName = animatNames[Math.floor(Math.random() * 4)],
				type = $(this).attr('data-type');

			if (animatName) {
				_this._turnPage(current, animatName, type);
			}
		},

		_checkPoint: function(current) {
			this.$point.animate({
				marginLeft: current * 20
			},300,'linear');
		}
	};

	module.exports = a;
})