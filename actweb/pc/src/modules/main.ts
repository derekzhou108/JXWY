import KaiserGame from './kaiser-game';

const ksGame = KaiserGame.Instance;
const dom = window.document,
        domEle = dom.documentElement;

function resize() {
  const domWidth = domEle.getBoundingClientRect().width,
          uas = window.navigator.userAgent.toLowerCase();
  if (~uas.indexOf('micromessenger')) {
    ksGame.isWx = true;
    $('.share').hide();
  } else {
    ksGame.isWx = false;
  }
  if (domWidth >= 1025) {
    ksGame.isWap = false;
    domEle.style.fontSize = '20px';
  }
}

// 右侧导航
function flexNavResize() {
  const scrollTop = document.body.scrollTop || document.documentElement.scrollTop,
          fixedNav = $('.float');
  if (scrollTop > 500 && !!$(window).width() && $(window).width() as number >= 1300) {
    fixedNav.fadeIn();
  } else {
    fixedNav.fadeOut();
  }
}

window.addEventListener(
        'resize',
        () => {
          // ksGame.swiper.onResize();
          resize();
          flexNavResize();
        },
        false,
);
$(window).on('scroll', function () {
  flexNavResize();
});
$(function () {
  ksGame.init();
  resize();
  flexNavResize();
});
