'use strict';
var details = {
    source: function () {
        function getUrlHashParam(e) {
            const t = location.href.match(new RegExp("(?:\\?)" + e + "=([^&]+)"));
            return t ? decodeURIComponent(t[1]) : null;
        }

        //var pathname = document.referrer, source = /game-data/ig.test(pathname);//通过路由地址判断
       // const referrer = getUrlHashParam('referrer');
       const referrer = util.getQueryString("referrer");

        return referrer == 3;
    },
    bindEvent: function () {
        var self = this;
        $(".top-nav").on("click", ".tab", function () {
            var movename = $(this).data("movename");
            if (movename !== "") {
                window.open('/site/index?palceId=' + movename, '_self')
            } else {
                alert("敬请期待！")
            }
        });
    },
    initShareConfig: function () {
        var imgUrl = location.hostname;
        var url = location.protocol + '//' + location.host;
        var shareUrl = location.href;
        var shareTitle = ($(".news-title-name").text()).trim();
        if (location.port) {
            imgUrl += ':' + location.port;
            url += ':' + location.port;
        }
        var $config = {
            url: shareUrl, // 网址，默认使用 window.location.href
            source: url, // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
            title: shareTitle + '-锦绣未央官网-凯撒文化',
            description: '',
            // image               : imgUrl, // 图片, 默认取网页中第一个img标签
            image: '../dist/img/share.jpg', // 图片, 默认取网页中第一个img标签
            sites: ['qzone', 'weibo'], // 启用的站点
            disabled: ['google', 'facebook', 'twitter', 'douban', 'qq'], // 禁用的站点
        };
        $('.news_details_share').share($config);
    },
    initContent: function () {
        //游戏资料库与新闻页相同，根据判断调用不用的接口
        var app_id = 'JXWY' //调试时需加上
        var that = this
        var replace = function (res) {
            if (res.code === 10000) {
                $(".news-title-name").text(res.data.title);
                $(".news-content").html(res.data.context);
                $(".time").text(res.data.updated_at.substring(0, 10));
                that.initShareConfig();
            }
        }
        var newsId = util.getQueryString("id");

        if (this.source()) {

            //修改游戏资料与新闻不一样固定的html内容
            $(".name-zc").html('游戏资料');
            $(".name-en").html('GAMEDATA');
            $('.name-position').html("游戏资料");

            api.gamedataDetail({id: newsId, app_id: app_id}).then(function (res) {
                var data = new Date(parseInt(res.data.updated_at) * 1000).toLocaleDateString().replace(/\//g, "-");
                res.data.updated_at = data;
                replace(res)
            });
        } else {
            api.newsDetail({id: newsId}).then(function (res) {
                replace(res)
            });
        }


    },
    init: function () {
        this.bindEvent();
        this.initContent();
        if (this.source()) {
            $($(".nav-tabs").find(".tab")[3]).addClass("active");
        } else {
            $($(".nav-tabs").find(".tab")[1]).addClass("active");
        }

        $(window).scroll(function () {
            if ($(window).scrollTop() >= 95) {
                $(".top").attr("style", "position:fixed;top:0;left:0;");
            } else {
                $(".top").attr("style", "");
            }
        }).trigger("scroll");

        /* api.getAdvertisement().then(function (res) {
             if (res.code === 10000) {
                 var imgHtml = '<img src="' + res.data.image_url + '">'
                 $(".gg-place").attr("href", res.data.link_url);
                 $(".gg-place").html(imgHtml)
             }
         })*/
        /* api.getDownloadInfo().then(function (res) {
             if (res.code === 10000) {
                 var html = '<div class="game-download u-h100">\
                                 <div class="ewm-img"><img style="width: 186px;height: 186px;" src="../dist/img/download-ewm.png" alt=""></div>\
                                 <div class="btn-app-store"></div>\
                                 <div class="btn-android"></div>\
                             </div>'
                 $("#game-download-warp").html(html);
                 $(".btn-app-store").on("click", function () {
                     if (res.data.ios_download_url !== '') {
                         window.open(res.data.ios_download_url, '_blank');
                     } else {
                         alert("敬请期待！")
                     }
                 })
                 $(".btn-android").on("click", function () {
                     if (res.data.android_download_url !== '') {
                         window.open(res.data.android_download_url, '_blank');
                     } else {
                         alert("敬请期待！")
                     }
                 })
             }
         });*/
    },
};
details.init();