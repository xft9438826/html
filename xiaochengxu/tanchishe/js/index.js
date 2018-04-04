window.onload=function () {
	var oWall=document.getElementById('wall');
	var oHeader=document.getElementById('header');
	var aFlow=document.getElementsByClassName('flow');
	var vFlow=document.getElementById('flow');
	var timer=null;
	var tar=null;
	var speed=500;
	
	oHeader.style.top=300+'px';
	oHeader.style.left=400+'px';
	var oTop=null;
	var oTopNew=null;
	var oTopOld=null;
	var oLeft=null;
	var oLeftNew=null;
	var oLeftOld=null;
	timer=setInterval(function () {
		tar=87;
		oTop=oHeader.offsetTop;
		oLeft=oHeader.offsetLeft;
		oHeader.style.top=oTop-25+'px';
		vFlow.style.top=oTop+'px';
		vFlow.style.left=oLeft+'px';
	},speed);
	
	/*
		w:87;
		s:83;
		a:65;
		d:68;
	*/
	document.onkeydown=function () {
		if (event.keyCode == 87) {
			//上
			tar=87;
			move(tar, -25);
		} else if (event.keyCode == 83) {
			//下
			tar=83;
			move(tar, 25);
		} else if (event.keyCode == 65) {
			//左
			tar=65;
			move(tar, -25);
		} else if (event.keyCode == 68) {
			//右
			tar=68;
			move(tar, 25);
		}
	}
	
	function move (tar, obj) {
		if (tar == 87 || tar == 83) {
			clearInterval(timer);
			timer=setInterval(function () {
				oTop=oHeader.offsetTop;
				oLeft=oHeader.offsetLeft;
				oHeader.style.top=oTop+obj+'px';
				vFlow.style.top=oTop+'px';
				vFlow.style.left=oLeft+'px';
			},speed);
		} else{
			clearInterval(timer);
			timer=setInterval(function () {
				oTop=oHeader.offsetTop;
				oLeft=oHeader.offsetLeft;
				oHeader.style.left=oLeft+obj+'px';
				vFlow.style.top=oTop+'px';
				vFlow.style.left=oLeft+'px';
			},speed);
		}
	}

	setInterval(function () {
		oTopOld=aFlow[0].offsetTop;
		oLeftOld=aFlow[0].offsetLeft;
		aFlow[0].style.top=oTop+'px';
		aFlow[0].style.left=oLeft+'px';
		
		oTopNew=aFlow[1].offsetTop;
		oLeftNew=aFlow[1].offsetLeft;		
		aFlow[1].style.top=oTopOld+'px';
		aFlow[1].style.left=oLeftOld+'px';
		
		for (var i=2; i<aFlow.length; i++) {
			if (i%2 == 0) {
				oTopOld=aFlow[i].offsetTop;
				oLeftOld=aFlow[i].offsetLeft;
				aFlow[i].style.top=oTopNew+'px';
				aFlow[i].style.left=oLeftNew+'px';
			} else{
				oTopNew=aFlow[i].offsetTop;
				oLeftNew=aFlow[i].offsetLeft;
				aFlow[i].style.top=oTopOld+'px';
				aFlow[i].style.left=oLeftOld+'px';
			}
		}
	},speed);
	
	setInterval(function () {
		var aFood=document.getElementsByClassName('food');
		var tarX=null;
		var tarY=null;
		if (oTop > 575 || oTop < 0 || oLeft > 775 || oLeft < 0) {
			alert("已死亡，请重新开始");
			oHeader.style.top=300+'px';
			oHeader.style.left=400+'px';
			
			for (var i=0; i<aFood.length; i++) {
				aFood[i].style.top=-100+'px';
				aFood[i].style.left=-100+'px';
			}
		}
		for (var i=0; i<aFood.length; i++) {
			tarX=aFood[i].offsetLeft;
			tarY=aFood[i].offsetTop;
			if (tarX == oLeft && tarY == oTop) {
				aFood[i].style.top=-100+'px';
				aFood[i].style.left=-100+'px';
			}
		}
	},speed);
	
	setInterval(function () {
		var x=Math.round(Math.random()*31)*25;
		var y=Math.round(Math.random()*23)*25;
		var oFood=document.createElement('div');
		
		oFood.className='food';
		oFood.style.top=y+'px';
		oFood.style.left=x+'px';
		oWall.appendChild(oFood);
		
	},5000);
}