<template>
  <div class="chapter-msg">
    <!--右面的章节-->
    <div class="chapter-top">
      <!--<p class="chapter-sort">
        <span v-for="text in chapterSort">{{text}}</span>
      </p>
      <div class="chapter-line">
        <i class="el-icon-caret-top"></i>
      </div>-->
      <p class="chapter-title">
        <span v-for="text in chapterTitle">{{text}}</span>
      </p>
    </div>
    <!--左面的章节-->
    <div class="chapter-top-even">
      <!--<p class="chapter-sort">
        <span v-for="text in chapterSort">{{text}}</span>
      </p>
      <div class="chapter-line">
        <i class="el-icon-caret-top"></i>
      </div>-->
      <p class="chapter-title">
        <span v-for="text in chapterTitle">{{text}}</span>
      </p>
    </div>
    <div class="chapter-introduce">
      <slot>{{chapterIntroduce}}</slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "chapter-msg",
    props: {
      chapterTitle: String,
      chapterSort: String,
      chapterIntroduce: String,
      float: {
        type: String,
        default: 'right'
      }
    }
  }
</script>

<style scoped>
  .chapter-msg {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 20px 10px;
  }

  .chapter-top, .chapter-top-even {
    /*height: 150px;*/
    height: 50%;
    display: inline-flex;
    justify-content: center;
    flex-direction: column;
    text-align: right;
    align-items: center;
  }

  .chapter-title {
    font-family: 思源宋体;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  }

  .chapter-title, .chapter-sort {
    /*width: 20px;*/
    line-height: 22px;
    word-break: break-all;
  }

  .chapter-sort {
    /*width: 20px;*/
    /*display: inline-flex;*/
    /*flex-direction: column;*/
    /*align-items: center;*/
  }

  .chapter-line {
    position: relative;
    margin: 15px 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid;
  }

  .chapter-line i {
    position: absolute;
    right: 13px;
    top: -15px;
    font-size: 20px;
    color: black;
  }

  .chapter-introduce {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    text-indent: 2em;
    width: 100%;
    height: 50%;
    font-size: 13px;
    color: #4a4a4a;
    line-height: 30px;
    word-break: break-all;
    /*margin-top: 20px;*/
  }

  .chapter-top-even {
    text-align: left;
  }

  .chapter-top-even .chapter-line i {
    left: 15px;
    right: auto;
  }

  /*标题放左面 通过css 翻转位置*//*chapter-top-even*/
  .pages.even .chapter-top {
    display: none;
  }

  .pages.odd .chapter-top-even {
    display: none;
  }

  /*.pages.even .chapter-top .chapter-title, .pages.even .chapter-top .chapter-sort {
    transform: rotateY(180deg);
  }

  .pages.even .chapter-top .chapter-line {
    margin-right: 25px;
  }*/
</style>
