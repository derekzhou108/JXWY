<template>
<div class="bottomComponent">
      <div class="bottom flex flex-center">
    <div class="u-ml10 u-tc u-ml50">
      <p class="u-fs28">COPYRIGHT ALL RESERVED KAISER (CHINA)</p>
      <p class="u-fs20">HOLDING CO.LTD粤ICP备17047563号-2</p>
    </div>
    <div class="to_top u-ml50">
      <img src="../assets/img/icon_footer.jpg" alt="">
    </div>
  </div>
</div>

</template>

<script>
export default {
    mounted() {

    }
};
</script>

<style lang="less" scoped>
.bottomComponent {
    .bottom {
        border-top: 1px solid #ccc;
        height: 1.9rem;
        width: 100%;
        background-color: #fff;
        color: #7e858b;
        .to_top {
            img {
                width: 1rem;
                height: 1rem;
            }
        }
    }
}
</style>
