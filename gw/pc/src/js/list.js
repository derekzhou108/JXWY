'use strict'
var list = {
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
    tabToggle: function (e) {
        var node = $(e);
        var siblings = $(e).siblings();
        var index = $(e).index();
        var listBox = $(".news-list").find(".tab-box");
        node.addClass('active');
        siblings.removeClass('active');
        $.each(listBox, function (k, v) {
            if (k === index) {
                v.style.display = 'block';
            } else {
                v.style.display = 'none';
            }
        });
    },
    initPage: function (dataObj, current) {
        var that = this;
        return layui.laypage({
            cont: $('#' + current + 'page'), //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
            pages: dataObj.pages, //通过后台拿到的总页数
            curr: dataObj.idx + 1, //当前页
            skin: '#0C427E',
            jump: function (obj, first) { //触发分页后的回调
                if (first) return;
                api.newsListAjax({cid: dataObj.cid, idx: obj.curr - 1})
                    .then(function (res) {
                        $('#' + current).html(that.fillList(res.news));
                    });
            }
        });
    },
    postFirstNewsList: function (current, e) {
        var obj = eval('this.' + (current));
        if (!obj.firstLoading) return;
        var that = this;
        api.newsListAjax({idx: obj.idx, cid: obj.cid})
            .then(function (res) {
                var html = that.fillList(res.news);
                $('#' + current).html(html);
                obj.pages = res.pageCount;
                that.initPage(obj, current);
                obj.firstLoading = false;
            });
    },
    fillList: function (data) {
        var html = '';
        $.each(data, function (k, v) {
            var title = v.title.replace('[', '<span>');
            title = title.replace(']', '</span>');
            html += '<li class="list">\
                        <div class="package clearfix">\
                            <div class="type u-fl"><i class="icon-arrow"></i></div>\
                            <div class="title clearfix">\
                                <a target="_blank" href="/news/details?id=' + v.id + '" class="u-ell u-fl w-500">' + title + '</a>\
                                <span class="u-fr">' + v.created_at + '</span>\
                            </div>\
                            <div class="description u-wb-ba" style="display: none">' + v.description + '</div>\
                        </div>\
                     </li>';
        })
        return html;
    },
    initNodeData: function (data, num) {
        var that = this;
        var types = $('.news-content-tab');
        var newsList = $('.news-list');
        var typesHtml = '';
        var listBox = '';
        $.each(data, function (k, v) {
            if (k === num) {
                typesHtml += '<li class="active" onclick="list.tabToggle(this);list.postFirstNewsList(\'type' + k + '\', this);">' + v.category + '</li>';
                listBox += ' <div class="tab-box u-pb60">\
                            <ul id="type' + k + '" class="u-pb60"></ul>\
                            <div id="type' + k + 'page" class="page u-tc"></div>\
                        </div>';
            } else {
                typesHtml += '<li onclick="list.tabToggle(this);list.postFirstNewsList(\'type' + k + '\', this);">' + v.category + '</li>';
                listBox += ' <div class="tab-box u-pb60 u-hide">\
                            <ul id="type' + k + '" class="u-pb60"></ul>\
                            <div id="type' + k + 'page" class="page u-tc"></div>\
                        </div>';
            }
            that['type' + k] = {
                firstLoading: true,
                idx: 0,   //当前页
                pages: 0, //总页数
                cid: v.id    //栏目ID
            }

        });
        types.html(typesHtml);
        newsList.html(listBox);
    },
    init: function () {
        var that = this;

        function getUrlHashParam(name) {
            var url = window.location.search;
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1),
                    strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
                }
            }
            return theRequest[name] || '';
        }

        that.bindEvent();
        api.getNewsType().then(function (res) {
            var param = getUrlHashParam('type');
            if (param === 'guides') {
                that.initNodeData(res.data, 4);
                that.postFirstNewsList('type4');
            } else {
                that.initNodeData(res.data, 0);
                that.postFirstNewsList('type0');
            }

        });
        //appointment.info();
        /*     api.getAdvertisement().then(function (res) {
                 if (res.code === 10000) {
                     var imgHtml = '<img src="' + res.data.image_url + '">'
                     $(".gg-place").attr("href", res.data.link_url);
                     $(".gg-place").html(imgHtml)
                 }
             });*/
        /* api.getDownloadInfo().then(function(res){
             if(res.code === 10000){
                 var html ='<div class="game-download u-h100">' +
                     '<div class="ewm-img"><img style="width: 186px;height: 186px;" src="../dist/img/download-ewm.png" alt=""></div>' +
                     '<div class="btn-app-store"></div>' +
                     '<div class="btn-android"></div>' +
                     '</div>'
                 $("#game-download-warp").html(html)
                 $(".sub-content").on("click",".btn-app-store",function () {
                     if(res.data.ios_download_url !==''){
                         window.open(res.data.ios_download_url,'_blank')
                     }else {
                         alert("敬请期待!")
                     }
                 })
                 $(".sub-content").on("click",".btn-android",function () {
                     if(res.data.android_download_url !==''){
                         window.open(res.data.android_download_url,'_blank')
                     }else {
                         alert("敬请期待!")
                     }
                 })
             }
         });*/
        /* $(window).scroll(function () {
             if ($(window).scrollTop() >= 95) {
                 $(".top").attr("style", "position:fixed;top:0;left:0;");
             } else {
                 $(".top").attr("style", "");
             }
         }).trigger("scroll");*/
    }
};
list.init();