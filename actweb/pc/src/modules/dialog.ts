interface DialogOpts {
  backdropClass?: string;
  width?: string,
  height?: string;
}

class Dialog {
  private static _instance: Dialog;
  public root: JQuery<HTMLElement>;
  public count = 0;
  public defaults = {
    backdropClass: '',
    width: 'auto',
    height: 'auto'
  };

  private constructor() {
    const dom = document.querySelector('.overlay-container');
    if (!dom) {
      $('body').append(`<div class="overlay-container"></div>`);
    }
    this.root = $('.overlay-container');
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  open(html: any, options?: DialogOpts): Promise<any> {
    return new Promise((resolve) => {
      const settings = $.extend({}, this.defaults, options);
      this.createTemp(html, settings);
      resolve();
    });
  }

  createTemp(html: object | string, opts: DialogOpts | undefined) {
    const temp = `<div class="overlay-backdrop overlay-dark-backdrop overlay-backdrop-showing"></div>
 <div class="global-overlay-wrapper">
 <div id="overlay-${this.count += 1}" class="overlay-pane ${opts!.backdropClass}"
 style="${this.createStyle(opts)}">
 <div tabindex="0" class="visually-hidden focus-trap-anchor"></div>
 <div class="dialog-container">
  <div class="dialog-close"></div>
  <div class="dialog-body">
   ${html}
</div>

</div>
 <div tabindex="0" class="visually-hidden focus-trap-anchor"></div>
</div>
</div>
`;
    this.root.html(temp);
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
      $('.overlay-container').height();  // 由于overlay-container:empty在ie11下插入dom无法重绘，手动触发一下浏览器重绘;
    }
    $('.overlay-pane').animate({opacity: '1'}, 300);
    this.bindEvent();
  }

  createStyle({width, height}: any) {
    const style: any = {};
    style.width = width;
    style.height = height;
    style.position = 'static';
    let styleString = '';
    Object.keys(style).forEach(value => {
      styleString += `${value}:${style[value]};`;
    });
    return styleString;
  }

  bindEvent() {
    this.root.on('click', '.overlay-backdrop,.dialog-close', () => {
      this.closeDialog();
    });
  }

  closeDialog() {
    this.root.off('click', '.overlay-backdrop');
    this.root.empty();
  }
}

export default Dialog;
