$(function() {
	define(function(require, exports, module) {
		var a = require('baseFunc');
		a.init($('.page'));
		$('.turn-btn').on('click', a.nextPage);
	});
});
