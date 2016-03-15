define(function(require, exports, module) {
	var a = {

		init: function($page) {

			//-------------------全局参数初始化----------------------

			this.prevCurrent = 0; //前一次页码（用于记录补抽页跳转）

			this.current = 0; //当前页码

			this.intervalObj = null;

			this.intervalDuration = 10;

			this.sliceArr = null; //随机拆分的名单列表

			this.$page = $page; //page集合

			this.nameList = require('nameList'); //名单列表

			this.isAnimating = false;

			this.isRunning = false;

			this.recordObj = {
				1: [],
				2: [],
				3: [],
				4: []
			};

			//------------------------------------------------------

			this.$page.each(function(index, item) {
				$(item).data('originalClassList', $(item).attr('class'));
			});
			this.$page.eq(0).addClass('page-current');

			this.screenWidth = document.body.clientWidth;
			this.itemWidth = Math.ceil(this.screenWidth * 0.1);
			this.itemHeight = Math.ceil(this.itemWidth * (3/2));

			$('.box-list').find('li').css({
				width: this.itemWidth,
				height: this.itemHeight
			});

			this.$page.eq(4).find('li').css({
				width: this.itemWidth * 2,
				height: this.itemHeight * 2
			});

			this.$page.eq(5).find('li').css({
				width: this.itemWidth * 2,
				height: this.itemHeight * 2
			});
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
					animationOutName = 'page-rotateCubeLeftOut page-ontop';
					animationInName = 'page-rotateCubeLeftIn';
					break;
				case 'cubeRight':
					animationOutName = 'page-rotateCubeRightOut page-ontop';
					animationInName = 'page-rotateCubeRightIn';
					break;
				case 'cubeTop':
					animationOutName = 'page-rotateCubeTopOut page-ontop';
					animationInName = 'page-rotateCubeTopIn';
					break;
				case 'cubeBottom':
					animationOutName = 'page-rotateCubeBottomOut page-ontop';
					animationInName = 'page-rotateCubeBottomIn';
			}

			var $outPage = $page.eq(current);

			if (type == 1) { //下一页
				if (current < pageCount) {
					current ++;
				} else {
					current = 0;
				}
			} else if (type == 0) { //上一页
				if (current > 1) {
					current --;
				} else {
					current = 4;
				}
			} else if (type == 3) { //前去补抽
				this.prevCurrent = current;
				current = 5;
			} else if (type == 2) { //补抽完成
				current = this.prevCurrent;
			}

			var $inPage = $page.eq(current);
			$inPage.addClass('page-current');

			this._initPageData(current);

			$outPage.find('.photo-cover').removeClass('hide');
			$outPage.find('.name').addClass('name-animate');

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

			if (_this.isRunning) { //正在抽奖
				return;
			};

			_this.isAnimating = true;

			var current = _this.current,
				type = $(this).attr('data-turnType'), //0:前一页 1:后一页 2:退出补抽页 3:前往补抽页
				animatName = '';
			
			console.log(current);
			switch(Math.floor(current)) {
				case 0:
					animatName = 'cubeTop';
					break;
				case 1:
					animatName = 'cubeLeft';
					break;
				case 2:
					if (type == 1) {
						animatName = 'cubeLeft';
					} else {
						animatName = 'cubeRight';
					}
					break;
				case 3:
					if (type == 1) {
						animatName = 'cubeBottom';
					} else {
						animatName = 'cubeRight';
					}
					break;
				case 4:
					animatName = 'cubeTop';
					break;
			}

			if (type == 2) {
				animatName = 'cubeBottom';
			} else if (type == 3) {
				animatName = 'cubeTop';
			}

			if (animatName) {
				_this._turnPage(current, animatName, type);
			}
		},

		_initPageData: function(current) {
			var Person = require('object'),
				itemWidth = this.itemWidth,
				itemHeight = this.itemHeight,
				_this = this;

			if (current == 4) { //一等奖领奖页
				this.sliceArr = this._sliceList(2);
				itemWidth *= 2;
				itemHeight *= 2;
			} else if (current == 5) { //补抽页
				this.sliceArr = this._sliceList(1);
				itemWidth *= 2;
				itemHeight *= 2;
			} else { //其他页
				this.sliceArr = this._sliceList(10);
			}

			this.objArr = [];

			$.each(this.sliceArr, function(index, item) {
				var obj = new Person(item, _this.$page.eq(current).find('.photo-list').eq(index), itemWidth, itemHeight, _this.intervalDuration);
				obj.createList();
				_this.objArr.push(obj);
			});
		},

		_sliceList: function(num) {
			
			if (this.sliceArr) { //是否分割过名单列表
				this._joinList();
			}
			
			var nameList = this.nameList,
				dataLength = nameList.length,
				range = Math.round(dataLength / num),
				slicePosition = 0,
				sliceArr = [];

			console.log(this.nameList.length);

			//打乱数组
			nameList.sort(function() {return 0.5 - Math.random()});
			
			for (var i = 0; i < num; i ++) {
				var arr = null;
				if (i !== (num - 1)) {
					arr = nameList.slice(slicePosition, slicePosition + range);
				} else {
					arr = nameList.slice(slicePosition);
				}
				slicePosition += range;
				sliceArr.push(arr);
			}
			return sliceArr;
		},

		start: function() {
			var _this = a;

			if (_this.isRunning) {
				return;
			}
			
			_this.$page.eq(_this.current).find('.photo-cover').addClass('hide');

			_this.isRunning = true;

			console.log(_this.sliceArr);

			_this.intervalObj = window.setInterval(function() {
				$.each(_this.objArr, function(index, item) {
					item.createCircle();
				});
			},_this.intervalDuration);
		},

		stop: function() {
			var _this = a;

			if (!_this.isRunning) {
				return;
			}

			window.clearInterval(_this.intervalObj);
			window.setTimeout(function() {
				_this.$page.eq(_this.current).find('.photo-list').each(function(index) {
					var checked = $(this).find('.photo-item').first();
					_this._removePerson(index, checked.attr('data-name'));
					//显示名字
					checked.find('.name').removeClass('name-animate');
					_this.isRunning = false;
				});
				console.log(_this.recordObj);
			}, 500);
		},

		_removePerson: function(index, name) {
			this.objArr[index].endFlag = true;
			var deleteIndex = -1;
			$.each(this.sliceArr[index], function(index0, item) {
				if (item.name == name) {
					deleteIndex = index0;
					return;
				}
			});
			this.sliceArr[index].splice(deleteIndex, 1);
			this._recordPerson(name);
		},

		_joinList: function() {
			var arr = [];
			$.each(this.sliceArr, function(index, item) {
				arr = arr.concat(item);
			});
			this.nameList = arr;
		},

		_recordPerson: function(name) {
			// console.log(this.current, name);

			var current = this.current == 5 ? this.prevCurrent : this.current;

			this.recordObj[current].push(name);
			window.localStorage.setItem('recordObj',JSON.stringify(this.recordObj));
		},

		_checkPersonRepeat: function() {
			var record = this.recordObj,
				arr = [];
			for (var o in record) {
				$.each(record[o], function(index, item) {
					arr.push(item);
				});
			}
			$.each(arr, function(index, item) {
				
			});
		}
	};

	module.exports = a;
})