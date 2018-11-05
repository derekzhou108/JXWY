'use strict';
var index = {
    timer: null,
    initIndex: 0,
    videoUrl: '',
    initBindEvent: function () {
        var self = this,
            $banner = $(".banner-yxts>.swiper-wrapper"),
            $stg = $(".stg-content"); // 视频
        const dataNum = ROLEINFO.length;
        let page = 0;
        let lastPage = parseInt(dataNum / 5) - 1;
        api.getDownloadInfo().then(function (res) {
            var downloadBtn = $(".u-dib #download");
            if (res.data && res.data.android_download_url) {
                downloadBtn.attr('href', res.data.android_download_url)
            } else {
                downloadBtn.on('click', function (e) {
                    alert('敬请期待！');
                    if (e && e.preventDefault) {
                        e.preventDefault();
                    }
                    else {
                        window.event.returnValue = false;
                        return false;
                    }
                })
            }
        });
        api.getImgList().then(function (res) {
            if (res.code === 10000) {
                let htmlTmp = '';
                $.each(res.data, (a, b) => {
                    htmlTmp += `
                    <div class="swiper-slide">
                        <img src="${b.img_url}" alt="" />
                    </div>
                    `
                });
                $banner.html(htmlTmp);
            }
        }).then(function () {
            new Swiper('.banner-yxts', {
                effect: 'coverflow',
                autoplay: {
                    delay: 5000
                },//可选选项，自动滑动
                grabCursor: true,
                centeredSlides: true,
                loop: true,
                slidesPerView: 'auto',
                loopedSlides: 5,
                coverflowEffect: {
                    rotate: 0,
                    stretch: 139,
                    depth: 200,
                    modifier: 1,
                    slideShadows: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    clickable: true,
                    bulletClass: 'swp-btn',
                    bulletActiveClass: 'swp-btn-active'
                },
                navigation: {
                    nextEl: '.bbgt-next',
                    prevEl: '.bbgt-prev',
                }
            });
        });
        const name = ['龙凤', '青天', '夜来风雨', '执子', '宫心', '玲珑', '梦之瑶'];
        var sztj = new Swiper('.banner-sztj', {
            loop: true,
            slidesPerView: 'auto',
            loopedSlides: 7,
            pagination: {
                el: '.sztj-pagination',
                type: 'bullets',
                clickable: true,
                bulletClass: 'sztj-btn',
                bulletActiveClass: 'sz-btn-active',
                renderBullet: function (index, className) {
                    return `<span class="${className} sztj-text sztj-bullet-${index + 1}">${name[index]}</span>`;
                }
            },
            navigation: {
                nextEl: '.next',
                prevEl: '.prev',
            }
        });


        function changeFoot(tpage) {
            $(".roll-list>li").each(function () {
                if (parseInt($(this).data('num') / 5) === tpage) {
                    $(this).show()
                } else {
                    $(this).hide()
                }
            });
        }

        function changeFilter(tpage) {
            let newList = [];
            if (tpage == 'all') {
                newList = ROLEINFO;
            }
            else {
                newList = ROLEINFO.filter(res => res.color == tpage);
                let lg = newList.length;
                for (let k = 0; k < parseInt(5 - (!lg % 5 ? 5 : lg % 5)); k++) {
                    newList.push(newList[k])
                }
            }
            document.querySelector('.roll-list').innerHTML = template('hbtj-tpl', newList);
            lastPage = parseInt(newList.length / 5) - 1;
            page = 0;
            $(".roll-list>li").each(function () {
                changeFoot(0)
            });

        }

        document.querySelector('.roll-list').innerHTML = template('hbtj-tpl', ROLEINFO);
        $(".roll-list>li").each(function () {
            changeFoot(0)
        });
        $('.foot_tab>.prev').click(function () {
            console.log(page, lastPage)
            if (page === 0) {
                changeFoot(lastPage);
                page = lastPage
            } else {
                changeFoot(page - 1);
                page--
            }


        })
        $('.foot_tab>.next').on('click', function () {
            if (page === lastPage) {
                changeFoot(0);
                page = 0
            } else {
                changeFoot(page + 1);
                page++
            }

        })


        $stg.on("click", ".video-item-click", function () {
            var video_url = $(this).data("video");
            self.openVideos(video_url)
        });
        $('#playVideo').on('click', function () {
            const video_url = $(this).data("video");
            self.openVideos(video_url)
        })
        $stg.on("click", ".image-item-click", function () {
            var image_url = $(this).data("image");
            self.openImage(image_url)
        })
        $(".gw-top").on("mouseover", ".top-warp-main", function () {
            $(".top-warp-main").fadeIn();
        })
        $("ul.roll-list").on({
            mouseenter: function () {
                $(this).find(".itemFront").removeClass('flipOut').removeClass('flipIn');
                $(this).find(".itemBack").removeClass('flipOut').removeClass('flipIn');
                $(this).find(".itemFront").addClass("flipOut");
                $(this).find(".itemBack").addClass('flipIn');
            },
            mouseleave: function () {
                $(this).find(".itemFront").removeClass('flipOut').removeClass('flipIn');
                $(this).find(".itemBack").removeClass('flipOut').removeClass('flipIn');
                $(this).find(".itemFront").addClass("flipIn");
                $(this).find(".itemBack").addClass('flipOut');
            }
        }, '.item');

        $('.hbtj-warp>ul').on('click', 'li>a', function () {
            if ($(this).parent('li').index() !== 4) {
                $(this).parent('li').addClass('active').siblings().removeClass('active');
                changeFilter($(this).data('type'))
            }
            else {
                window.open('/person/index')
            }

        })


    },
    addClickChangeEvent: function (rootEl, targetEl, nodeEl, eventType) {
        $("." + rootEl).on(eventType, "." + targetEl, function () {
            var index = $(this).index();
            $(this).addClass("active").siblings(".active").removeClass("active");
            $($("." + nodeEl)[index]).addClass("active").siblings(".active").removeClass("active");
        })
    },
    moveTo: function (el, type) {
        if (el === 'jsbg') {
            var top = $("#" + el).offset().top;
        } else {
            var top = $("#" + el).offset().top - 105;
        }

        $('html,body').animate({scrollTop: top}, 500);
        return false;
    },
    openVideos: function (videoUrl) {
        // videoUrl ='http://1252412115.vod2.myqcloud.com/94fc4d9fvodtransgzp1252412115/109cb3b04564972818711619651/v.f20.mp4'
        var that = this;
        layer.open({
            type: 1,
            title: false,
            closeBtn: 1,
            shade: 0.7,
            shadeClose: true,  //点击遮罩关闭
            area: ['660px', '450px'], //宽高
            skin: 'video-dialog',
            content: '<div id="videoContainer" style="overflow: hidden"></div>',
            anim: '-1',
            success: function (ele) {
                var player = new TcPlayer('videoContainer', {
                    "m3u8": videoUrl, //请替换成实际可用的播放地址
                    "autoplay": true,      //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
                    //"coverpic" : this.img,
                    "width": '660',//视频的显示宽度，请尽量使用视频分辨率宽度
                    "height": '450',//视频的显示高度，请尽量使用视频分辨率高度
                    "wording": {
                        5: "您的Flash插件已过期，无法播放视频，请升级Flash插件",
                    },
                    listener: function (msg) {
                        if (msg.type === 'fullscreen') {
                            if (msg.detail.isFullscreen) {
                                //ele.removeClass('layui-layer')
                            } else {
                                //ele.addClass('layui-layer')
                            }
                        }
                    }
                });
            }
        });
    },
    openImage: function (imageUrl) {
        var a = layer.open({
            type: 1,
            closeBtn: 0,
            shade: 0.9,
            maxWidth: 1400,
            maxHeight: 1000,
            shadeClose: true,  //点击遮罩关闭
            // maxmin:true,
            // area: ['660px', '645px'], //宽高
            area: 'auto',
            skin: 'video-dialog',
            // skin: 'layui-layer-lan',
            anim: '-1',
            content: '<div class="" style="max-height: 1000px;max-width: 1400px;"><img class="u-w100 u-h100" src="' + imageUrl + '" alt=""></div>',
            title: false
        });
    },
    initSlider: function () {
        $('#news-banner').terseBanner({
            arrow: false,
        });
    },

    fillSlider: function (arr) {
        var html = '';
        $.each(arr, function (k, v) {
            //jump_type 1-新闻；2-超级链接
            if (v.jump_type === "1") {
                html += '<a target="_blank" class="" style="width: 625px;height: 340px;" href="/news/details?id=' + v.new_id + '"><img class="item" src="' + v.img_url + '" /></a>';
            } else {
                html += '<a target="_blank" class="" style="width: 625px;height: 340px;" href="' + v.jump_to + '"><img class="item" src="' + v.img_url + '" /></a>';
            }


        });
        $('#slides').html(html);
    },
    fillNewsList: function (data) {
        var types = $('.news-tab'),
            newscontent = $('.news-content'),
            // newsTop = $('.top-news'),
            typesHtml = '',
            // newsTopHtml = '',
            jumpUrl = '';
        //context_type      内容类型：1-新闻；2-超级链接
        if (data.top.context_type === "1") {
            jumpUrl = "/news/details?id=" + data.top.id;
        } else {
            jumpUrl = data.top.context;
        }
        /*   newsTopHtml = '<a target="_blank" href="' + jumpUrl + '" class=" "><span class="title icon-top-news-bgs">推荐</span><span class="u-fs16 u-c000">主要内容 · </span><span class="u-fs16 u-fwb u-c000">' + data.top.title + '</span></a>'
           newsTop.html(newsTopHtml);*/
        $.each(data.cates, function (k, v) {
            if (k == 0) {
                typesHtml += '<span class="tabs news-tab-active"  onmouseover="index.toggleNews(' + k + ', this);">' + v + '</span>'
            } else {
                typesHtml += '<span class="tabs" onmouseover="index.toggleNews(' + k + ', this);">' + v + '</span>';
            }
        });
        typesHtml += '<span class="btn-more u-tr"><a target="_blank" class="icon-btn-mores" href="/news/list"></a></span>';
        types.html(typesHtml);
        var listHtml = '';
        $.each(data.news, function (ulK, ulV) {
            listHtml += '<div class="list u-fl"><ul>';
            $.each(ulV, function (k, v) {
                if (k < 5 && v.context_type === "1") {
                    listHtml += '<li class="news-list-item"><a target="_blank" href="/news/details?id=' + v.id + '" class="u-c1e u-fs20 clearfix"><span class="u-fl title u-ell"><i class="icon-nav-tab"></i>' + v.title + '</span><span class="u-fr time u-tr">' + v.created_at.substring(5, 10) + '</span></a></li>';
                } else {
                    listHtml += '<li class="news-list-item"><a target="_blank" href="' + v.context + '" class="u-c1e u-fs20 clearfix"><span class="u-fl title u-ell"><i class="icon-nav-tab"></i>' + v.title + '</span><span class="u-fr time u-tr">' + v.created_at.substring(5, 10) + '</span></a></li>';
                }
            });
            listHtml += '</ul></div>';
        });
        newscontent.html(listHtml);
    },
    fillImageList: function (data) {
        var imageWarp = $(".image-warp"), imageHtml = '', imageHtmlLeft = '', imageHtmlRight = '';
        //  imageHtml += '<div class="more-image u-fl"><a href="/jxwy/video/list?type=image"><img class="u-w100 u-h100" src="../dist/img/yh.png" alt=""></a></div>'
        $.each(data, function (k, v) {
            imageHtmlRight += '<div class="image-item image-item-click mask-pt" data-image="' + v.img_url + '"><img src="' + v.img_url + '" alt=""><div class="mask u-w100 u-h100"><i class="icon-show-img"></i></div></div>'

            /* if (k === 0) {
                 imageHtmlLeft += '<div class="first-item image-item-click mask-pt" data-image="' + v.img_url + '"><img src="' + v.img_url + '" alt=""><div class="mask u-w100 u-h100"><i class="icon-show-img"></i></div></div>'
             }
             else {
             }*/
        })
        imageHtml += '<div class="image-box">' + imageHtmlRight + '</div>';
        imageWarp.html(imageHtml)
    },
    fillVideoList: function (data) {
        var videoHtml = '',
            videoWarp = $(".video-warp"), videoHtmlRight = '', videoHtmlLeft = '';
        $.each(data, function (k, v) {
            videoHtmlRight
                += '<div class="video-item video-item-click mask-pt" data-video="' + v.video_url + '">' +
                '<img class="u-w100 u-h100" src="' + v.thumbnail + '" alt=""><div class="mask u-w100 u-h100"><i class="icon-show-video"></i></div></div>';
            /* if (k === 0) {
                 videoHtmlLeft += '<div class="first-item  video-item-click mask-pt" data-video="' + v.video_url + '">' +
                     '<img class="u-w100 u-h100" src="' + v.thumbnail + '" alt=""><div class="mask u-w100 u-h100"><i class="icon-show-video"></i></div></div>'
             }
             else {


             }*/
        })
        videoHtml += '<div class="video-box">' + videoHtmlRight + '</div>';
        videoWarp.html(videoHtml);
    },
    toggleNews: function (key, e) {
        var newsContainer = $('.news-content');
        newsContainer.css('marginLeft', -key * 516);
        $(e).addClass('news-tab-active').siblings().removeClass('news-tab-active');
    },
    invitation: function () {
        if (util.getStorage('userInfo')) {
            bar.share();
        } else {
            bar.loginShare();
        }
    },
    init: function () {
        var that = this;
        this.initBindEvent();

        var palceId = util.getQueryString("palceId")
        if (palceId !== '' && palceId !== 'undefined') {
            that.moveTo(palceId)
        }
        api.getRollNews()
            .then(function (res) {
                that.fillSlider(res.data);
                that.initSlider();
            });

        api.getNewsList()
            .then(function (res) {
                that.fillNewsList(res);
            });
        api.video()
            .then(function (res) {
                if (res.data.video_url) {
                    that.videoUrl = res.data.video_url
                } else {
                    that.videoUrl = '';
                }
            })

        api.videoList().then(function (res) {
            that.fillVideoList(res.data)
        })
        api.imageList().then(function (res) {
            that.fillImageList(res.data)
        })
        // api.getAdvertisement().then(function(res){
        //     if(res.code === 10000){
        //         var imgHtml = '<img src="'+ res.data.image_url+'">'
        //         $(".gg-place").attr("href",res.data.link_url);
        //         $(".gg-place").html(imgHtml)
        //     }
        // })
        var top = $(".gw-top").offset().top;
        $(window).scroll(function () {
            var scrollTop = $(window).scrollTop(),
                $navTabs = $(".nav-tabs").find(".tab");
            if ($(window).scrollTop() >= 95) {
                // $(".gw-top").attr("style", "position:fixed;top:0;left:0;");
            } else {
                //$(".gw-top").attr("style", "");
            }
            if (scrollTop >= 0 && scrollTop < 721) {
                $navTabs.removeClass("active")
                $($navTabs[0]).addClass("active")
            } else if (scrollTop < 1111) {
                $navTabs.removeClass("active")
                $($navTabs[1]).addClass("active")
                $(".top-warp-main").fadeIn()
            } else if (scrollTop < 1842) {
                $navTabs.removeClass("active")
                $($navTabs[2]).addClass("active")
                $(".top-warp-main").fadeIn()
            } else {
                $navTabs.removeClass("active")
                $(".top-warp-main").fadeIn()
            }
        }).trigger("scroll");
        $("a[href*='#']").click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var $target = $(this.hash);
                $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
                if ($target.length) {
                    var targetOffset = $target.offset().top;
                    $('html,body').animate({
                        scrollTop: targetOffset
                    }, 500);
                    return false;
                }
            }
        });

        $('.nav-forum').mouseover(function () {
            console.log('over')
        }).mouseout(function () {
            console.log('out')
        })

    }
}
index.init()