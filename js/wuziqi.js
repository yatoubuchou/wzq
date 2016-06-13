$(function(){
   var canvasS=450;
   var row=15;
   var blockS=canvasS/row;
   var ctx=$('#canvas').get(0).getContext('2d');
   var starRadius=3;
   $('canvas').get(0).width=canvasS;
   $('canvas').get(0).height=canvasS;

   
   var draw=function(){
   	  var jiange=blockS/2+0.5;
   	  var lineWidth=canvasS-blockS;

 ///////画横线
        ctx.save()
        ctx.beginPath()
        ctx.translate(jiange,jiange)
        ctx.moveTo(0,0)
        ctx.lineTo(lineWidth,0)
        for(var i=0;i<row;i++){
     	    ctx.translate(0,blockS)
     	    ctx.moveTo(0,0)
     	    ctx.lineTo(lineWidth,0)
        }
     	     ctx.stroke()
             ctx.closePath()
             ctx.restore()
 //////画竖线 
             ctx.save()
             ctx.beginPath()
             ctx.translate(jiange,jiange)
             ctx.moveTo(0,0)
             ctx.lineTo(0,lineWidth)
             for(var i=0;i<row;i++){
     	        ctx.translate(blockS,0)
     	        ctx.moveTo(0,0)
     	        ctx.lineTo(0,lineWidth)
             }
     	     ctx.stroke()
             ctx.closePath()
             ctx.restore()      	
 // 画棋盘点   
 var pointS=[3.5*blockS+0.5,11.5*blockS+0.5];
 for(var i=0;i<2;i++){
 	for(var j=0;j<2;j++){
 		var x=pointS[i];
 		var y=pointS[j];
 		ctx.save()
 		ctx.beginPath()
 		ctx.translate(x,y);
 		ctx.arc(0,0,3,0,(Math.PI/180*360));
 		ctx.fill();
 		ctx.closePath();
 		ctx.restore();
 	}
 }
 ctx.save()
 ctx.beginPath()
 ctx.translate(7.5*blockS+0.5,7.5*blockS+0.5)
 ctx.arc(0,0,3,0,(Math.PI/180*360));
 ctx.fill();
 ctx.closePath();
 ctx.restore();
}
draw();
 
 var qiziRadius = blockS/2*0.8;
 var drop=function(qizi){
	ctx.save()
	ctx.beginPath()
  ctx.translate((qizi.x+0.5)*blockS,(qizi.y+0.5)*blockS+0.5);
	ctx.arc(0,0,15,0,(Math.PI/180*360));
	if(qizi.color===1){
		ctx.fillStyle="black";
    $('#black_play').get(0).play();
	}else{
		ctx.fillStyle="white";
    $('#white_play').get(0).play();

	}
	ctx.fill()
	ctx.closePath()
	ctx.restore()
}      
var kaiguan=true;
var step=1;
var All={};
var panduan=function(qizi){
	var shuju={};
		$.each(All,function(k,v){
			if(v.color===qizi.color){
				shuju[k]=v;
			}
		})
		var shu = 1,heng=1,zuoxie=1,youxie=1;
		var tx,ty; 
	////竖线
		tx=qizi.x; ty=qizi.y;  
	    while( shuju[ tx + '-' + (ty+1) ]){
			shu++;ty++;
		}
		tx=qizi.x; ty=qizi.y;  
	    while( shuju[tx + '-' + (ty-1)]){
			shu++;ty--;
		}
  ////横线
        tx=qizi.x; ty=qizi.y;  
	    while( shuju[( tx+1) + '-' + ty ]){
			heng++;tx++;
		}
		tx=qizi.x; ty=qizi.y;  
	    while( shuju[( tx-1 )+ '-' + ty ]){
			heng++;tx--;
		}
  ////右斜线
        tx=qizi.x; ty=qizi.y;  
	    while( shuju[( tx+1) + '-' + (ty-1) ]){
			youxie++;tx++;ty--;
		}
		tx=qizi.x; ty=qizi.y;  
	    while( shuju[( tx-1 )+ '-' + (ty+1) ]){
			youxie++;tx--;ty++;
		}
    ////左斜线
        tx=qizi.x; ty=qizi.y;  
	    while( shuju[( tx-1) + '-' + (ty-1) ]){
			zuoxie++;tx--;ty--;
		}
		tx=qizi.x; ty=qizi.y;  
	    while( shuju[( tx+1 )+ '-' + (ty+1) ]){
			zuoxie++;tx++;ty++;
		}

		if(shu>=5||heng>=5||youxie>=5||zuoxie>=5){
			return true;
		}
}
$('#canvas').on('click',function(e){
	var x=Math.floor(e.offsetX/blockS);
	var y=Math.floor(e.offsetY/blockS);
   	   if(All[x + '-' + y]){  /////判断他只能点击一次
   	   	return;
   	   }
       var qizi;
   	   if(kaiguan){
   	   	var qizi={x:x,y:y,color:1,step:step};
   	   	drop(qizi);
   	   	kaiguan=false;
   	   	   if(panduan(qizi)){
   	   		   $('.cartel').show().find('#tishi').text('黑棋胜');
   	   	}
   	   }else{
   	   	var qizi={x:x,y:y,color:0,step:step};
   	   	drop(qizi);
   	   	kaiguan=true;
   	   	  if(panduan(qizi)){
             $('.cartel').show().find('#tishi').text('白棋胜');	
   	   	}
   	  }
       step +=1;
   	   All[x + '-' + y]=qizi;
   	})

    $('#restart').on('click',function(){
      $('.cartel').hide();
      ctx.clearRect(0,0,600,600);
      draw();
      kaiguan=true;
      All={};
      step=1;
    })
    $('#qipu').on('click',function(){
      $('cartel').hide();
      $('#save').show();
      ctx.save();
      ctx.font="20px 微软雅黑";
      for(var i in All){
        if(All[i].color===1){
          ctx.fillStyle="#fff";
        }else{
          ctx.fillStyle="black";
        }
        ctx.textAlign="center";
        ctx.textBaseline="middle";
        ctx.fillText(All[i].step,(All[i].x+0.5)*blockS,(All[i].y+0.5)*blockS);
      }
      ctx.restore()
      // var image=$('#canvas').get(0).toDataURL('jpg',1);
      // $('#save').attr('href',image);
      // $('#save').attr('download','qipi.png');
    })

    $('.tips').on('click',false);
    $('#close').on('click',function(){
          $('.cartel').hide();
         })
      $('.cartel').on('click',function(){
        $(this).hide();
    })


})