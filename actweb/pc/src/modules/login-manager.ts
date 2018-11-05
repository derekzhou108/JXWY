import * as util from './utils';
import Http from './http';

declare const layer: any;

class LoginManager {
  private static _instance: LoginManager;
  private time = 60;
  private _httpInstance: Http;
  private dialogConfig = {
    type: 1,
    title: !1,
    closeBtn: 0,
    shadeClose: !1,
    area: ['380px', '535px'],
    skin: 'account-dialog',
    shade: [.7, '#000'],
    content: '',
    success: function (a: any, b: any) {
      console.log(a, b);
    }
  };

  private constructor() {
    this._httpInstance = Http.Instance;
  }

  public static get Instance(): LoginManager {
    return this._instance || (this._instance = new this());
  }

  login() {
    var e = this;
    this.dialogConfig.area = ['410px', '305px'];
    this.dialogConfig.content = `
            <div class="dialog-wrap">
    <form>
        <div class="login">
            <div class="login-header">登录
                <div class="icon-account-close" id="loginClose"></div>
            </div>
            <div class="username"><input class="input" type="text" name="username" placeholder="请输入帐号或手机号"
                                         autocomplete="off"><label for="username" class="icon-user"></label></div>
            <div class="password"><input class="input" type="password" name="password" placeholder="请输入密码"
                                         autocomplete="off"><label for="password" class="icon-password"></label></div>
            <div class="link">
              <a class="f-psd">忘记密码</a> 
              <span class="line">丨</span>
              <a  class="reg-a">注册</a>
            </div>
            <div class="btn">
                <button type="submit" class="login-btn">登&nbsp;&nbsp;录</button>
            </div>
        </div>
    </form>
</div>
            `;
    this.dialogConfig.success = function (t, n) {
      t.find('#loginClose').on('click', function () {
        layer.close(n);
      });
      t.find('.f-psd').on('click', () => {
        layer.closeAll();
        e.forget();
      });
      t.find('.reg-a').on('click', () => {
        layer.closeAll();
        e.register();
      });
      t.find('[name=username]').focus();
      t.find('form').on('submit', function (n: any) {
        n.preventDefault();
        const i = {
          username: $.trim(t.find('[name=username]').val()),
          password: $.trim(t.find('[name=password]').val())
        };
        return i.username ? i.password ? (e._httpInstance.login(i).then(function (t) {
          util.setStorage('userInfo', t.data),
                  e.reload();
        }),
                !1) : (layer.alert('请输入密码'),
                !1) : (layer.alert('请输入手机号/帐号'),
                !1);
      });
    };
    layer.open(this.dialogConfig);
  }

  register() {
    const e = this;
    this.dialogConfig.area = ['380px', '375px'];
    this.dialogConfig.content = `
            <div class="dialog-wrap">
    <div class="login login-register">
        <div class="login-header"><span class="icon-account-dialog-back" ></span>注册
            <div class="icon-account-close" id="loginRegisterClose"></div>
        </div>
        <div class="register-title clear">
        <span class="active register-title-phone"
                                              ><em>手机</em></span>
        <span
                class="register-title-username"
              ><em>用户名</em></span>
        </div>
        <div class="reg-box">
            <form>
                <div class="phone u-clearfix">
                <input class="input" type="text" name="username" placeholder="请输入手机号码"
                                             autocomplete="off">
                    <button type="button" class="getCode">发送验证码</button>
                    <label for="valicode" class="icon-phone"></label></div>
                <div class="valicode"><input class="input" type="text" name="sms_code" placeholder="请输入验证码"
                                             id="valicode" autocomplete="off"><label for="valicode"
                                                                                     class="icon-valicode"></label>
                </div>
                <div class="password"><input class="input" type="password" name="password" placeholder="请输入密码（6-16位）"
                                             id="password" autocomplete="off"><label for="password"
                                                                                     class="icon-password"></label>
                </div>
                <div class="arg">注册表示您同意 <a href="http://kscdn.ksgame.com/adminIP/home.html"
                                            target="_blank">《凯撒用户协议》</a><a class="account-has"
                                                                         >已有帐号</a>
                </div>
                <div class="btn">
                    <button type="submit" class="login-btn" id="phoneReg">注册并登录</button>
                </div>
            </form>
        </div>
        <div class="reg-box hide">
            <form>
                <div class="username"><input class="input" type="text" name="username" placeholder="请输入用户名（6-16位）"
                                             autocomplete="off"><label for="username" class="icon-user"></label></div>
                <div class="password"><input class="input" type="password" name="password" placeholder="请输入密码（6-16位）"
                                             autocomplete="off"><label for="password" class="icon-password"></label>
                </div>
                <div class="arg">注册表示您同意 <a href="http://kscdn.ksgame.com/adminIP/home.html"
                                            target="_blank">《凯撒用户协议》</a><a class="account-has"
                                                                           onclick="">已有帐号</a>
                </div>
                <div class="btn">
                    <button type="submit" class="login-btn" id="userReg">注册并登录</button>
                </div>
            </form>
        </div>
    </div>
</div>
            `;
    this.dialogConfig.success = function (t, n) {
      t.find('.account-has').on('click', function () {
        layer.closeAll();
        e.login();
      });
      t.find('.getCode').on('click', function () {
        e.sendCode(this, 'reg');
      });
      t.find('.register-title-username').on('click', function () {
        e.tabToggle(this);
        $(this).parent().nextAll().eq(1).find('[name=username]').focus();
      });
      t.find('.register-title-phone').on('click', function () {
        e.tabToggle(this);
        $(this).parent().nextAll().eq(0).find('[name=username]').focus();
      });
      t.find('.icon-account-dialog-back').on('click', function () {
        layer.closeAll();
        e.login();
      });
      t.find('#loginRegisterClose').on('click', function () {
        layer.close(n);
      });
      t.find('[name=username]').eq(0).focus();
      t.find('form').eq(0).on('submit', function (t: any) {
        t.preventDefault();
        var n = $(this).parents('.reg-box')
                , i = {
          username: $.trim(n.find('[name=username]').val() as string),
          sms_code: $.trim(n.find('[name=sms_code]').val() as string),
          password: $.trim(n.find('[name=password]').val() as string)
        };
        return i.username ? /^1(3|4|5|7|8)\d{9}$/.test(i.username) ? i.sms_code ? i.password ? (e._httpInstance.reg(i).then(function () {
          e._httpInstance.login({
            username: i.username,
            password: i.password
          }).then(function (t) {
            util.setStorage('userInfo', t.data);
            e.reload();
          });
        }),
                !1) : (layer.alert('请输入密码'),
                !1) : (layer.alert('请输入验证码'),
                !1) : (layer.alert('手机号码格式不正确'),
                !1) : (layer.alert('请输入手机号码'),
                !1);
      });
      t.find('form').eq(1).on('submit', function (t: any) {
        t.preventDefault();
        var n = $(this).parents('.reg-box')
                , i = {
          username: $.trim(n.find('[name=username]').val() as string),
          password: $.trim(n.find('[name=password]').val() as string)
        };
        return i.username ? i.password ? (e._httpInstance.reg(i).then(function () {
          e._httpInstance.login({
            username: i.username,
            password: i.password
          }).then(function (t) {
            util.setStorage('userInfo', t.data);
            e.reload();
          });
        }),
                !1) : (layer.alert('请输入密码'),
                !1) : (layer.alert('请输入用户名'),
                !1);
      });
    };
    layer.open(this.dialogConfig);
  }

  forget() {
    const _this = this;
    this.dialogConfig.area = ['380px', '335px'];
    this.dialogConfig.content = `
<div class="dialog-wrap">
    <form>
        <div class="login login-forget">
            <div class="login-header">
            <span class="icon-account-dialog-back"></span>
            忘记密码
                <div class="icon-account-close" id="loginForgetClose"></div>
            </div>
            <div class="phone u-clearfix">
            <input class="input" type="text" name="phone" placeholder="请输入手机号码" autocomplete="off">
                <button class="send-code" type="button" onclick="">发送验证码</button>
                <label for="phone" class="icon-phone"></label>
                </div>
            <div class="valicode">
            <input class="input" type="text" name="sms_code" placeholder="请输入验证码"
                                         autocomplete="off">
                                         <label for="valicode" class="icon-valicode"></label>
                                         </div>
            <div class="password">
            <input class="input" type="password" name="password" placeholder="请输入密码"
                                         autocomplete="off">
                                         <label for="password" class="icon-password"></label></div>
            <div class="btn">
                <button type="submit" class="login-btn" id="findPwdBtn">确认</button>
            </div>
        </div>
    </form>
</div>
            `;
    this.dialogConfig.success = function (e, t) {
      e.find('.icon-account-dialog-back').on('click', function () {
        layer.closeAll();
        _this.login();
      });
      e.find('.send-code').on('click', function () {
        _this.sendCode(this, 'find_pwd');
      });
      e.find('#loginForgetClose').on('click', function () {
        layer.close(t);
      });
      e.find('[name=phone]').focus();
      e.find('form').on('submit', function (t: any) {
        t.preventDefault();
        const n = {
          phone: $.trim(e.find('[name=phone]').val()),
          sms_code: $.trim(e.find('[name=sms_code]').val()),
          password: $.trim(e.find('[name=password]').val())
        };
        return n.phone ? /^1(3|4|5|7|8)\d{9}$/.test(n.phone) ? n.sms_code ? n.password ? (_this._httpInstance.findPwd(n).then(function (e) {
          layer.alert(e.msg, function () {
            layer.closeAll();
            _this.login();
          });
        }),
                !1) : (layer.alert('请输入密码'),
                !1) : (layer.alert('请输入验证码'),
                !1) : (layer.alert('手机号码格式不正确'),
                !1) : (layer.alert('请输入手机号码'),
                !1);
      });
    };
    layer.open(this.dialogConfig);
  }

  change() {
    const e = this;
    this.dialogConfig.area = ['410px', '335px'];
    this.dialogConfig.content = `
            <div class="dialog-wrap">
    <form>
        <div class="login change">
            <div class="login-header"></span>修改密码
                <div class="icon-account-close" id="loginChangeClose"></div>
            </div>
            <div class="password"><input class="input" type="password" name="old_pwd" placeholder="请输入当前密码（6-16位字符）"
                                         autocomplete="off"></div>
            <div class="password"><input class="input" type="password" name="new_pwd" placeholder="请输入新密码（6-16位字符）"
                                         autocomplete="off"></div>
            <div class="password"><input class="input" type="password" name="repeat_pwd" placeholder="请再次输入新密码（6-16位字符）"
                                         autocomplete="off"></div>
            <div class="btn">
                <button type="submit" class="login-btn" id="changeBtn">确认</button>
            </div>
        </div>
    </form>
</div>
            `;
    this.dialogConfig.success = function (t, n) {
      t.find('#loginChangeClose').on('click', function () {
        layer.close(n);
      });
      t.find('[name=old_pwd]').focus();
      t.find('form').on('submit', function (n: any) {
        n.preventDefault();
        var i = {
          old_pwd: $.trim(t.find('[name=old_pwd]').val()),
          new_pwd: $.trim(t.find('[name=new_pwd]').val()),
          repeat_pwd: $.trim(t.find('[name=repeat_pwd]').val()),
          username: util.getStorage('userInfo').user_name
        };
        return i.old_pwd ? i.new_pwd ? i.new_pwd !== i.repeat_pwd ? (layer.alert('两次密码输入不一致'),
                !1) : (e._httpInstance.changePwd(i).then(function () {
          e.logout();
        }),
                !1) : (layer.alert('请输入新密码'),
                !1) : (layer.alert('请输入当前密码'),
                !1);
      });
    };
    layer.open(this.dialogConfig);
  }

  confirmLogout() {
    const e = this;
    layer.confirm('确认要注销吗？', function () {
      e._httpInstance.logout().then(function () {
        e.logout();
      });
    });
  }

  tabToggle(e: any) {
    var t = $(e)
            , n = $(e).siblings()
            , i = $(e).index()
            , a = t.parent().nextAll();
    t.addClass('active'),
            n.removeClass('active'),
            $.each(a, function (e, t) {
              t.style.display = e === i ? 'block' : 'none';
            });
  }

  reload() {
    window.location.reload();
  }

  logout() {
    util.clearStorage();
    window.open('/down', '_self');
  }

  countDown(e: any) {
    var t = this, n = t.time;
    e.innerHTML = t.time + 's';
    e.disabled = !0;
    var i = setInterval(function () {
      0 === t.time ? (clearInterval(i),
              e.innerHTML = '发送验证码',
              e.disabled = !1,
              t.time = n) : (t.time--,
              e.innerHTML = t.time + 's');
    }, 1e3);
  }

  sendCode(e: any, t: string) {
    var n = this, i = $.trim($(e).prev().val() as string);
    return i ? /^1(3|4|5|7|8)\d{9}$/.test(i) ? void this._httpInstance.sendCode({
      phone: i,
      type: t
    }).then(function () {
      n.countDown(e);
    }) : void layer.alert('手机号码格式不正确') : void layer.alert('请输入手机号码');
  }
}

export default LoginManager;