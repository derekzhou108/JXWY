<template>
    <div class="topNavComponent ">
        <div class="top-nav-warp">
            <div class="navs flex">
                <!--<router-link class="nav-tab u-fs20" tag="span" @click="jump(0)"><i class="icon-nav"></i>游戏资讯</router-link>-->
                <!--<router-link class="nav-tab u-fs20" tag="span" @click="jump(1)"><i class="icon-nav"></i>游戏特色</router-link>-->
                <span class="flex-item nav-tab u-fs20" @click="changeIndexTop('xwzx')">新闻资讯</span>
                <span class="flex-item  nav-tab u-fs20" @click="changeIndexTop('yxts')">游戏特色</span>
                <router-link to="/jxwy/gameData" tag="span" class="flex-item nav-tab u-fs20 ">游戏资料</router-link>
                <router-link to="/jxwy/novice" tag="span" class="flex-item nav-tab u-fs20 last">新手专区</router-link>
                <div class="btn-menu" @click.stop="showMenu =!showMenu"></div>
            </div>
            <div class="sub-nav-warp" v-if="showMenu" v-clickoutside="handleClose">
                <ul class="sub-nav">
                    <li class="u-tc nav" @click="changeIndexTop('top')">官网首页</li>
                    <li class="u-tc nav" @click="changeIndexTop('xwzx')">新闻资讯</li>
                    <li class="u-tc nav" @click="changeIndexTop('yxts')">游戏特色</li>
                    <router-link to="/jxwy/gameData" tag="li" class="u-tc nav">游戏资料</router-link>
                    <router-link to="/jxwy/novice" tag="li" class="u-tc nav">新手专区</router-link>
                </ul>
            </div>
        </div>
    </div>

</template>
<script>
import { mapState } from "vuex";
import clickoutside from "../directives/clickoutside.js";

export default {
    directives: {
        clickoutside
    },
    data() {
        return {
            showMenu: false
        };
    },
    computed: {
        ...mapState(["isIndex", "indexTop"])
    },
    mounted() {
        this.handleScroll();
    },
    methods: {
        handleClose(e) {
            this.showMenu = false;
        },
        changeIndexTop(name) {
            this.$store.commit("updateIndexTop", name);
            if (this.isIndex) {
                this.jump(name);
            } else {
                this.$router.push({ name: "Index" });
            }
        },
        jump(name) {
            if (name === "top") {
                window.scrollTo(0, 0);
                return;
            }
            // let jump = document.getElementById(name),
            //     distance = jump.offsetTop;
            //     window.scrollTo(0,distance);
            // 用 class="d_jump" 添加锚点
            let jump = document.getElementById(name);
            let total = jump.offsetTop;
            let distance =
                document.documentElement.scrollTop || document.body.scrollTop;
            // 平滑滚动，时长500ms，每10ms一跳，共50跳
            let step = total / 40;
            if (total > distance) {
                total = total - 10;
                smoothDown();
            } else {
                let newTotal = distance - total;
                step = newTotal / 50;
                smoothUp();
            }
            function smoothDown() {
                if (distance < total) {
                    distance += step;
                    //                        document.body.scrollTop = distance
                    window.scrollTo(0, distance);
                    setTimeout(smoothDown, 10);
                } else {
                    //                        document.body.scrollTop = total
                    window.scrollTo(0, total);
                }
            }
            function smoothUp() {
                if (distance > total) {
                    distance -= step;
                      window.scrollTo(0, distance);
                    setTimeout(smoothUp, 10);
                } else {
                      window.scrollTo(0, distance);
                }
            }
        },
        showMsg() {
            alert("敬请期待！");
        },
        handleScroll() {
            var p = 0,
                t = 0;
            var self = this;

            document
                .querySelector("#vux_view_box_body")
                .addEventListener("scroll", function() {
                    p = document.querySelector("#vux_view_box_body").scrollTop;
                    if (t <= p) {
                        //向下
                        self.showMenu = false;
                    } else {
                        //向上
                    }
                    setTimeout(function() {
                        t = p;
                    }, 0);
                });
        }
    }
};
</script>
<style lang="less" scoped>
.topNavComponent {
    .top-nav-warp {
        background: rgba(164, 141, 102, 0.8);
        width: 100%;
        height: 0.6rem;
        position: relative;
        z-index: 999;
        .navs {
            height: 0.6rem;
            line-height: 0.6rem;
            color: #fffbf3;
            font-size: 0.23rem;
            width: 100%;
            .nav-tab {
                display: inline-block;
                text-align: center;

                position: relative;
                &:after {
                    content: "";
                    display: inline-block;
                    position: absolute;
                    right: 0;
                    height: 60%;
                    width: 1px;
                    background: url("../assets/img/top-split.png") no-repeat
                        left top;
                    background-size: 100% 100%;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                }
                &.last:after {
                    display: none;
                }
            }
        }
        .btn-menu {
            background: #cab89a url("../assets/img/btn-meau.png") no-repeat
                center;
            width: 0.72rem;
            height: 0.6rem;
            background-size: contain;
        }
        .icon-nav {
            background: url("../assets/img/nav-tab.png") no-repeat;
            width: 0.72rem;
            height: 0.66rem;
            display: inline-block;
            background-size: 100% 100%;
            margin-right: 0.09rem;
        }
        .sub-nav-warp {
            position: absolute;
            right: 0;
            top: 100%;
            .nav {
                background: #cab89a;
                // opacity: 0.8;
                width: 2.33rem;
                height: 0.67rem;
                line-height: 0.67rem;
                color: #ffffff;
                font-size: 0.2rem;
            }
        }
    }
}
</style>
