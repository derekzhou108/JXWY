import AudioController from './audio';
import Http from './http';
import Dialog from './dialog';
import ShowDialog from './components';
import { getStorage } from './utils';
import LoginManager from './login-manager';

declare const template: any;

interface ResponseBody {
  code: number;
  data: any[] | string;
}

class KaiserGame {
  private static _instance: KaiserGame;
  public isWx: boolean;
  public isWap: boolean;
  //public api = '/static/act/pc/mock/default.json';
  public api = '../dist/mock/default.json';
  public defaultData: any;
  public swiper: any;
  public isAbled = true;
  private _httpInstance: Http;
  private _dialogInstance: Dialog;
  private _loginInstance: LoginManager;
  private _show: ShowDialog;

  private constructor() {
    this.isWap = false;
    this.isWx = false;
    this._httpInstance = Http.Instance;
    this._dialogInstance = Dialog.Instance;
    this._show = ShowDialog.Instance;
    this._loginInstance = LoginManager.Instance;
  }

  public static get Instance(): KaiserGame {
    return this._instance || (this._instance = new this());
  }

  public init() {
    this.drawingDom(() => {
      // 页面渲染完成后的回调
      this.getNum();
      this.bindEvent();
      // ksGame.pcShare()
    });
    this.scrollPage();
    const audio = AudioController.Instance;
    audio.videoShow('#playVideo', 680, 500);
  }

  drawingDom(done: Function) {
    $.get(this.api, (data: any) => {
      const temps = ['tpl2', 'tpl3', 'tlp4', 'tpl6'];
      const box = ['#pos-tpl2', '#pos-tlp3', '#pos-tlp4', '#pos-tlp6'];
      const recData = typeof(data) === 'string' ? JSON.parse(data).data : data.data;
      this.defaultData = recData;
      temps.forEach((item, index) => {
        document.querySelector(box[index])!.innerHTML = template(item, recData);
      });
      this.swiperInit();
      const userInfo = getStorage('userInfo');
      document.querySelector('.area-info')!.innerHTML = template('userInfo', !userInfo ? {} : userInfo);
      if (userInfo) {
        this._httpInstance.getPrizeTime(userInfo.user_id).then(res => {
          if (res.code === 10000) {
            document.querySelector('#desc-2')!.innerHTML = template('desc-tpl2', res.data);
          }
        });
        this._httpInstance.getInNum(userInfo.user_id).then(res => {
          if (res.code === 10000) {
            recData.inviteNum = res.data.invite_num;
            this._httpInstance.isReceive({
              appId: '?',
              userId: userInfo.user_id
            }).then(r => {
            });
            document.querySelector('#desc-1')!.innerHTML = template('desc-tpl1', {invite_num: res.data.invite_num});
            document.querySelector('#pos-tlp4')!.innerHTML = template('tlp4', recData);
          }
        });
      } else {
        this.userInfoRender();
      }
      done();
    });
    this._httpInstance.getPrizeList();
  }

  getNum() {
    this._httpInstance.getReserveNum().then(res => {
      if (10000 === res.code) {
        $('.num').text(res.data);
        this.showProgress(res.data);
      }
    });
  }

  showProgress(num: string) {
    const floor2 = $('#pos-tpl2');
    const boxes = floor2.find('.list-num').children();
    const minNum = parseInt(boxes.eq(0).data('num'));
    if (minNum > parseInt(num, 10)) return;
    boxes.each(function () {
      const getNum = $(this).data('num');
      if (getNum < parseInt(num, 10)) {
        $(this).addClass('open');
      }
    });
  }

  scrollPage() {
    // 悬浮相关功能;
    const offsets = [
              $('#floor1').offset()!.top - 300, $('#floor2').offset()!.top - 300, $('#floor2-1').offset()!.top - 300,
              $('#floor3').offset()!.top - 300, $('#floor4').offset()!.top - 300
            ],
            len = offsets.length;
    $(window).on('load scroll', function () {
      const t = $(window).scrollTop();
      navsett(t);
    });

    function navsett(t: number | undefined) {
      if (!!t) {
        const fnav = $('.f-a-con a.btn');
        fnav.removeClass('on');
        if (t >= offsets[len - 1]) {
          fnav.eq(len - 1).addClass('on');
        } else {
          for (let i = 0; i < len; i++) {
            if (t >= offsets[i] && t < offsets[i + 1]) {
              fnav.eq(i).addClass('on');
            }
          }
        }
      }
    }

    $('a[href*="#"],area[href*="#"]').on('click', function () {
      if (location.pathname.replace(/^\//, '') ==
              (this as HTMLAnchorElement).pathname.replace(/^\//, '')
              && location.hostname == (this as HTMLAnchorElement).hostname) {
        let $target = $((this as HTMLAnchorElement).hash);
        $target = $target.length && $target || $('[name=' + (this as HTMLAnchorElement).hash.slice(1) + ']');
        if ($target.length) {
          const targetOffset = $target.offset()!.top;
          $('html,body').animate({
            scrollTop: targetOffset
          }, 500);
          return false;
        }
      }
    });
  }

  swiperInit() {
    this._httpInstance.getSwiperImg().then((res: ResponseBody) => {
      if (res.code === 10000) {
        let htmlTmp = '';
        (res.data as Array<any>).forEach(item => {
                  htmlTmp += `
                    <div class="swiper-slide">
                        <img src="${item.img_url}" alt="" width="840" height="504"/>
                    </div>
                    `;
                }
        );
        $('.yxts-content').children('.swiper-wrapper').html(htmlTmp);
        return;
      }
    }).then(() => {
      this.swiper = new Swiper('.yxts-content', {
        loop: true,
        slidesPerView: 'auto',
        pagination: {
          el: '.yxts-pagination',
          type: 'bullets',
          clickable: true,
          bulletClass: 'swp-btn',
          bulletActiveClass: 'swp-btn-active'
        },
        navigation: {
          nextEl: '.next',
          prevEl: '.prev',
        },
      });
    });
  }

  bindEvent() {
    const _this = this;
    _this._httpInstance.getDownloadInfo().then(function (res) {
      if (res.data && res.data.android_download_url) {
        $('#download>.az').attr('href', res.data.android_download_url);
      }
      if (res.data && res.data.ios_download_url) {
        $('#download>.ios').attr({
          'href': res.data.ios_download_url,
          'target': '_blank'
        });
      }
    });
    // 公众号二维码
    $('.gzh-link').hover(() => {
      $('.qr-hover').toggleClass('hide');
    });
    // 回到顶部按钮
    $('.icon-top').on('click', () => {
      $('body,html').animate({scrollTop: 0}, 1000);
    });
    /* $('#pos-tpl2').on({
       click: function () {
         _this._httpInstance.getDownload();
       }
     }, '.ios,.az,.icon-pc-download');*/
    // 预约礼包
    $('#pos-tpl2').on('click', '.item-img', (e) => {
      const state = $(e.currentTarget).data('gnum') as string;
      this._show.dialog4(1, state);
    });
    // 十大福利
    $('#pos-tlp3').on('click', '.item .bag', (e) => {
      const index = $(e.currentTarget).parent('div').data('num');
      this._show.dialog5(1, {
        store: this.defaultData,
        index: index
      });
    });
    // 邀请好友
    $('#sendInvitation').on('click', () => {
      const userInfo = getStorage('userInfo');
      if (userInfo) {
        this._httpInstance.getQr(userInfo.user_id).then(res => {
          if (10000 === res.code) {
            this._show.dialog1(1, res.data);
          }
        });
      } else {
        _this._loginInstance.login();
      }
    });
    // 邀请好友数 解锁礼包
    $('#pos-tlp4').on('click', '.icon-unlock', () => {
      const userInfo = getStorage('userInfo');
      if (userInfo) {
        _this._show.dialog7(2, userInfo).then(() => {
          $('.k-7-2').on('click', '.dialog-btn', () => {
            if ($('#appId').val() === '') {
              $('.error-msg').html('请选择系统');
              return;
            }
            if ($('#serverId').val() === '') {
              $('.error-msg').html('请选择区服');
              return;
            }
            if ($('#partName').val() === '') {
              $('.error-msg').html('未查询到角色');
              return;
            }
            _this._httpInstance.InFriP({
              appId: $('#appId').val(),
              userId: userInfo.user_id,
              serverId: $('#serverId').val(),
              roleId: $('#partName').data('roleId')
            }).then(res => {
              if (res.code === 10000) {
                // TODO 奖励兑换成功提示
                _this._show.dialog6(3, '奖励兑换成功，请注意查收邮件！');
              }
              else {
                // TODO 奖励兑换失败提示
                _this._show.dialog6(3, res.msg);
              }
            });
          });
        });
      } else {
        _this._loginInstance.login();
      }
    });
    // 立即领取
    $('#getPri').on('click', () => {
      const userInfo = getStorage('userInfo');
      if (userInfo) {
        _this._show.dialog7(2, userInfo).then(() => {
          $('.k-7-2').on('click', '.dialog-btn', () => {
            if ($('#appId').val() === '') {
              $('.error-msg').html('请选择系统');
              return;
            }
            if ($('#serverId').val() === '') {
              $('.error-msg').html('请选择区服');
              return;
            }
            if ($('#partName').val() === '') {
              $('.error-msg').html('未查询到角色');
              return;
            }
            _this._httpInstance.getPr({
              appId: $('#appId').val(),
              userId: userInfo.user_id,
              serverId: $('#serverId').val(),
              roleId: $('#partName').data('roleId')
            }).then(res => {
              if (res.code === 10000) {
                // TODO 奖励兑换成功提示
                _this._show.dialog6(3, '奖励兑换成功，请注意查收邮件！');
              }
              else {
                // TODO 奖励兑换失败提示
                _this._show.dialog6(3, res.msg);
              }
            });
          });
        });
      } else {
        _this._loginInstance.login();
      }
    });
    // 抽奖
    $('#floor3').on('click', '.icon-draw-img', () => {
      // TODO 抽奖模块
      const userInfo = getStorage('userInfo');
      if (userInfo) {
        this._httpInstance.getPrizeRe(userInfo.user_id).then(res => {
          if (res.code === 10000) {
            this._show.dialog2(2, res.data).then(() => {
              $('.k-2-2').on('click', '.dialog-btn', () => {
                this._dialogInstance.closeDialog();
              });
            });
          } else if (res.code === 10001) {
            alert(res.msg);
          } else {
            _this._show.dialog2(3, 0).then(() => {
              $('.k-2-3').on('click', '.dialog-btn', () => {
                this._httpInstance.getQr(userInfo.user_id).then(res => {
                  if (10000 === res.code) {
                    this._show.dialog1(1, res.data);
                  }
                });
              });
            });
          }
          this._httpInstance.getPrizeTime(userInfo.user_id).then(res => {
            if (res.code === 10000) {
              document.querySelector('#desc-2')!.innerHTML = template('desc-tpl2', res.data);
            }
          });
        });
      } else {
        this._loginInstance.login();
      }
    });
    // 登陆
    $('.user-info').on('click', '.user-login', () => {
      _this._loginInstance.login();
    });
    // 登出
    $('.user-info').on('click', '.user-logout', () => {
      _this._loginInstance.confirmLogout();
    });
    // 兑换奖品
    $('.rec-btn').on('click', () => {
      const userInfo = getStorage('userInfo');
      if (userInfo) {
        _this._httpInstance.getDrawList(userInfo.user_id).then(res => {
          //p_type 1实物,2虚拟道具
          _this._show.dialog7(1, res.data).then(() => {
            if (res.code === 10000) {
              document.querySelector('.k-7-1 .body')!.innerHTML = template('dg-list-draw', res.data);
            } else if (res.code === 10007) {
              document.querySelector('.k-7-1 .body')!.innerHTML = '暂无中奖记录！';
            } else {
              document.querySelector('.k-7-1 .body')!.innerHTML = res.msg;
            }
            $('.k-7-1').on('click', '.act', function () {
              const pType = $(this).data('type');
              const pId = $(this).data('id');
              if (pType == 2) {
                _this.showExchangeDialog(userInfo, () => {
                  _this._httpInstance.getEx({
                    appId: $('#appId').val(),
                    userId: userInfo.user_id,
                    serverId: $('#serverId').val(),
                    roleId: $('#partName').data('roleId'),
                    type: 2,
                    id: pId,
                    pType: pType
                  }).then(res => {
                    if (res.code === 10000) {
                      // TODO 奖励兑换成功提示
                      _this._show.dialog6(3, '奖励兑换成功，请注意查收邮件！');
                    }
                    else {
                      // TODO 奖励兑换失败提示
                      _this._show.dialog6(3, res.msg);
                    }
                  });
                });
              } else {
                _this._show.dialog7(3).then(() => {
                  $('.k-7-3').on('click', '.dialog-btn', () => {
                    const tel = $.trim($('#exchangePhone').val() as string);
                    const add = $.trim($('#exchangeAddress').val() as string);
                    if (!tel || !add) {
                      _this._show.dialogMsg('手机号码或收件人地址不能为空');
                      return;
                    }
                    if (!/^1\d{10}$/.test(tel)) {
                      _this._show.dialogMsg('手机号码格式不正确');
                      return;
                    }
                    _this._httpInstance.getEx({
                      userId: userInfo.user_id,
                      type: 2,
                      id: pId,
                      exchangeAddress: add,
                      exchangePhone: tel,
                      pType: pType
                    }).then(res => {
                      if (res.code === 10000) {
                        // TODO 实物奖励兑换成功提示
                        _this._show.dialog6(3, '恭喜小主，奖励兑换成功，将在15个工作日内安排发放！');
                      }
                      else {
                        // TODO 奖励兑换失败提示
                        _this._show.dialog6(3, res.msg);
                      }
                    });
                  });
                });
              }
            });
          });
        });
      } else {
        this._loginInstance.login();
      }
    });
  }

  // 预约弹窗
  showAppointment(type = 'az') {
    this._show.dialog3(1, type).then(() => {
      const dbox = $('.k3-body');
      dbox.on('click', '.menu .item', function () {
        $(this)
                .addClass('active')
                .siblings()
                .removeClass('active');
      });
      dbox.on('click', '.get-code', () => {
        const tel = $.trim($('#tel').val() as string);
        if (tel) {
          if (!/^1(3|4|5|6|7|8)\d{9}$/.test(tel)) {
            this._show.dialogMsg('手机号码格式不正确');
            return;
          } else {
            this._show.doCode(tel);
          }
        } else {
          this._show.dialogMsg('手机号码不能为空！');
        }
      });
      $('.k3-footer').on('click', '.appSup', () => {
        const type = dbox
                .find('.menu')
                .find('.active')
                .data('type');
        const tel = $.trim($('#tel').val() as string),
                code = $.trim($('#code').val() as string);
        if (!tel || !code) {
          this._show.dialogMsg('手机号码或验证码不能为空');
          return;
        }
        if (!/^1\d{10}$/.test(tel)) {
          this._show.dialogMsg('手机号码格式不正确');
          return;
        }
        // 预约接口
        this._httpInstance.reserve({
          'mobile': tel,
          'code': code,
          'platform': type,
          'friend_id': '', // 邀请id，接受好友邀请时有值，自己预约为空
          'icon': '',
          'qq': ''
        }).then((res) => {
          if (res.code === 10000) {
            const aptNum = parseInt($('.num').text()) + 1;
            $('.num').html(aptNum + '');
            this._dialogInstance.closeDialog();
            this._show.dialog3(2);
          } else {
            this._show.dialogMsg(res.msg);
          }
        });
      });
    });
  }

  // 兑奖弹窗
  showExchangeDialog(userInfo: any, callback: Function) {
    this._show.dialog7(2, userInfo).then(() => {
      $('.k-7-2').on('click', '.dialog-btn', () => {
        if ($('#appId').val() === '') {
          $('.error-msg').html('请选择系统');
          return;
        }
        if ($('#serverId').val() === '') {
          $('.error-msg').html('请选择区服');
          return;
        }
        if ($('#partName').val() === '') {
          $('.error-msg').html('未查询到角色');
          return;
        }
        callback();
      });
    });
  }

  userInfoRender() {
    document.querySelector('#desc-1')!.innerHTML = template('desc-tpl1', {invite_num: 0});
    document.querySelector('#desc-2')!.innerHTML = template('desc-tpl2', {times: 0});
  }
}

export default KaiserGame;
