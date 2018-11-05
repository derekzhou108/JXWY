(function (window, $) {
    var gameData = {
        bindEvent: function () {
            $(".top-nav").on("click", ".tab", function () {
                var movename = $(this).data("movename"),
                    isExpect = $(this).data("expect");
                if (movename) {
                    window.open('/site/index?palceId=' + movename, '_self')
                } else if (isExpect) {
                    alert("敬请期待！")
                }
            });
        },
        showList: function () {
            var container = $('.game-detail');
            window.api.gamedataList({app_id: 'JXWY'}).then(function (res) {
                if (res.code === 10000 && res.data) {
                    var result = res.data,
                        html = '';
                    for (var n = 0; n < result.length; n++) {
                        html += '<section><h4 class="detail-title">' + result[n].name + '</h4>'
                        for (var m = 0; m < (result[n].children).length; m++) {
                            var style = ''
                            if ((result[n].children)[m].name.length > 6 && (result[n].children)[m].name.length < 8) {
                                style = "style='font-size:14px'"
                            } else if ((result[n].children)[m].name.length >= 8) {
                                style = "style='font-size:12px'"
                            }

                            html += '<ul class="detail-line"><li class="detail-title-s"' + style + '>' + (result[n].children)[m].name + '</li>'
                            for (var i = 0; i < (result[n].children)[m].children.length; i++) {
                                var tag = '',
                                    url = '',
                                    object = ((result[n].children)[m].children)[i];

                                //tag标签
                                if (object.tag_status === '1' && object.tag) {
                                    tag = '<i class="tag">' + object.tag + '</i>'
                                }
                                //内容url地址 1:自由连接 2:新闻页 3：资料库页
                                if (object.content) {
                                    switch (object.content.type) {
                                        case '1':
                                            url = object.content.title;
                                            break;
                                        case '2':
                                            url = '/news/details?referrer=2&id=' + object.content.title;
                                            break;
                                        case '3':
                                            url = '/news/details?referrer=3&id=' + object.content.id;
                                            break;
                                        default:
                                            break;
                                    }
                                }
                                if (url) {
                                    html += '<li class="line-item"><a href="' + url + '">' + ((result[n].children)[m].children)[i].name + '</a>' + tag + '</li>'
                                } else {
                                    html += '<li class="line-item">' + ((result[n].children)[m].children)[i].name + '' + tag + '</li>'
                                }

                            }
                            html += '</ul>'
                        }
                        html += '</section>'
                    }

                    container.html(html);
                }
            })
        },
        init: function () {
            $(".nav-tabs").find(".tab").eq(3).addClass("active");
            this.bindEvent();
            this.showList();
        }

    }
    gameData.init()
})(window, $);