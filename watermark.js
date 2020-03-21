
//mode  0: 默认出现显性水印和隐形水印。 1 只要隐性水印
(function(mode){

    function getCurrentTime() {
        var current = Date.now();
        var date = new Date(current);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
    
        return `${year}-${month}-${day} ${h}:${m}:${s}`;
    }

    var n = document.cookie.match('(^|;)?loginName=([^;]*)(;|$)')||document.cookie.match('(^|;)?username=([^;]*)(;|$)');
    var ip = document.cookie.match('(^|;)?ip_address=([^;]*)(;|$)')||document.cookie.match('(^|;)?ip=([^;]*)(;|$)');
    
    var gOaName = n?n[2] + '@'+ (ip?ip[2]+'<br />': '获取ip失败<br/>') + getCurrentTime() + '<br/>版权归 临沂市中信信息<br/>技术有限公司 所有<br />' :'版权归临沂市中信信息<br/>技术有限公司所有<br />违者必究<br/>' + getCurrentTime();
    var wmTop = window.top;
    var div  = document.createElement('div')
    div.id = "idmast"
    document.body.appendChild(div)
    var total = [];
    var onresize = false;
    !function(host){
        if(host.WMJS || wmTop.WMJS) return;
        host.WMJS = function () {
            var isIE9 = document.all && document.addEventListener && !window.atob;
            var front_rows0,front_cols0,
                front_rows1,front_cols1,
                front_x=0,   //x轴间距
                front_y=0,    //Y轴间距
                original_front_rows=0,
                original_front_cols=0,
                // original_front_x_space=120, //x轴密度
                // original_front_y_space=100, //Y轴密度
                original_front_x_space=100, //x轴密度
                original_front_y_space=80, //Y轴密度
                mask_txt= gOaName,  //水印字---------rtx
                color='#2e3035',   //字体颜色
                front_txt_alpha=0.1, //字体透明度 0~1
                font_size='12px',      //字体大小
                front_font='Helvetica Neue',  //字体
                width=100,  //宽间距
                height=50, //高间距
                angle=35 //字体倾斜度
            ;
            function remove_old_watermask_0(){
                for (var i = 0; i <= front_rows0; i++) {
                    for (var j = 0; j <= front_cols0; j++) {
                        var rmElm=document.getElementById('mask_0_elem'+i+j);
                        if(rmElm){
                            rmElm.parentNode.removeChild(rmElm);
                            // console.log('rm'+rmElm);
                        }
                    }
                }
            }
            function remove_old_watermask_1(){
                for (var i = 0; i <= front_rows1; i++) {
                    for (var j = 0; j <= front_cols1; j++) {
                        var rmElm=document.getElementById('mask_1_elem'+i+j);
                        if(rmElm){
                            rmElm.parentNode.removeChild(rmElm);
                            // console.log('rm'+rmElm);
                        }
                    }
                }
            }
            function getRotation(deg) {
                var deg2rad = Math.PI * 2 / 360;
                var rad = deg * deg2rad;
                var costheta = Math.cos(rad);
                var sintheta = Math.sin(rad);
                var M11 = costheta;
                var M12 = -sintheta;
                var M21 = sintheta;
                var M22 = costheta;
                return [M11,M12,M21,M22];
            }
            return {
                watermark: function (type) { 
                    eval('remove_old_watermask_'+type+'()')
                    var oTemp = document.createDocumentFragment();
                    if(type == 1){
                        oTemp = div
                    }
                    
                    var front_x_space=original_front_x_space;
                    var front_y_space=original_front_y_space;
                    var front_cols, front_rows
                    front_rows=original_front_rows;
                    front_cols=original_front_cols;
                    if(type == 1){
                        front_x_space = 200;
                        front_y_space = 90;
                        width = 60;
                        height= 80;
                        front_txt_alpha = 0.005;
                        font_size = '20px'
                    }else{
                        front_x_space = 200;
                        front_y_space = 80;
                        front_txt_alpha = 0.1;
                        width = 120;
                        height= 80;
                        font_size = '14px'              
                    }
                    var max_width=window.innerWidth- 45;
                    var max_height= window.innerHeight-45;
                    if(front_cols==0||(parseInt(front_x+width*front_cols+front_x_space*(front_cols-1))> max_width)){
                        front_cols=parseInt((front_x_space+max_width - front_x)/(width+front_x_space));
                        front_x_space=parseInt(((max_width - front_x)-width*front_cols)/(front_cols-1));
                        if(!front_x_space){
                            front_x_space=0;
                        }
                    }
                    if(front_rows==0||(parseInt(front_y+height*front_rows+front_y_space*(front_rows-1))> max_height)){
                        front_rows  =parseInt((front_y_space+max_height - front_y)/(height+front_y_space));
                        front_y_space=parseInt(((max_height - front_y)-height*front_rows)/(front_rows-1));
                        if(!front_y_space){
                            front_y_space=0;
                        }
                    }
                    if(type == 1){
                        front_rows1 = front_rows
                        front_cols1 = front_cols
                    }else{
                        front_rows0 = front_rows
                        front_cols0 = front_cols
                    }
                    var mask_elem=document.createElement('div');
                    var M=getRotation(-angle);
                    mask_elem.id='mask_elem00';
                    mask_elem.className = 'isecui-mask-'+type
                    mask_elem.innerHTML = mask_txt;
                    mask_elem.style.webkitTransform = "rotate(-"+angle+"deg)";
                    mask_elem.style.MozTransform = "rotate(-"+angle+"deg)";
                    mask_elem.style.msTransform = "rotate(-"+angle+"deg)";
                    mask_elem.style.OTransform = "rotate(-"+angle+"deg)";
                    mask_elem.style.transform = "rotate(-"+angle+"deg)";
                    mask_elem.style.visibility="";
                    mask_elem.style.position="fixed";
                    mask_elem.style.pointerEvents="none";// 鼠标穿透，这个避免按钮被遮盖点不了
                    mask_elem.style.left=front_x+'px';
                    mask_elem.style.top=front_y+'px';
                    // mask_elem.style.width='100px';
                    
                    mask_elem.style.whiteSpace='wrap';
                    mask_elem.style.overflow="hidden";
                    //mask_elem.style.border="solid #eee 1px";
                    mask_elem.style.opacity=front_txt_alpha;
                    if(isIE9){
                        mask_elem.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+front_txt_alpha*100+")";
                    }else{
                        mask_elem.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+front_txt_alpha*100+") progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', M11="+M[0]+", M12="+M[1]+", M21="+M[2]+", M22="+M[3]+")";
                    }
                    mask_elem.style.fontSize=font_size;
                    mask_elem.style.fontFamily=front_font;
                    mask_elem.style.color=color;
                    mask_elem.style.textAlign="center";
                    //mask_elem.style.width=width+'px';
                    //mask_elem.style.height=height+'px';
                    mask_elem.style.display="block";
                    oTemp.appendChild(mask_elem);
                    var x;
                    var y;
                    for (var i = 0; i < front_rows; i++) {
                        y=front_y+(front_y_space+height)*i;
                        for (var j = 0; j < front_cols; j++) {
                            x=front_x+(width+front_x_space)*j;
                            if(i!=0 || j!=0){
                                //clone
                                var new_elem=mask_elem.cloneNode(true);
                                new_elem.id='mask_'+type+'_elem'+i+j;
                                new_elem.style.left=x+'px';
                                new_elem.style.top=y+'px';
                                oTemp.appendChild(new_elem);
                            }
                        };
                    };
                    document.body.appendChild(oTemp);
                    total[type] = eval('front_rows'+type+'*front_cols'+type)
                    setTimeout(function(){
                        onresize = false
                    })
                }
            };
        }();
        var __w_f = function(){
            var f = host.WMJS.watermark;
            if(!__w_f.__w_t){
                f(1);
                if(!mode){
                    f(0);
                } 
                __w_f.__w_t = setTimeout(function(){
                    __w_f.__w_t = null;
                },500);
            }
        };
        host.onresize = function(){
            __w_f('onresize');
            onresize = true
            console.log('watermak resize1');
        };

        host.onload = function(){
            __w_f('onload');
            console.log('watermak onload');
        };
        var waterMarkTimer = setInterval(function(){
            var mask0 = document.getElementsByClassName('isecui-mask-0').length;
            var mask1 = document.getElementsByClassName('isecui-mask-1').length;
            var hide = document.querySelector('.__web-inspector-hide-shortcut__')
            if(hide){
                window.location.reload()
            }
            if(((total[0]&&total[0]>mask0)||(total[1]&&total[1]>mask1))&&!onresize){
                window.location.reload()
            }
        },1000)
    }(window);
})(1)


