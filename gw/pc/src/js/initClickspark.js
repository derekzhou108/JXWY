var initClickSpark ={
    init:function(){
        var w = $(window).width();
        var h = $(window).height()+100;
        $(".sketch").css({"height":h})
        /*$('.sketch').clickSpark({
            particleImagePath: '/static/jxwy/pc/dist/img/leaf3.png',
            // particleImagePath: '/dist/img/leaf3.png',
            particleCount: 15,
            particleSpeed: 4,
            particleSize: 20,
            particleRotationSpeed: 1
        });*/
    }
} 
initClickSpark.init()
