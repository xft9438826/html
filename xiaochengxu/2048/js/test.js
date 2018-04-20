var oBodd=null;
var aSmall=null;
var arr=[];
//用于方法font
var oScore=null;
var arrNum=[];
//用于方块定位
var aX1=null;
var aX2=null;
var aX3=null;
var aX4=null;
var aY1=null;
var aY2=null;
var aY3=null;
var aY4=null;
window.onload=function () {
	aSmall=document.getElementsByClassName('small');
	oBodd=document.getElementById('bodd');
	oScore=document.getElementById('score');
	
	//开启设置数字样式和得分的定时器
	setInterval(function () {
		font();
	},300);
	
	//加载页面时生成两个数字
	create();
	create();
}

document.onkeydown=function () {
	if (event.keyCode == 87) {
		//获取对应方向的所有数字，并移动
		aX1=oBodd.getElementsByClassName('x1');
		move1(aX1);
		aX2=oBodd.getElementsByClassName('x2');
		move1(aX2);
		aX3=oBodd.getElementsByClassName('x3');
		move1(aX3);
		aX4=oBodd.getElementsByClassName('x4');
		move1(aX4);
		
		create();
	} else if (event.keyCode == 83) {
		aX1=oBodd.getElementsByClassName('x1');
		move2(aX1);
		aX2=oBodd.getElementsByClassName('x2');
		move2(aX2);
		aX3=oBodd.getElementsByClassName('x3');
		move2(aX3);
		aX4=oBodd.getElementsByClassName('x4');
		move2(aX4);
		
		create();
	} else if (event.keyCode == 65) {
		aY1=oBodd.getElementsByClassName('y1');
		move1(aY1);
		aY2=oBodd.getElementsByClassName('y2');
		move1(aY2);
		aY3=oBodd.getElementsByClassName('y3');
		move1(aY3);
		aY4=oBodd.getElementsByClassName('y4');
		move1(aY4);
		
		create();
	} else if (event.keyCode == 68) {
		aY1=oBodd.getElementsByClassName('y1');
		move2(aY1);
		aY2=oBodd.getElementsByClassName('y2');
		move2(aY2);
		aY3=oBodd.getElementsByClassName('y3');
		move2(aY3);
		aY4=oBodd.getElementsByClassName('y4');
		move2(aY4);
		
		create();
	}
}

//封装的正方向移动
var move1=function (obj) {
	for (var i=0; i<obj.length; i++) {
		if (obj[i].innerHTML) {
			arr.push(parseInt(obj[i].innerHTML));
		}
		obj[i].innerHTML=null;
	}
	
	plus();
	
	for (var j=0; j<arr.length; j++) {
		if (obj[j]) {
			obj[j].innerHTML=arr[j];
		}
	}
	
	arr.splice(0,arr.length);
}
//封装的反方向移动
var move2=function (obj) {
	for (var i=obj.length-1; i>=0; i--) {
		if (obj[i].innerHTML) {
			arr.push(parseInt(obj[i].innerHTML));
		}
		obj[i].innerHTML=null;
	}
	
	plus();
	
	for (var j=obj.length-1; j>=0; j--) {
		if (arr[3-j]) {
			obj[j].innerHTML=arr[3-j];
		}
	}
	arr.splice(0,arr.length);
}

//用于计算移动时相等的数值的加和
var plus=function () {
	if (arr.length==2) {
		if (arr[0]==arr[1]) {
			arr[0]=arr[0]*2;
			arr.splice(1,1);
		}
	} else if (arr.length==3) {
		if (arr[0]==arr[1]) {
			arr[0]=arr[0]*2;
			arr.splice(1,1);
		} else if (arr[1]==arr[2]) {
			arr[1]=arr[1]*2;
			arr.splice(2,1);
		}
	} else if (arr.length==4) {
		if (arr[0]==arr[1]) {
			arr[0]=arr[0]*2;
			arr.splice(1,1);
		} else if (arr[1]==arr[2]) {
			arr[1]=arr[1]*2;
			arr.splice(2,1);
		} else if (arr[2]==arr[3]) {
			arr[2]=arr[2]*2;
			arr.splice(3,1);
		}
	}
}

//用于生成数字
var create=function () {
	var empty=0;
	for (var i=0; i<aSmall.length; i++) {
		if (!parseInt(aSmall[i].innerHTML)) {
			empty=empty+1;
		}
	}
	
	var vip1=10*(Math.random());
	var num=0;
	if (vip1>5) {
		num=2;
	} else{
		num=4;
	}
	
	var vip2=Math.floor(empty*(Math.random()));
	for (var i=0; i<aSmall.length; i++) {
		if (!parseInt(aSmall[i].innerHTML)) {
			vip2=vip2-1;
		}
		if (vip2<0) {
			aSmall[i].innerHTML=num;
			break;
		}
	}
}

//用于设置数字样式和得分
var font=function () {
	for (var i=0; i<aSmall.length; i++) {
		if (parseInt(aSmall[i].innerHTML)>1000) {
			aSmall[i].style.fontSize=25+'px';
			aSmall[i].style.color='red';
		} else if (parseInt(aSmall[i].innerHTML)>100) {
			aSmall[i].style.fontSize=30+'px';
			aSmall[i].style.color='orange';
		} else if (parseInt(aSmall[i].innerHTML)>10) {
			aSmall[i].style.fontSize=40+'px';
			aSmall[i].style.color='gray';
		} else {
			aSmall[i].style.fontSize=45+'px';
			aSmall[i].style.color='green';
		}
	}
	
	for (var i=0; i<aSmall.length; i++) {
		if (aSmall[i].innerHTML) {
			arrNum.push(parseInt(aSmall[i].innerHTML));
		}
	}
	
	for (var i=0; i<arrNum.length-1; i++) {
		if ((arrNum[i]-arrNum[i+1])>0) {
			oScore.innerHTML='得分：'+arrNum[i];
		} else {
			oScore.innerHTML='得分：'+arrNum[i+1];
		}
	}
	arrNum.splice(0,arrNum.length);
}