// author by pinguo-xieyuxiao 2016.1.28
$(function() {
	define(function(require, exports, module) {
		var c360 = require('baseFunc');

		c360.init($('.page'));

		$('.btn-turn').on('click', c360.nextPage);

		$('.btn-start').on('click', c360.start);

		$('.btn-stop').on('click', c360.stop);
	});
});
