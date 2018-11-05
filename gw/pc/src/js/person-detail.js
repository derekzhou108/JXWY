'use strict';
var person_detail = {
    skillRender: function (e, r) {
        $(e).parent('li').addClass('active').siblings().each(function (i) {
            $(this).removeClass('active')
        });
        $('.jn-name').text(r.name);
        $('.jn-desc').text(r.desc);
    },
    init: function () {
        $(function () {
            // 伙伴品质
            localStorage
            var poplevel = {
                1: '金',
                2: '蓝',
                3: '紫'
            }
            // 伙伴定位
            var poptype = {
                1: '防御',
                2: '辅助',
                3: '输出'
            }


            const alldata = ROLEINFO;
            const dataNum = alldata.length;
            let pageId = getUrlHashParam('id');
            let dataId = parseInt(checkPage(pageId));
            let pageData, pifuIndex;
            let page = 0;
            let lastPage = parseInt(dataNum / 5) - 1;


            function checkPage(pageId) {
                if (!pageId) {
                    return 1
                } else if (pageId >= 1 && pageId <= dataNum && pageId % 1 === 0) {
                    return pageId
                } else {
                    return 1
                }
            }

            function buildPeople(peopData) {
                const temp = ' <li class="item" data-num="' + peopData.id + '">' +
                    '<a href="javascript:void(0);">' +
                    '<div class="itemBack"><span>' + peopData.name + '</span></div>' +
                    '<div class="itemFront"><img src="../dist/img/huoban/people/' + peopData.id + '.png"><div class="img-mask"></div></div>' +
                    '</a></li>';
                return temp
            }

            function changePage(dId) {
                window.location.href = window.location.href.split("#")[0] + "#id=" + dId;
                const pageData = alldata.filter(res => res.id === `p${dataId}`);
                pageData[0].typeText = poptype[pageData[0].type];
                pageData[0].colorText = poplevel[pageData[0].color];

                var html = template('page-1', pageData[0]);
                var html1 = template('page-2', pageData[0]);
                $("#section_1").html(html);
                $("#section_2").html(html1);

            }


            function getUrlHashParam(e) {
                const t = location.href.match(new RegExp("(?:\\&|\\#)" + e + "=([^&]+)"));
                return t ? decodeURIComponent(t[1]) : null;
            }

            window.onhashchange = function () {
                pageId = getUrlHashParam('id');
                dataId = parseInt(checkPage(pageId));
                changePage(dataId)
            };

            changePage(dataId)
            for (let i = 0; i < dataNum; i++) {
                $('.foot_tab ul').append(buildPeople(alldata[i]));
            }

            $("body").on('click', ".prev", function () {
                if (dataId > 1) {
                    dataId--;
                    changePage(dataId);
                } else {
                    dataId = dataNum;
                    changePage(dataId);
                }
            })
            $("body").on('click', ".next", function () {
                if (dataId < dataNum) {
                    dataId++;
                    changePage(dataId);
                } else {
                    dataId = 1;
                    changePage(dataId);
                }
            })

            function changeFoot(tpage) {
                $(".roll-list>li").each(function () {
                    if (parseInt(((parseInt($(this).data('num').substring(1)) - 1) / 5)) === tpage) {
                        $(this).show()
                    } else {
                        $(this).find(".itemFront").removeClass('flipOut').removeClass('flipIn');
                        $(this).find(".itemBack").removeClass('flipOut').removeClass('flipIn');
                        $(this).hide()
                    }
                });
            }

            changeFoot(0);
            $('.icon-btn-left-p').click(function () {
                if (page === 0) {
                    changeFoot(lastPage);
                    page = lastPage
                } else {
                    changeFoot(page - 1);
                    page--
                }


            })
            $('.icon-btn-right-p').on('click', function () {
                if (page === lastPage) {
                    changeFoot(0);
                    page = 0
                } else {
                    changeFoot(page + 1);
                    page++
                }

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
            $("ul.roll-list").on('click', 'a', function () {
                changePage($(this).parent().data('num').substring(1));
                $('html,body').animate({
                    scrollTop: 0
                }, 500);
            })
        });
    },
    playSound: function (e, id) {
        var borswer = window.navigator.userAgent.toLowerCase();
        if (borswer.indexOf("ie") >= 0) {
            //IE内核浏览器
            var strEmbed = '<embed name="embedPlay" src="../dist/video/cv/' + id + '.mp3" autostart="true" hidden="true" loop="false"></embed>';
            if ($(e).find("embed").length <= 0)
                $(e).append(strEmbed);
            var embed = document.embedPlay;

            //浏览器不支持 audion，则使用 embed 播放
            embed.volume = 100;
            //embed.play();这个不需要
        } else {
            //非IE内核浏览器
            var strAudio = "<audio id='audioPlay' src='../dist/video/cv/" + id + ".mp3' hidden='true'>";
            if ($(e).find("audio").length <= 0)
                $(e).append(strAudio);
            var audio = document.getElementById("audioPlay");

            //浏览器支持 audion
            audio.play();
        }
    }
};
person_detail.init();



