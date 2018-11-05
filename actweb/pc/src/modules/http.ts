const baseUrl = 'http://kssdk.ksgame.com';
// var baseUrl = 'http://10.10.40.33:8428';
// const baseUrl = 'http://115.159.189.146:8026';
declare const layer: any;

class Http {
  private static _instance: Http;

  private constructor() {
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  post(url: any, data?: any) {
    const def = $.Deferred();
    $.post(url, data).then(function (data) {
      if (typeof data === 'string') {
        def.resolve(JSON.parse(data));
      } else {
        def.resolve(data);
      }
    });
    return def;
  }

  get(url: any, data?: any) {
    const def = $.Deferred();
    $.get(url, data).then(function (data) {
      if (typeof data === 'string') {
        def.resolve(JSON.parse(data));
      } else {
        def.resolve(data);
      }
    });
    return def;
  }

  jsonp(url: any, data?: any) {
    const def = $.Deferred();
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
        layer.alert(res.msg);
        def.reject(res);
      }
    });
    return def;
  }

  // 预约接口
  apt(data: any) {
    return this.post('/appointment/create', data);
  }

  getSmsCode(data: any) {
    return this.post('/reserve/send-sms-code', data);
  }

  reserve(data: any) {
    return this.post('/reserve/reserve', data);
  }

  getReserveNum() {
    return this.get('/reserve/get-num');
  }

  vote(data: any) {
    return this.post('/reserve/vote', data);
  }

  getInviteList(data: any) {
    return this.post('/reserve/get-invite-icon', data);
  }

  // 获取邀请二维码
  /* getInviteCode(data: any) {
     return this.post('/reserve/qrcode', data);
   }*/
  getSwiperImg() {
    return this.get('/game-features/index');
  }

  // 获取奖品列表
  getPrizeList() {
    return this.post('/prize/get-prize-list', {
      type: 2
    });
  }

  // 获取帐号区服
  getAccountInfo() {
    return this.post('/download/app-list');
  }

  // 抽奖
  getPrizeRe(data: any) {
    return this.post('/download/get-prize-download', {
      userId: data
    });
  }

  // 下载邀请好友集结奖励
  InFriP(data: any) {
    return this.post('/download/get-invite-friend-prize', data);
  }

  // 注册下载用户
  RegDownload(data: any) {
    return this.post('/download/reg-download-user', {
      userId: data
    });
  }

  // 抽奖次数
  getPrizeTime(data: any) {
    return this.post('/prize/get-times', {
      userId: data,
      type: 2
    });
  }

  // 下载
  getDownload() {
    return this.post('/download/download ');
  }

  // 奖品列表
  getDrawList(data: any) {
    return this.post('/prize/get-log', {
      userId: data,
      type: 2
    });
  }

  // 查询游戏角色
  getUserInfo(data: any) {
    return this.post('/download/get-role', data);
  }

  //下载 专属奖励
  getPr(data: any) {
    return this.post('/download/get-download-prize', data);
  }

  // 获取邀请人数
  getInNum(data: any) {
    return this.post('/download/invite-num', {
      userId: data
    });
  }

  getDownloadInfo() {
    return this.post('/download/info');
  }

  // 邀请好友二维码
  getQr(data: any) {
    return this.post('/download/qrcode', {
      userId: data
    });
  }

  // 抽奖兑奖
  /**
   * 参数 appId  userId  serverId   roleId  type(1预约抽奖,2下载抽奖)
   id(兑奖记录中的记录id)    exchangePhone(兑奖手机号)  exchangeAddress(兑奖地址)
   */
  getEx(data: any) {
    return this.post('/prize-center/prize-exchange', data);
  }

  login(data: any) {
    return this.jsonp('/sdk-user/login', data);
  }

  sendCode(data: any) {
    return this.jsonp('/sdk-user/send-sms-code', data);
  }

  reg(e: any) {
    return this.jsonp('/sdk-user/reg', e);
  }

  findPwd(e: any) {
    return this.jsonp('/sdk-user/find-pwd', e);
  }

  changePwd(e: any) {
    return this.jsonp('/sdk-user/change-pwd', e);
  }

  isLogin(e: any) {
    return this.jsonp('/sdk-user/is-login', e);
  }

  logout() {
    return this.jsonp('/sdk-user/logout');
  }

  isReceive(data: any) {
    return this.post('/download/invite-friend-prize-log', data);
  }
}

export default Http;

