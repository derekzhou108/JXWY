/**
 * Created by qgg on 2017/6/28.
 */
'use strict'
;(function () {

    //正式环境  http://sdk.uu66.com
    //内网开发环境 http://10.10.40.33:8111
    //沙箱环境 http://115.159.189.146:8001

    var baseUrl = 'http://115.159.189.146:8001';

    window.api = {
        post: function (url, data) {
            var def = $.Deferred()
            $.post(url, data)
                .then(function (data) {
                    def.resolve($.parseJSON(data));
                });
            return def;
        },
        get: function (url, data) {
            var def = $.Deferred()
            $.get(url, data)
                .then(function (data) {


                    if (typeof data === 'string') {
                        def.resolve($.parseJSON(data));
                    }
                    else {
                        def.resolve(data);

                    }
                });
            return def;
        },
        jsonp: function (url, data) {
            var def = $.Deferred()
            $.ajax({
                url: baseUrl + url,
                type: 'get',
                dataType: 'jsonp',
                jsonp: 'callback',
                data: data
            }).then(function (res) {
                if (res.code === 10000) {
                    def.resolve(res);
                } else {
                    layer.alert(res.msg)
                    def.reject(res);
                }
            });
            return def;
        },
        //新闻列表
        getNewsList: function (data) {
            return this.get('/news/get-news-list', data)
            // return this.get('/src/mock/get-news-list.json', data)
        },
        //新闻轮播图
        getRollNews: function (data) {
            return this.post('/news/get-roll-news', data)
            // return this.get('/src/mock/get-roll-news.json')
        },
        //新闻栏目
        getNewsType: function (data) {
            // return this.post('/yzsmr/news/get-news-type', data)
            return this.get('/news/get-news-type', data)
        },
        //新闻分页列表
        newsListAjax: function (data) {
            // return this.post('/yzsmr/news/list-ajax', data)
            return this.post('/news/list-ajax', data)
        },
        //新闻详情
        newsDetail: function (data) {
            // return this.post('/yzsmr/news/detail', data)
            return this.post('/news/detail', data)
        },
        //人物介绍
        getRoleList: function (data) {
            // return this.get('/yzsmr/game-role/get-role-list', data)
            return this.get('/src/mock/get-role-list.json', data)
        },
        //首页视频
        video: function (data) {
            return this.get('/video/top-index', data)
            // return this.get('/src/mock/video.json')
        },
        //首页视频列表
        videoList: function () {
            return this.get('/video/video-list')
        },
        imageList: function () {
            return this.get('/original/image-list')
        },
        //登录
        login: function (data) {
            return this.jsonp('/sdk-user/login', data)
        },
        //发送验证码
        sendCode: function (data) {
            return this.jsonp('/sdk-user/send-sms-code', data)
        },
        //注册
        reg: function (data) {
            return this.jsonp('/sdk-user/reg', data)
        },
        //找回密码
        findPwd: function (data) {
            return this.jsonp('/sdk-user/find-pwd', data)
        },
        //修改密码
        changePwd: function (data) {
            return this.jsonp('/sdk-user/change-pwd', data)
        },
        //是否登录
        isLogin: function (data) {
            return this.jsonp('/sdk-user/is-login', data)
        },
        //注销
        logout: function () {
            return this.jsonp('/sdk-user/logout')
        },
        //视频列表页
        videoListAjax: function (data) {
            return this.post('/video/ajax-video-list', data)
        },
        //原画列表页getAdvertisement
        imageListAjax: function (data) {
            return this.post('/original/ajax-pc-list', data)
        },
        //获取下载地址
        getDownloadInfo: function () {
            return this.get('/download/info')
        },
        //资料库列表
        gamedataList: function (data) {
            return this.post('/game-database/list?res_format=html', data)
        },

        //获取游戏资料库页内容
        gamedataDetail: function (data) {
            return this.post('/game-database/detail-data?res_format=html', data)
        },

        //获取游戏特色轮播
        getImgList: function () {
            return this.get('/game-features/index')
        }
    };

    window.appointment = {
        num: 0,
        app_label: -1,
        dialogConfig: {
            type: 1,
            title: false,
            closeBtn: 0,
            shadeClose: false,  //点击遮罩关闭
            area: ['474px', '535px'],//宽高
            skin: 'dialog',//自定义样式
            shade: [0.7, '#000'],
        },
        selectPhoneType: function (type, dom) {
            this.app_label = type;
            $(dom).find('.radio').removeClass('icon-radio').addClass('icon-radio-active').end()
                .siblings('label').find('.radio').removeClass('icon-radio-active').addClass('icon-radio');
        },
        submit: function () {
            var phone = $.trim($('#phone').val());
            var code = $.trim($('#code').val());
            if (!code) {
                this.error('请输入预约码');
                return false;
            }
            if (!phone) {
                this.error('请输入手机号码');
                return false;
            }
            if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
                this.error('手机号码格式不正确');
                return false;
            }
            if (this.app_label == -1) {
                this.error('请选择手机类型');
                return false;
            }
            var data = {
                app_label: this.app_label,
                mobile: phone,
                code: code,
                other_code: util.getQueryString('code') || '',
                user_id: util.getStorage('userInfo') ? util.getStorage('userInfo').user_id : ''
            }
            var that = this;
            api.create(data)
                .then(function (res) {
                    if (res.code == 1) {
                        that.success();
                    } else {
                        that.error(res.msg);
                    }
                });
            return false;
        },
        dialog: function () {
            this.dialogConfig.area = '611px';
            this.dialogConfig.content = '<div class="appointment-dialog" style="height: 800px;">\
                                                <form>\
                                                <div class="u-mt20">\
                                                    <label class="u-fs0 input-item clearfix u-pl20">\
                                                        <span class="u-dib u-cblue u-fs18 u-ml15 u-mt5 text u-fl">预约码：</span>\
                                                        <input class="u-pl15 u-pr25 input u-fl u-ml15" type="text" id="code" placeholder="请输入预约码" autocomplete="off">\
                                                    </label>\
                                                </div>\
                                                <div class="u-mt15">\
                                                    <label class="u-fs0 input-item clearfix u-pl20">\
                                                        <span class="u-dib u-cblue u-fs18 u-ml15 u-mt5 text u-fl">手机号：</span>\
                                                        <input class="u-pl15 u-pr25 input u-fl u-ml15" type="text" id="phone" maxlength="11" placeholder="请输入您的手机号码" autocomplete="off">\
                                                    </label>\
                                                </div>\
                                                <div class="labels u-tc u-fs0 u-mt10">\
                                                    <div class="u-dib clearfix">\
                                                        <label class="u-fl u-dib u-pr20" onclick="appointment.selectPhoneType(0, this);">\
                                                            <span class="icon-radio u-dib u-mr10 u-fl radio u-fs18">iOS</span>\
                                                        </label>\
                                                        <span class="u-fl bor"></span>\
                                                        <label class="u-fl u-dib" onclick="appointment.selectPhoneType(1, this);">\
                                                            <span class="icon-radio u-dib u-mr10 u-fl radio u-fs18">Android</span>\
                                                        </label>\
                                                    </div>\
                                                </div>\
                                                    <button type="submit" class="icon-appointment-submit-btn appointment-submit u-cp u-m0a"></button>\
                                                </form>\
                                                <a class="icon-dialog-close dialog-close" id="dialogClose" onclick="layer.close($(this).data(\'index\'));"></a>\
                                          </div>';
            this.dialogConfig.success = function (ele, index) {
                ele.find('form').on('submit', function (e) {
                    e.preventDefault();
                    window.appointment.submit();
                    return false;
                });
                $('#dialogClose').data('index', index);
            }
            layer.open(this.dialogConfig);

        },
        success: function () {
            this.dialogConfig.area = ['644px', '277px'];
            this.dialogConfig.content = '<div class="appointment-success u-fs0">\
                                            <div class="u-pt100"></div>\
                                            <div class="u-cblue u-tc u-fs18 u-pt50">亲爱的守墓人，恭喜预约成功！</div>\
                                            <div class="u-cblue u-tc u-fs18">预约礼包将在测试时发放，请等待盗墓者游戏发布吧。</div>\
                                            <a class="icon-dialog-close dialog-close" id="successClose" onclick="layer.close($(this).data(\'index\'));"></a>\
                                        </div>';
            this.dialogConfig.success = function (ele, index) {
                $('#successClose').data('index', index);
            }
            layer.open(this.dialogConfig);

        },
        has: function () {
            this.dialogConfig.area = ['474px', '535px'];
            this.dialogConfig.content = '<div class="u-fs0">\
                                            <div class="u-pt40"><div class="icon-dialog-has u-m0a"></div></div>\
                                            <div class="icon-line u-m0a u-mt30 u-mb30"></div>\
                                            <div class="u-cbrown u-tc u-fs16">你可以加入《龙符：天祭》官方Q群：188977217</div>\
                                            <div class="u-cbrown u-tc u-fs16">和大家一起期待吧！</div>\
                                            <a class="icon-qq u-m0a u-mt20" target="_blank" href="https://jq.qq.com/?_wv=1027&k=4AlEU4d"></a>\
                                            <a class="icon-dialog-close u-m0a u-mt90" id="hasClose" onclick="layer.close($(this).data(\'index\'));"></a>\
                                        </div>';
            var index = layer.open(this.dialogConfig);
            $('#hasClose').data('index', index);
        },
        error: function (msg) {
            this.dialogConfig.area = ['644px', '278px'];
            this.dialogConfig.content = '<div class="appointment-error u-fs0">\
                                            <div class="u-pt100"></div>\
                                            <div class="u-tc u-fs18 u-cblue u-pt50">' + msg + '</div>\
                                            <a class="icon-dialog-close dialog-close" id="errorClose" onclick="layer.close($(this).data(\'index\'));"></a>\
                                        </div>';
            this.dialogConfig.success = function (ele, index) {
                $('#errorClose').data('index', index);
            }
            layer.open(this.dialogConfig);
        },
        info: function () {
            var def = $.Deferred();
            return api.getAppointmentInfo()
                .then(function (res) {
                    var num = res.count.split('').reverse().join('').replace(/(\d{3})/g, '$1,').replace(/\,$/, '').split('').reverse().join('');
                    window.appointment.num = num;
                    return def.resolve(num, res);
                });
        },
        openVideos: function (videoUrl) {

            var that = this;
            layer.open({
                type: 1,
                title: false,
                closeBtn: 1,
                shade: 0.7,
                shadeClose: true,  //点击遮罩关闭
                area: ['670px', '450px'], //宽高
                skin: 'video-dialog',
                content: '<div id="videoContainer" style="overflow: hidden"></div>',
                anim: '-1',
                success: function (ele) {
                    var player = new TcPlayer('videoContainer', {
                        "m3u8": videoUrl, //请替换成实际可用的播放地址
                        "autoplay": true,      //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
                        //"coverpic" : this.img,
                        "width": '670',//视频的显示宽度，请尽量使用视频分辨率宽度
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
                shadeClose: true,  //点击遮罩关闭
                maxmin: true,
                skin: 'layui-layer-lan',
                anim: 3,
                content: '<div class="u-w100 u-h100"><img class="u-w100 u-h100" src="' + imageUrl + '" alt=""></div>',
                title: false
            });

            layer.full(a);
        }
    };


    window.bar = {
        dialogConfig: {
            type: 1,
            title: false,
            closeBtn: 0,
            shadeClose: false,  //点击遮罩关闭
            area: ['410px', '535px'],//宽高
            skin: 'bar-dialog',//自定义样式
            shade: [0.7, '#000'],
        },
        copyState: 1,    //复制状态
        time: 60,
        login: function () {
            var that = this;
            this.dialogConfig.area = ['410px', '535px'];
            this.dialogConfig.content = '<div class="u-bor30">\
                                            <form>\
                                            <div class="login u-bgc-fff u-br20">\
                                                <div class="u-pt30 u-pb30"><div class="icon-footer-logo u-m0a"></div></div>\
                                                <div class="username"><input class="input" type="text" name="username" placeholder="请输入手机号/帐号" autocomplete="off"><label for="username" class="icon-user"></label></div>\
                                                <div class="password u-mt20"><input class="input" type="password" name="password" placeholder="请输入密码" autocomplete="off"><label for="password" class="icon-password"></label></div>\
                                                <div class="btn u-mt30"><button type="submit" class="u-fs22 u-br10 login-btn">登录</button></div>\
                                                <div class="link u-tr u-mt20"><a onclick="layer.closeAll();bar.register();" >注册</a> 丨 <a onclick="layer.closeAll();bar.forget();">忘记密码</a></div>\
                                            </div>\
                                            </form>\
                                            <div class="icon-bar-close u-m0a u-mt45 u-cp" id="loginClose"></div>\
                                        </div>';
            this.dialogConfig.success = function (ele, index) {
                ele.find('#loginClose').on('click', function () {
                    layer.close(index);
                });
                ele.find('[name=username]').focus();
                ele.find('form').on('submit', function (e) {
                    e.preventDefault();
                    var data = {
                        username: $.trim(ele.find('[name=username]').val()),
                        password: $.trim(ele.find('[name=password]').val()),
                    }
                    if (!data.username) {
                        layer.alert('请输入手机号/帐号');
                        return false;
                    }
                    if (!data.password) {
                        layer.alert('请输入密码');
                        return false;
                    }
                    api.login(data)
                        .then(function (res) {
                            that.storeUserInfo(res.data);
                            util.reload();
                        });
                    return false;
                });
            };
            layer.open(this.dialogConfig);
        },
        loginShare: function () {
            var that = this;
            this.dialogConfig.area = ['410px', '555px'];
            this.dialogConfig.content = '<div class="u-bor30">\
                                            <form>\
                                            <div class="login login-share u-bgc-fff u-br20">\
                                                <div class="u-pt30 u-pb30"><div class="icon-footer-logo u-m0a"></div></div>\
                                                <div class="u-tc bar-dialog-msg" id="barDialogMsg"><span>登录后分享拿好礼</span></div>\
                                                <div class="username u-mt25"><input class="input" type="text" name="username" placeholder="请输入手机号/帐号" autocomplete="off"><label for="username" class="icon-user"></label></div>\
                                                <div class="password u-mt20"><input class="input" type="password" name="password" placeholder="请输入密码" autocomplete="off"><label for="password" class="icon-password"></label></div>\
                                                <div class="btn u-mt30"><button type="submit" class="u-fs22 u-br10 login-btn">登录</button></div>\
                                                <div class="link u-tr u-mt20"><a onclick="layer.closeAll();bar.register();" >注册</a> 丨 <a onclick="layer.closeAll();bar.forget();">忘记密码</a></div>\
                                            </div>\
                                             </form>\
                                            <div class="icon-bar-close u-m0a u-mt45 u-cp" id="loginShareClose"></div>\
                                        </div>';
            this.dialogConfig.success = function (ele, index) {

                ele.find('#loginShareClose').on('click', function () {
                    layer.close(index);
                });
                ele.find('[name=username]').focus();
                setTimeout(function () {
                    ele.find('#barDialogMsg').hide();
                }, 3000);

                ele.find('form').on('submit', function (e) {
                    e.preventDefault();
                    var data = {
                        username: $.trim(ele.find('[name=username]').val()),
                        password: $.trim(ele.find('[name=password]').val()),
                    }
                    if (!data.username) {
                        layer.alert('请输入手机号/帐号');
                        return false;
                    }
                    if (!data.password) {
                        layer.alert('请输入密码');
                        return false;
                    }
                    api.login(data)
                        .then(function (res) {
                            that.storeUserInfo(res.data);
                            util.reload();
                        });
                    return false;
                });

            };
            layer.open(this.dialogConfig);
        },
        register: function () {
            var that = this;
            this.dialogConfig.area = ['410px', '650px'];
            this.dialogConfig.content = '<div class="u-bor30">\
                                            <div class="login login-register u-bgc-fff u-br20">\
                                                <h3 class="u-fs30 u-fwb u-tc u-pt20 u-pb20"><span class="icon-bar-dialog-back u-cp" onclick="layer.closeAll();bar.login();"></span>注册</h3>\
                                                <div class="register-title u-mb20 clearfix"><span class="active u-cp" onclick="common.tabToggle(this);$(this).parent().nextAll().eq(0).find(\'[name=username]\').focus();"><em>手机</em></span><span class="u-cp" onclick="common.tabToggle(this);$(this).parent().nextAll().eq(1).find(\'[name=username]\').focus();"><em>用户名</em></span></div>\
                                                <div class="reg-box">\
                                                    <form>\
                                                    <div class="phone clearfix"><input class="input u-fl" type="text" name="username" placeholder="请输入手机号码" autocomplete="off"><button type="button" class="u-fl" onclick="bar.sendCode(this,\'reg\');">发送验证码</button></div>\
                                                    <div class="valicode u-mt20"><input class="input" type="text" name="sms_code" placeholder="请输入验证码" id="valicode" autocomplete="off"><label for="valicode" class="icon-valicode"></label></div>\
                                                    <div class="password u-mt20"><input class="input" type="password" name="password" placeholder="请输入密码（6-16位）" id="password" autocomplete="off"><label for="password" class="icon-password"></label></div>\
                                                    <div class="arg u-mt20">注册表示您同意 <a href="https://cdn.uu66.com/adminIP/home.html" target="_blank">《凯撒用户协议》</a></div>\
                                                    <div class="btn u-mt20"><button type="submit" class="u-fs22 u-br10" id="phoneReg">注册并登录</button></div>\
                                                    <div class="link u-tr u-mt20"><a onclick="layer.closeAll();bar.login();">已有帐号</a></div>\
                                                    </form>\
                                                </div>\
                                                <div class="u-dn reg-box">\
                                                    <form>\
                                                    <div class="username u-mt25"><input class="input" type="text" name="username" placeholder="请输入用户名（6-16位）" autocomplete="off"><label for="username" class="icon-user"></label></div>\
                                                    <div class="password u-mt20"><input class="input" type="password" name="password" placeholder="请输入密码（6-16位）" autocomplete="off"><label for="password" class="icon-password"></label></div>\
                                                    <div class="arg u-mt20">注册表示您同意 <a href="https://cdn.uu66.com/adminIP/home.html" target="_blank">《凯撒用户协议》</a></div>\
                                                    <div class="btn u-mt20"><button type="submit" class="u-fs22 u-br10" id="userReg">注册并登录</button></div>\
                                                    <div class="link u-tr u-mt20"><a onclick="layer.closeAll();bar.login();">已有帐号</a></div>\
                                                    </form>\
                                                </div>\
                                            </div>\
                                            <div class="icon-bar-close u-m0a u-mt45 u-cp" id="loginRegisterClose"></div>\
                                        </div>';
            this.dialogConfig.success = function (ele, index) {

                ele.find('#loginRegisterClose').on('click', function () {
                    layer.close(index);
                });
                ele.find('[name=username]').eq(0).focus();
                ele.find('form').eq(0).on('submit', function (e) {
                    e.preventDefault();
                    var regBox = $(this).parents('.reg-box');
                    var data = {
                        username: $.trim(regBox.find('[name=username]').val()),
                        sms_code: $.trim(regBox.find('[name=sms_code]').val()),
                        password: $.trim(regBox.find('[name=password]').val()),
                    }
                    if (!data.username) {
                        layer.alert('请输入手机号码');
                        return false;
                    }
                    if (!(/^1(3|4|5|7|8)\d{9}$/.test(data.username))) {
                        layer.alert('手机号码格式不正确');
                        return false;
                    }
                    if (!data.sms_code) {
                        layer.alert('请输入验证码');
                        return false;
                    }
                    if (!data.password) {
                        layer.alert('请输入密码');
                        return false;
                    }
                    api.reg(data)
                        .then(function (res) {
                            api.login({username: data.username, password: data.password})
                                .then(function (respone) {
                                    that.storeUserInfo(respone.data);
                                    util.reload();
                                });
                        });
                    return false;
                });

                ele.find('form').eq(1).on('submit', function (e) {
                    e.preventDefault();
                    var regBox = $(this).parents('.reg-box');
                    var data = {
                        username: $.trim(regBox.find('[name=username]').val()),
                        password: $.trim(regBox.find('[name=password]').val()),
                    }
                    if (!data.username) {
                        layer.alert('请输入用户名');
                        return false;
                    }
                    if (!data.password) {
                        layer.alert('请输入密码');
                        return false;
                    }
                    api.reg(data)
                        .then(function (res) {
                            api.login({username: data.username, password: data.password})
                                .then(function (res) {
                                    that.storeUserInfo(res.data);
                                    util.reload();
                                });
                        });
                    return false;
                });
            };
            layer.open(this.dialogConfig);
        },
        forget: function () {
            var that = this;
            this.dialogConfig.area = ['410px', '535px'];
            this.dialogConfig.content = '<div class="u-bor30">\
                                            <form>\
                                            <div class="login u-bgc-fff u-br20">\
                                                <h3 class="u-fs30 u-fwb u-tc u-pt20 u-pb20"><span class="icon-bar-dialog-back u-cp" onclick="layer.closeAll();bar.login();"></span>忘记密码</h3>\
                                                <div class="phone clearfix"><input class="input u-fl" type="text" name="phone" placeholder="请输入手机号码" autocomplete="off"><button type="button" class="u-fl" onclick="bar.sendCode(this,\'find_pwd\');">发送验证码</button></div>\
                                                <div class="valicode u-mt20"><input class="input" type="text" name="sms_code" placeholder="请输入验证码" autocomplete="off"><label for="valicode" class="icon-valicode"></label></div>\
                                                <div class="password u-mt20"><input class="input" type="password" name="password" placeholder="请输入密码" autocomplete="off"><label for="password" class="icon-password"></label></div>\
                                                <div class="btn u-mt30"><button type="submit" class="u-fs22 u-br10" id="findPwdBtn">确认</button></div>\
                                            </div>\
                                            </form>\
                                            <div class="icon-bar-close u-m0a u-mt45 u-cp" id="loginForgetClose"></div>\
                                        </div>';
            this.dialogConfig.success = function (ele, index) {

                ele.find('#loginForgetClose').on('click', function () {
                    layer.close(index);
                });
                ele.find('[name=phone]').focus();
                ele.find('form').on('submit', function (e) {
                    e.preventDefault();
                    var data = {
                        phone: $.trim(ele.find('[name=phone]').val()),
                        sms_code: $.trim(ele.find('[name=sms_code]').val()),
                        password: $.trim(ele.find('[name=password]').val()),
                    }
                    if (!data.phone) {
                        layer.alert('请输入手机号码');
                        return false;
                    }
                    if (!(/^1(3|4|5|7|8)\d{9}$/.test(data.phone))) {
                        layer.alert('手机号码格式不正确');
                        return false;
                    }
                    if (!data.sms_code) {
                        layer.alert('请输入验证码');
                        return false;
                    }
                    if (!data.password) {
                        layer.alert('请输入密码');
                        return false;
                    }
                    api.findPwd(data)
                        .then(function (res) {
                            layer.alert(res.msg);
                        });
                    return false;
                });
            };
            layer.open(this.dialogConfig);
        },
        change: function () {
            var that = this;
            this.dialogConfig.area = ['410px', '535px'];
            this.dialogConfig.content = '<div class="u-bor30">\
                                            <form>\
                                            <div class="login change u-bgc-fff u-br20">\
                                                <h3 class="u-fs30 u-fwb u-tc u-pt20 u-pb20">修改密码</h3>\
                                                <div class="password"><input class="input" type="password" name="old_pwd" placeholder="请输入当前密码（6-16位字符）" autocomplete="off"></div>\
                                                <div class="password u-mt20"><input class="input" type="password" name="new_pwd" placeholder="请输入新密码（6-16位字符）" autocomplete="off"></div>\
                                                <div class="password u-mt20"><input class="input" type="password" name="repeat_pwd" placeholder="请再次输入新密码（6-16位字符）" autocomplete="off"></div>\
                                                <div class="btn u-mt30"><button type="submit" class="u-fs22 u-br10" id="changeBtn">确认</button></div>\
                                            </div>\
                                            </form>\
                                            <div class="icon-bar-close u-m0a u-mt45 u-cp" id="loginChangeClose"></div>\
                                        </div>';
            this.dialogConfig.success = function (ele, index) {

                ele.find('#loginChangeClose').on('click', function () {
                    layer.close(index);
                });
                ele.find('[name=old_pwd]').focus();
                ele.find('form').on('submit', function (e) {
                    e.preventDefault();
                    var data = {
                        old_pwd: $.trim(ele.find('[name=old_pwd]').val()),
                        new_pwd: $.trim(ele.find('[name=new_pwd]').val()),
                        repeat_pwd: $.trim(ele.find('[name=repeat_pwd]').val()),
                        username: util.getStorage('userInfo').user_name
                    }
                    if (!data.old_pwd) {
                        layer.alert('请输入当前密码');
                        return false;
                    }
                    if (!data.new_pwd) {
                        layer.alert('请输入新密码');
                        return false;
                    }
                    if (data.new_pwd !== data.repeat_pwd) {
                        layer.alert('两次密码输入不一致');
                        return false;
                    }

                    api.changePwd(data)
                        .then(function (res) {
                            that.logout();
                        });
                    return false;
                });

            };
            layer.open(this.dialogConfig);

        },
        storeUserInfo: function (data) {
            util.setStorage('userInfo', data);
        },
        signIn: function () {
            var userInfo = $('#userInfo');
            userInfo.show().prev().hide().end().find('.username').text(util.getStorage('userInfo').user_name);
        },
        confirmLogout: function () {
            var that = this;
            layer.confirm('确认要注销吗？', function (index) {
                api.logout()
                    .then(function () {
                        that.logout();
                    })
            });
        },
        logout: function () {
            util.clearStorage();
            util.reload();
        },
        countDown: function (e) {
            var that = this;
            var time = that.time;
            e.innerHTML = that.time + 's';
            e.disabled = true;
            var timer = setInterval(function () {
                if (that.time == 0) {
                    clearInterval(timer);
                    e.innerHTML = '发送验证码';
                    e.disabled = false;
                    that.time = time;
                } else {
                    that.time--;
                    e.innerHTML = that.time + 's';
                }
            }, 1000)
        },
        sendCode: function (e, type) {
            var that = this;
            var phone = $.trim($(e).prev().val());
            if (!phone) {
                layer.alert('请输入手机号码');
                return;
            }
            if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
                layer.alert('手机号码格式不正确');
                return;
            }
            api.sendCode({phone: phone, type: type})
                .then(function (res) {
                    that.countDown(e);
                });
        },
    };


    window.common = {
        tabToggle: function (e) {
            var node = $(e);
            var siblings = $(e).siblings();
            var index = $(e).index();
            var listBox = node.parent().nextAll();
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
    }

    window.util = {
        getQueryString: function (name) {
            var url = window.location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url !== '') {
                if (url.indexOf("?") != -1) {
                    var str = url.substr(1);
                    var strs = str.split("&");
                    for (var i = 0; i < strs.length; i++) {
                        theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
                    }
                }
            } else {
                return '';
            }

            return theRequest[name];
        },
        //获取url参数
        request: function (paras) {
            var url = location.href;
            var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
            var paraObj = {};
            for (i = 0; j = paraString[i]; i++) {
                paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
            }
            var returnValue = paraObj[paras.toLowerCase()];
            if (typeof (returnValue) == "undefined") {
                return "";
            } else {
                return returnValue;
            }
        },
        setStorage: function (key, val) {
            window.localStorage.setItem(key, JSON.stringify(val));
        },
        getStorage: function (key) {
            return $.parseJSON(window.localStorage.getItem(key));
        },
        removeStorage: function (key) {
            window.localStorage.removeItem(key);
        },
        clearStorage: function () {
            window.localStorage.clear();
        },
        reload: function () {
            window.location.reload();
        },
        flashChecker: function () {
            var hasFlash = 0; //是否安装了flash
            var flashVersion = 0; //flash版本
            if (document.all) {
                try {
                    var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                    if (swf) {
                        hasFlash = 1;
                        var VSwf = swf.GetVariable("$version");
                        flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
                    }
                } catch (e) {
                    hasFlash = 0;
                }
            } else {
                if (navigator.plugins && navigator.plugins.length > 0) {
                    var swf = navigator.plugins["Shockwave Flash"];
                    if (swf) {
                        hasFlash = 1;
                        var words = swf.description.split(" ");
                        for (var i = 0; i < words.length; ++i) {
                            if (isNaN(parseInt(words[i]))) continue;
                            flashVersion = parseInt(words[i]);
                        }
                    }
                }
            }
            return {f: hasFlash, v: flashVersion};
        }
    };

    window.ScrollBox = function (selector) {
        this.$el = document.querySelector('.scrollbar__bar');
        this.wrap = document.querySelector('.scrollbar-wrapper');
        this.Y = 0;
        this.cursorDown = false;
        this.selector = selector;
        this.init();

    };
    ScrollBox.prototype.init = function () {
        this.scrollUpdate();
        $(this.selector).on('mousedown', '.scrollbar__thumb', (e) => {
            this.startDrag(e);
            this.Y = (e.currentTarget.offsetHeight - (e.clientY - e.currentTarget.getBoundingClientRect().top));
        })
        $(this.wrap).on('scroll', () => {
            const wrap = this.wrap;

            const moveY = ((wrap.scrollTop * 100) / wrap.clientHeight);
            document.querySelector('.scrollbar__thumb').style.transform = `translateY(${ moveY }%)`
        })
    };
    ScrollBox.prototype.scrollUpdate = function () {
        let heightPercentage;
        const wrap = document.querySelector('.scrollbar-wrapper');
        if (!wrap) return;

        heightPercentage = (wrap.clientHeight * 100 / wrap.scrollHeight);

        let sizeHeight = (heightPercentage < 100) ? (heightPercentage + '%') : '';
        $('.scrollbar__thumb').height(sizeHeight)
    };
    ScrollBox.prototype.renderThumbStyle = function ({move, size, bar}) {
        const style = {};
        const translate = `translateY(${ move }%)`;
        style.transform = translate;
        style.msTransform = translate;
        style.webkitTransform = translate;

        return style;
    };
    ScrollBox.prototype.startDrag = function (e) {
        e.stopImmediatePropagation();
        this.cursorDown = true;

        $(document).on('mousemove', (e) => {
            if (this.cursorDown === false) return;
            const prevPage = this.Y;
            if (!prevPage) return;

            const offset = ((this.$el.getBoundingClientRect().top - e.clientY) * -1);
            // console.log(offset)
            const thumbClickPosition = (document.querySelector('.scrollbar__thumb').offsetHeight - prevPage);
            const thumbPositionPercentage = ((offset - thumbClickPosition) * 100 / this.$el.offsetHeight);
            this.wrap.scrollTop = (thumbPositionPercentage * this.wrap.scrollHeight / 100);
            const move = ((this.wrap.scrollTop * 100) / this.wrap.clientHeight);
            document.querySelector('.scrollbar__thumb').style.transform = `translateY(${ move }%)`
            //   document.querySelector('#p-list').style.transform = `translateY(-${ thumbPositionPercentage }%)`
        });
        $(document).on('mouseup', this, this.mouseUpDocumentHandler);
        document.onselectstart = () => false;
    };
    ScrollBox.prototype.mouseUpDocumentHandler = function (e) {
        this.cursorDown = false;
        this.Y = 0;
        $(document).off('mousemove');
        document.onselectstart = null;
    };
    var index;
    $(document).ajaxStart(function () {
        index = layer.load()
    });
    $(document).ajaxStop(function () {
        layer.close(index)
    });
    $(document).ajaxError(function () {
        layer.msg('请求错误');
    });

})();
