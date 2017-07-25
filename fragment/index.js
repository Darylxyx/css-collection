window.onload = function() {
	var ctx = document.querySelector('#myCanvas').getContext('2d'),
		img = document.querySelector('#imgA');

	ctx.beginPath();

    ctx.drawImage(img, 0, 0, 960, 540, 0, 0, 400, 225);
    ctx.drawImage(img, 960, 0, 960, 540, 400, 0, 400, 225);
    ctx.drawImage(img, 0, 540, 960, 540, 0, 225, 400, 225);
    ctx.drawImage(img, 960, 540, 960, 540, 400, 225, 400, 225);
    
    ctx.closePath();
    ctx.stroke();
};