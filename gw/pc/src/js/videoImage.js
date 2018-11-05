var videoImage = {
    "defaultConfig": {
        "video": {
            firstLoading: true,
            idx: 0,  //当前页
            data: {}
        },
        "image": {
            firstLoading: true,
            idx: 0,  //当前页
            data: {}
        }
    },
    bindEvent: function () {
        var self = this;
        $(".v-inner").on("click", ".video-item", function () {
            var url = $(this).data("video")
            appointment.openVideos(url)
        })
        $(".v-inner").on("click", ".image-item", function () {
            var image_url = $(this).data("image");
            self.openImage(image_url)
        })
    },
    openImage: function (imageUrl) {
        var a = layer.open({
            type: 1,
            closeBtn: 0,
            shade: 0.9,
            maxWidth: 1400,
            maxHeight: 1000,
            area: 'auto',
            shadeClose: true,  //点击遮罩关闭
            // maxmin:true,
            // area: ['660px', '645px'], //宽高
            skin: 'video-dialog',
            // skin: 'layui-layer-lan',
            anim: '-1',
            content: '<div class="" style="max-height: 1000px;max-width: 1400px;"><img class="u-w100 u-h100" src="' + imageUrl + '" alt=""></div>',
            title: false
        });

    },
    fillList: function (data, type) {
        const Warp = $(".v-content .scrollbar_view");
        const TempData = {
            TYPE: type,
            data: data
        };
        const Html = template('v-tpl', TempData);
        Warp.html(Html);
    },
    getImageList: function () {
        var self = this;
        var obj = self.defaultConfig.image;
        return new Promise((resolve) => {
            if (!obj.firstLoading) {
                self.fillList(obj.data, 'IMAGE');
                return resolve('local');
            }
            api.imageListAjax({idx: obj.idx}).then(function (res) {
                self.fillList(res.data, 'IMAGE');
                obj.firstLoading = false;
                obj.data = res.data;
                resolve('http');
            })
        });

    },
    getVideoList: function () {
        var self = this;
        var obj = self.defaultConfig.video;
        return new Promise(resolve => {
            if (!obj.firstLoading) {
                self.fillList(obj.data, 'VIDEO');
                return resolve('VIDEO');
            }
            api.videoListAjax().then(function (res) {
                self.fillList(res.data, 'VIDEO');
                obj.firstLoading = false;
                obj.data = res.data;
                resolve();
            })
        })

    },
    init: function () {
        var that = this;
        that.bindEvent();
        const scrollBox = new ScrollBox('.v-inner');
        $('.v-control>ul').on('click', 'li', function () {
            $(this).addClass('active').siblings().removeClass('active');
            const type = $(this).data('type');
            if (type === 'sp') {
                $('.v-title').children().removeClass().addClass('icon-sp');
                that.getVideoList().then(res => scrollBox.scrollUpdate());
            } else {
                $('.v-title').children().removeClass().addClass('icon-tj');
                that.getImageList().then(res => {
                    scrollBox.scrollUpdate();
                });
            }

        });
        that.getVideoList().then(res => scrollBox.scrollUpdate());

        /*  api.getAdvertisement().then(function(res){
              if(res.code === 10000){
                  var imgHtml = '<img src="'+ res.data.image_url+'">'
                  $(".gg-place").attr("href",res.data.link_url);
                  $(".gg-place").html(imgHtml)
              }
          });*/
        /* api.getDownloadInfo().then(function(res){
             if(res.code === 10000){
                 var html ='<div class="game-download u-h100">\
                                 <div class="ewm-img"><img style="width: 186px;height: 186px;" src="../dist/img/download-ewm.png" alt=""></div>\
                                 <div class="btn-app-store"></div>\
                                 <div class="btn-android"></div>\
                             </div>'
                 $("#game-download-warp").html(html);
                 $(".btn-app-store").on("click",function () {
                     if(res.data.ios_download_url !==''){
                         window.open(res.data.ios_download_url,'_blank');
                     }else {
                         alert("敬请期待！")
                     }
                 })
                 $(".btn-android").on("click",function () {
                     if(res.data.android_download_url !==''){
                         window.open(res.data.android_download_url,'_blank');
                     }else {
                         alert("敬请期待！")
                     }
                 })
             }
         });*/
    }
}
videoImage.init();