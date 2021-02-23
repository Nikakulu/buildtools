<template>
  <div class="book-page pages">
    <div class="depth"></div>
    <div class="page-box">
      <div class="page-top-msg" :class="topClass">
        <!--顶部 小标题-->
        <span class="top-bottom-zoom">
          <slot name="top">
            <!--<template v-if="topCatalogText != ''">
              <span class="top-catalog-line" style="border-right: 1px solid"></span>
                {{topCatalogText}}
              <span class="top-catalog-line" style="border-right: 2px solid"></span>
            </template>-->
              {{topText}}
          </slot>
        </span>
      </div>
      <div class="page-main-msg">
        <!--主要内容-->
        <slot></slot>
      </div>
      <div class="page-bottom-msg" :class="bottomClass">
        <!--底部页码-->
        <span class="top-bottom-zoom">
          <slot name="bottom">
          {{bottomText}}
          </slot>
        </span>
      </div>
    </div>
    <!--<img class="pages-img" src="~/assets/images/client/img-delegate-duties-4.png"/>-->
  </div>
</template>

<script>
  export default {
    name: "book-page",
    props: {
      topText: String,
      topCatalogText: {
        type: String,
        default: ""
      },
      topClass: Array,
      bottomText: Number,
      bottomClass: Array
    }
  }
</script>

<style scoped>
  .book-page {

  }

  /*左右上下文字位置样式不一样*/
  .pages.odd .page-top-msg {
    text-align: right;
  }

  .pages.even .page-top-msg {
    text-align: left;
  }

  .pages.odd .page-bottom-msg {
    text-align: right;
  }

  .pages.even .page-bottom-msg {
    text-align: left;
  }

  /*履职档案 每个界面结构*/
  .page-box {
    width: 100%;
    height: 100%;
  }

  .page-box .page-top-msg, .page-box .page-bottom-msg {
    position: relative;
    margin: 0 auto;
    width: calc(100% - 40px);
    height: 40px;
    font-size: 12px;
    line-height: 40px;
  }

  .top-catalog-text {
    padding: 0 5px;
    margin-right: 5px;
    /*border-left: 1px solid;*/
    /*border-right: 2px solid;*/
    /*box-shadow: 0 0 1px gray;*/
  }

  .top-catalog-line {
    height: 10px;
    margin: 0 5px;
    display: inline-block
  }

  .top-bottom-zoom {
    zoom: 0.85;
  }

  .page-top-msg .top-bottom-zoom {
    zoom: 1;
  }


  .page-box .page-top-msg {
    /*line-height: 35px;*/
    border-bottom: 1px solid lightgray;
  }

  .page-box .page-main-msg {
    position: relative;
    margin: 0 auto;
    width: calc(100% - 80px);
    height: calc(100% - 80px);
    /*background: rgba(0, 0, 0, 0.05);*/
    overflow: hidden;
  }


  .page-box .page-bottom-msg {
  }
</style>
