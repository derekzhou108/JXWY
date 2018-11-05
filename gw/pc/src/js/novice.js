(function (window, $) {
    var novice = {
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
            var ios = $(".download-iOS"),
                android = $(".download-Android");
            api.getDownloadInfo().then(function (res) {
                
                if (res.data && res.data.android_download_url) {
                    android.attr('href', res.data.android_download_url)
                } else {
                    android.on('click', function (e) {
                        alert('敬请期待！')
                        if (e && e.preventDefault) {
                            e.preventDefault();
                        }
                        else {
                            window.event.returnValue = false;
                            return false;
                        } 
                    })
                }

                if (res.data && res.data.ios_download_url) {
                    ios.attr('href', res.data.ios_download_url)
                } else {
                    ios.on('click', function (e) {
                        alert('敬请期待！')
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
        },
        fold: function () {
            $('.bindFold .list-item').on('click', function () {
                $(this).siblings().stop().animate({ width: "120px" }, 700);
                $(this).stop().animate({ width: "990px" }, 700);
            })
        },
        init: function () {
            $(".nav-tabs").find(".tab").eq(4).addClass("active");
            this.bindEvent();
            this.fold()
        }
    }
    novice.init();
})(window, $);