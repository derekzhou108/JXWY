/*
 各种弹框 和回调
 */
import Http from './http';
import Dialog from './dialog';

declare const template: any;

export class ShowDialog {
  private static _instance: ShowDialog;
  public isAbled = true;
  public giftDescs: any = {
    'g1': ['银饼*18888', '豪华诗会函*3', '玫瑰*10'],
    'g2': ['金饼*20', '银饼*28888', '学识礼包*5'],
    'g3': ['金饼*30', '仙柳露*3', '花魂养成礼包*10'],
    'g4': ['金饼*50', '诰命*300', '学识礼包*5'],
    'g5': ['金兰*10', '君桃*1', '烟花礼包*3']
  };
  public defaultData: any;
  private _httpInstance: Http;
  private _dialogInstance: Dialog;

  private constructor() {
    this._httpInstance = Http.Instance;
    this._dialogInstance = Dialog.Instance;
  }

  public static get Instance(): ShowDialog {
    return this._instance || (this._instance = new this());
  }

  dialog1(type: number, data: any) {
    let temp = '';
    switch (type) {
      case 1:
        temp = `<div class="k-1-1">
                <div class="k1-title">
                <span class="icon-g-title-2"></span>
                <span class="k1-subText">分享下方二维码邀请好友</span>
                </div>
                <section class="code-wrapper">
                <img style="width: 197px;height: 197px;" src="${data.imgUrl}" alt="">
                </section>
                </div>`;
        break;
      default:
    }
    const options = {
      backdropClass: '-k1',
      width: '438px',
      height: '440px'
    };
    this._dialogInstance.open(temp, options);
  }

  dialog2(type: number, data?: any) {
    let temp = '';
    switch (type) {
      case 1:
        temp = `<div class="k-2-1">
                <div class="title">
                <span>请填写您的预约手机号</span>
                </div>
                <div class="body">
                <section class="form-wrapper">
                <input type="text" class="data-text" id="tel" placeholder="输入手机号码" maxlength="11" />
                </section>
                </div>
                <div class="footer">
                <button type="button" class="dialog-btn">确认</button>
                </div>
                <p class="error-msg"></p>
                </div>`;
        break;
      case 2:
        temp = `<div class="k-2-2">
                    <div class="title">
                    <span>恭喜小主中奖</span>
                    </div>
                    <div class="body">
                    <span class="icon-pri-item-${data.index}"></span>
                    <span class="desc">${data.name}</span></div>
                    <div class="footer">
                    <button type="button" class="dialog-btn">确认</button>
                    </div>
                </div>`;
        break;
      case 3:
        temp = `<div class="k-2-3">
<div class="title"><span>抽奖次数剩余：<strong style="color:#ee2323 ">${data}</strong></span></div>
<div class="body"><span>邀请好友在本页面下载游戏即可获得抽奖机会哦！</span></div>
<div class="footer">
<button type="button" class="dialog-btn">立即邀请好友</button>
</div>
 </div>`;
        break;
      case 4:
        temp = `<div class="k-2-4">
<div class="title"><span>温馨提示</span></div>
<div class="body"><span>奖励兑换在公测后开放，请小主多多关注！</span></div>
<div class="footer">
<button type="button" class="dialog-btn">确认</button>
</div>
</div>`;
        break;
      default:
    }
    const options = {
      backdropClass: '-k2',
      width: '438px',
      height: '312px'
    };
    return this._dialogInstance.open(temp, options);
  }

  dialog3(type: number, mob?: string) {
    let temp = '';
    switch (type) {
      case 1:
        temp = `<div class="k-3-1">
<div class="k3-title"><span class="icon-g-title-1"></span></div>
<span class="k3-title-text">请选择您的手机系统，以便正常接收礼包激活码</span>
<div class="k3-body">
<section class="tab-menu">
                <ul class="menu">
                    <li class="item ${mob === 'ios' ? 'active' : ''}" data-type="1"><em class="text">ios用户</em></li>
                    <li class="item ${mob === 'az' ? 'active' : ''}" data-type="2"><em class="text">安卓用户</em></li>
                </ul>
              </section>
              <section class="form-wrapper">
                <input type="text" class="data-text" id="tel" placeholder="输入手机号码" maxlength="11" />
              </section>
              <section class="form-wrapper">
                <input type="text" class="data-text" id="code" placeholder="输入验证码" maxlength="6" />
                <button type="button" class="get-code">获取验证码</button>
              </section>
</div><div class="k3-footer">
<button type="button" class="appSup">立即预约</button>
</div>
<p class="error-msg"></p>
</div>`;
        break;
      case 2:
        temp = `
        <div class="k-3-2">
        <div class="title"><strong>恭喜您</strong><span>已成功参与公测预约</span></div>
      
       
        <div class="qr-container"><img src="../dist/img/qr-1.png"><p>扫码关注微信更多福利抢先知</p></div>
        </div>
        `;
        break;
      case 3:
        temp = `<div class="k-3-3">
<div class="title"><span>中奖记录</span></div>
<div class="body"></div>
</div>`;
        break;
      case 4:
        temp = `<div class="k-3-4">
<div class="title"><span>好友入宫详情</span></div>
<div class="body"></div>
</div>`;
        break;
      default:
    }
    const opts = {
      backdropClass: '-k3',
      width: '438px',
      height: '490px'
    };
    return this._dialogInstance.open(temp, opts);
  }

  dialog4(type: number, data: any) {
    let temp = '';
    switch (type) {
      case 1:
        temp = `
        <div class="k4-title">
            <span class="icon-k4-title-${data}"></span>
                    </div>
            <div class="k4-subtitle">
                <span class="icon-k4-subtitle-${data}"></span>
                    </div>
               <div class="giftBox u-clearfix">
                <div class="item">
                <p class="dialogGiftBg">
                <img src="../dist/img/icon/${data}1.png" alt=""></p>
                <p>${this.giftDescs[data][0]}</p></div>
                <div class="item">
                <p class="dialogGiftBg">
                <img src="../dist/img/icon/${data}2.png" alt=""></p>
                <p>${this.giftDescs[data][1]}</p></div>
                <div class="item"><p class="dialogGiftBg">
                <img src="../dist/img/icon/${data}3.png" alt=""></p>
                <p>${ this.giftDescs[data][2]}</p></div>
        </div>
`;
        break;
      default:
    }
    const options = {
      backdropClass: '-k4',
      width: '820px',
      height: '440px'
    };
    this._dialogInstance.open(temp, options);
  }

  dialog5(type: number, data: any) {
    const div3 = `<span class="icon-bag-10"></span>`;
    let temp = '';
    switch (type) {
      case 1:
        temp = `
        <div class="t1">
        <span>${data.store.con[data.index - 1].text}</span>
        </div>
        <div class="t2">
        <span class="t2-text">${data.store.con[data.index - 1].long}</span>
        ${data.index == 3 || data.index == 8 || data.index == 10 ? div3 : ''}
        </div>`;
        break;
      default:
    }
    const options = {
      backdropClass: '-k5',
      width: '574px',
      height: '308px'
    };
    this._dialogInstance.open(temp, options);
  }

  dialog6(type: number, data?: any) {
    const _this = this;
    let temp = '';
    switch (type) {
      case 1:
        temp = `<div class="k-6-1">
        <div class="dg1">
        <span>抱歉，您还没有参与公测预约！</span>
        <button type="button" class="dialog-btn">立即预约</button>
        </div></div>`;
        break;
      case 2:
        temp = `<div class="k-6-2">
        <div class="dg1">
        <button type="button" class="dialog-btn" data-num="1">我已预约</button>
        <button type="button" class="dialog-btn"  data-num="2">立即预约</button></div></div>`;
        break;
      case 3:  // 公共信息展示
        temp = `<div class="k-6-3">
<div class="body"><span>${data}</span></div>
<div class="footer">
<button type="button" class="dialog-btn">确认</button>
</div>
</div>`;
        break;
      default:
        break;
    }
    const options = {
      backdropClass: '-k6',
      width: '438px',
      height: '237px'
    };
    return this._dialogInstance.open(temp, options).then(() => {
      if (type === 3) {
        $('.k-6-3').on('click', '.dialog-btn', function () {
          _this._dialogInstance.closeDialog();
          // _this.showAppointment();
        });
      } else {
      }
    });
  }

  // 选择区服
  dialog7(type: number, data?: any) {
    const _this = this;
    let temp = '';
    switch (type) {
      case 1:
        temp = `<div class="k-7-1">
<div class="title"><span style="padding-right: 60px">已经获得奖励</span><span>数量</span></div>
<div class="body"></div>
</div>`;
        break;
      case 2:
        temp = `<div class="k-7-2">
<div class="title"><span>请小主选择系统和服务器</span></div>
<div class="subtitle"><span>奖励将通过邮件发放，请注意查收</span></div>
<div class="select-group">
<div class="item">
<label for="appId">选择系统</label>
<select name="appId" id="appId">
<option value="">请选择系统</option>
</select>
</div>
<div class="item">
<label for="serverId">选择区服</label>
<select name="serverId" id="serverId">
<option value="">请选择大区</option>
</select>
</div>
<div class="item">
<label for="partName">角色名称</label>
 <input type="text" readonly class="data-text" id="partName" />
</div>
 <div class="msg-container"><span class="error-msg"></span></div>
 <div class="footer">
<button type="button" class="dialog-btn">确认</button>
</div>
</div>
        </div>`;
        break;
      case 3:
        temp = `
        <div class="k-7-3">
        <div class="title"><span>请小主填写邮寄地址哦！</span></div>
        <div class="body">
        <div class="item">
<label for="exchangeAddress">收件人地址</label>
 <input type="text"  class="data-text" id="exchangeAddress" />
</div>
<div class="item">
<label for="exchangePhone">联系电话</label>
 <input type="text"  class="data-text" id="exchangePhone" />
</div>
</div>
 <div class="msg-container"><span class="error-msg"></span></div>
<div class="footer">
<button type="button" class="dialog-btn">确认</button>
</div>
</div>
        `;
        break;
      default:
        break;
    }
    const options = {
      backdropClass: '-k7',
      width: '574px',
      height: '378px'
    };
    return this._dialogInstance.open(temp, options).then(() => {
      if (type === 2) {
        _this._httpInstance.getAccountInfo().then(res => {
          if (res.code === 10000) {
            _this.defaultData = res.data;
            $('#appId').html(template('sel-opts', res.data));
          }
        });
        $('#appId').on('change', function () {
          $('.error-msg').html('');
          $('#partName').val('');
          if ($(this).val() !== '') {
            $('#serverId').html(template('sel2-opts', _this.defaultData[$(this).val() as string].serverList));
          } else {
            $('#serverId').html(`<option value="">请选择大区</option>`);
          }
        });
        $('#serverId').on('change', function () {
          $('.error-msg').html('');
          $('#partName').val('');
          $('#partName').removeData('roleId');
          if ($(this).val() !== '') {
            _this._httpInstance.getUserInfo({
              appId: $('#appId').val(),
              userId: data.user_id,
              serverId: $(this).val()
            }).then(res => {
              if (res.code === 10000) {
                $('#partName').val(res.data[0].roleName);
                $('#partName').data('roleId', res.data[0].roleId);
              } else {
                $('.error-msg').html(res.msg);
              }
            });
          } else {
            $('#partName').val('');
          }
        });
      }
    });
  }

  dialogMsg(msg: string) {
    const dError = $('.error-msg');
    dError.text(msg).show();
    setTimeout(function () {
      dError.hide();
    }, 3000);
  }

  doCode(tel: string) {
    const _this = this;
    if (this.isAbled) {
      this._httpInstance.getSmsCode({mobile: tel}).then(function (res: any) {
        if (res.code === 10000) {
          let i = 60;
          _this.isAbled = false;
          const timer = setInterval(function () {
            if (i > 0) {
              i--;
              $('.get-code').text('已发送(' + i + ')');
            } else {
              $('.get-code').text('点击重新发送');
              clearInterval(timer);
              _this.isAbled = true;
            }
          }, 1000);
          _this.dialogMsg(res.msg);
        } else if (10001 === res.code) {
          _this.dialogMsg(res.msg);
        } else {
          // ksGame.
          _this.dialogMsg(res.msg);
        }
      });
    }
  }
}

export default ShowDialog;
