<template>
    <div class="partnerListComponent">

        <!-- 顶部下载 -->
        <publicTop></publicTop>

        <!-- 导航栏 -->
        <topNav></topNav>

        <div class="search-warp">
            <div class="input">
                <input type="text" placeholder="搜索" v-model="search">
            </div>
        </div>
        <div class="main-content">
            <div class="nav-list flex u-tc">
                <div class="flex-item" v-for="item in navList" :key="item.id">
                    <div class="txt" @click="updateIndex(item.id)" :class="{'active':curtype == item.id}">
                        {{item.val}}
                    </div>

                </div>
            </div>
            <div class="partner-warp flex flex-wrap u-tc">

                <router-link tag="div" :to="{ name:'partnerDetail',params:{id:item.id}}" class="partner-item flex-col-25" v-for="(item,index) in partnerData" :key="index" v-if="curtype == 0 ? true : item.color == curtype">
                    <dl>
                        <dt><img :src="require(`../assets/img/huoban/people-s/${item.id}.png`)" :alt="item.name"></dt>
                        <dd>{{item.name}}</dd>
                    </dl>

                </router-link>

            </div>
        </div>

        <!-- 底部版权区 -->
        <publicFooter></publicFooter>
    </div>
</template>
<script>
import { partnerData } from "../assets/js/partner-list.js";
import publicTop from "../components/publicTop.vue";
import publicFooter from "../components/footer.vue";
import topNav from "../components/topNav.vue";
var _ = require("lodash");

export default {
    components: {
        publicTop,
        publicFooter,
        topNav
    },
    data() {
        return {
            navList: [
                { id: 0, val: "全部" },
                { id: 1, val: "橙色" },
                { id: 3, val: "紫色" },
                { id: 2, val: "蓝色" }
            ],
            partnerData: _.cloneDeep(partnerData.data),
            curtype: 0,
            search: ""
        };
    },

    methods: {
        updateIndex: function(type) {
            this.curtype = type;
        }
    },

    watch: {
        search: _.debounce(function(newV, oldV) {
            this.partnerData = partnerData.data.filter(item => {
                return _.includes(item.name, newV);
            });
        }, 500)
    }
};
</script>
<style lang="less" scoped>
.partnerListComponent {
    background: #f5f0ec url(../assets/img/public-titile-bg.png) no-repeat center
        1rem;
    // 搜索
    .search-warp {
        padding: 0 0.1rem;
        margin: 0.36rem 0 0.3rem;
        text-align: right;
        .input {
            position: relative;
            display: inline-block;
            overflow: hidden;
            &:after {
                content: "";
                position: absolute;
                display: inline-block;
                right: 0;
                top: 0;
                width: 0.63rem;
                height: 0.53rem;
                background: #a48d66
                    url("../assets/img/partnerList/icon-search.png") no-repeat
                    center;
                background-size: auto 100%;
                border-top-right-radius: 0.1rem;
                border-bottom-right-radius: 0.1rem;
            }
            input {
                display: inline-block;
                width: 3.46rem;
                height: 0.53rem;
                padding: 0.16rem 0.7rem 0.16rem 0.18rem;
                border: solid 1px #a38d66;
                border-radius: 0.1rem;
                color: #746449;
            }
        }
    }
    // 伙伴列表
    .main-content {
        padding-bottom: 0.67rem;
        .nav-list {
            margin-bottom: 0.2rem;
            .flex-item {
                height: 0.46rem;
                line-height: 0.46rem;
                position: relative;
                padding: 0 0.2rem;
                &:after {
                    content: "";
                    background: url("../assets/img/partnerList/split.png")
                        no-repeat left top;
                    background-size: 100% 100%;
                    width: 0.26rem;
                    height: 0.06rem;
                    position: absolute;
                    right: -0.1rem;
                    display: inline-block;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                }
                &:last-child:after {
                    display: none;
                }
                .txt {
                    background: url("../assets/img/partnerList/nav-bg.png")
                        no-repeat left top;
                    background-size: 100% 100%;
                    color: #a48d66;
                    font-size: 0.24rem;
                    &.active {
                        background: url("../assets/img/partnerList/nav-bg-active.png")
                            no-repeat left top;
                        background-size: 100% 100%;
                        color: #fff;
                    }
                }
            }
        }

        .partner-warp {
            margin: 0 0.1rem;
            border: 0.1rem solid transparent;
            border-image: url("../assets/img/partnerDetail/introduce-bg.png") 10
                10 round;
            -webkit-border-image: url("../assets/img/partnerDetail/introduce-bg.png")
                10 10 round;
            -o-border-image: url("../assets/img/partnerDetail/introduce-bg.png")
                10 10 round;
            background-color: #fffaeb;
            img {
                width: 1.5rem;
                height: 1.5rem;
                background: #535353;
            }
            .partner-item {
                padding: 0.1rem;
            }
            dl {
                color: #a48d66;
                dt {
                    padding: 0.05rem;
                    border: solid 1px #a48d66;
                    margin-bottom: 0.05rem;
                }

                //    background-color: #fffaeb;
            }
        }
    }
}
</style>

