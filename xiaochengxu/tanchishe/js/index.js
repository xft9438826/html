var tar=null;//用于控制移动的方向的一个参照值
var speed=500;//默认初始速度(定时器刷新的时间间隔)
var score=0;//得分
//用于操作DOM的元素
var oWall=null;
var oHeader=null;
var aFlow=null;
var vFlow=null;
var aFood=null;
var oScore=null;
var oTop=null;
var oLeft=null;
var oTopNew=null;
var oTopOld=null;
var oLeftNew=null;
var oLeftOld=null;
//用于定时器命名
var timer=null;
var timer1=null;
var timer2=null;
//用于获取特定元素的top,left
var tarX=null;
var tarY=null;
window.onload=function () {
	oWall=document.getElementById('wall');
	oHeader=document.getElementById('header');
	aFlow=document.getElementsByClassName('flow');
	vFlow=document.getElementById('flow');
	oScore=document.getElementById('score');
	
	//初始位置
	oHeader.style.top=300+'px';
	oHeader.style.left=400+'px';
	
	//根据得分设置速度和死亡后删除多余长度并清除所有食物
	setInterval(function () {
		aFood=oWall.getElementsByClassName('food');
		if (oTop > 575 || oTop < 0 || oLeft > 775 || oLeft < 0) {
			for (var i=0; i<aFood.length; i++) {
				oWall.removeChild(aFood[i]);
			}
			for (var j=3; j<aFlow.length; j++) {
				oWall.removeChild(aFlow[j]);
			}
		}
		
		if (score<5) {
			speed=500;
		} else if (score<15) {
			speed=400;
		} else if (score<30) {
			speed=300;
		} else if (score<50) {
			speed=200;
		} else {
			speed=150;
		}
	},30)
	
	//设置初始移动方向
	timer=setInterval(function () {
		tar=87;
		oTop=oHeader.offsetTop;
		oLeft=oHeader.offsetLeft;
		oHeader.style.top=oTop-25+'px';
		vFlow.style.top=oTop+'px';
		vFlow.style.left=oLeft+'px';
		
		moveB();
	},speed);
	
	//根据按键移动
	//w:87; s:83; a:65; d:68;
	document.onkeydown=function () {
		if (event.keyCode == 87) {
			tar=87;
			move(tar, -25, speed);
		} else if (event.keyCode == 83) {
			tar=83;
			move(tar, 25, speed);
		} else if (event.keyCode == 65) {
			tar=65;
			move(tar, -25, speed);
		} else if (event.keyCode == 68) {
			tar=68;
			move(tar, 25, speed);
		}
	}
	
	work1();
	
	work2();
}

//封装的用于移动的方法
var move=function (tar, obj) {
	if (tar == 87 || tar == 83) {
		clearInterval(timer);
		timer=setInterval(function () {
			oTop=oHeader.offsetTop;
			oLeft=oHeader.offsetLeft;
			oHeader.style.top=oTop+obj+'px';
			vFlow.style.top=oTop+'px';
			vFlow.style.left=oLeft+'px';
			
			moveB();
		},speed);
	} else{
		clearInterval(timer);
		timer=setInterval(function () {
			oTop=oHeader.offsetTop;
			oLeft=oHeader.offsetLeft;
			oHeader.style.left=oLeft+obj+'px';
			vFlow.style.top=oTop+'px';
			vFlow.style.left=oLeft+'px';
			
			moveB();
		},speed);
	}
}

//封装的身体的移动
//原理:站在前一个的位置上
var moveB=function () {
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
}

//判断死亡和得分
var work1=function () {
	clearInterval(timer1);
	timer1=setInterval(function () {
		aFood=oWall.getElementsByClassName('food');
		if (oTop > 575 || oTop < 0 || oLeft > 775 || oLeft < 0) {
			alert("已死亡，请重新开始");
			oHeader.style.top=300+'px';
			oHeader.style.left=400+'px';
			score=0;
			oScore.innerHTML='得分：'+score;
		}
		for (var i=0; i<aFood.length; i++) {
			tarX=aFood[i].offsetLeft;
			tarY=aFood[i].offsetTop;
			if (tarX == oLeft && tarY == oTop) {
				score++;
				aFood[i].className='lj';
				oScore.innerHTML='得分：'+score;
				var newFlow=document.createElement('div');
				newFlow.className='flow';
				oWall.appendChild(newFlow);
			}
		}
	},speed);
}

//随机生成食物，控制场上食物少于10个
var work2=function () {
	clearInterval(timer2);
	timer2=setInterval(function () {
		if (aFood.length<10) {
			var x=Math.round(Math.random()*31)*25;
			var y=Math.round(Math.random()*23)*25;
			var oFood=document.createElement('div');
		
			oFood.className='food';
			oFood.style.top=y+'px';
			oFood.style.left=x+'px';
			oWall.appendChild(oFood);
		}
	},speed*10);
}