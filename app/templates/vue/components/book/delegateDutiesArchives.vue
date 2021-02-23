<template>
  <div class="delegate-duties-archives-show" v-show="true"><!--delegateDutiesArchivesShow-->
    <!--<div class="my-archives-box"-->
    <!--element-loading-text="数据准备中..."-->
    <!--element-loading-spinner="el-icon-loading"-->
    <!--element-loading-background="rgba(0, 0, 0, 0)" v-loading="pageLoading"></div>-->
    <div :style="{zoom:pageZoom}" class="my-archives-box" v-show="loadDataOver">
      <!--返回按钮-->
      <img src="@/assets/images/book/archives-back-icon.png" class="back" @click="closeArchives()">
      <!--相关工具按钮-->
      <div class="book-tools">
        <!--回首页 展开目录-->
        <div class="tools-group">
          <img class="tools-item tool-home"
               @click="bookTarget.turn('page',1)"
               src="@/assets/images/book/icon-delegate-duties-home.png"/>
          <img class="tools-item tool-catalog"
               @click="showOrHideCatalog()"
               src="@/assets/images/book/icon-delegate-duties-catalog.png"/>
        </div>
        <!--上一页，下一页-->
        <div class="tools-group">
          <!--<div ignore="1" class="next-button tools-item" @click="goNext()"></div>
          <div ignore="1" class="previous-button tools-item" @click="goPrevious()"></div>-->
          <img class="tools-item" @click="goPrevious()" src="@/assets/images/book/icon-delegate-duties-left.png"/>
          <img class="tools-item" @click="goNext()" src="@/assets/images/book/icon-delegate-duties-right.png"/>
        </div>
        <!--适配界面大小 放大 缩小-->
        <div class="tools-group">
          <img class="tools-item tool-resize" @click="() => {pageZoom = 1}"
               src="@/assets/images/book/icon-delegate-duties-resize.png"/>
          <img class="tools-item tool-add" @click="()=>{pageZoom += 0.1}"
               src="@/assets/images/book/icon-delegate-duties-add.png"/>
          <img class="tools-item tool-reduce" @click="()=>{pageZoom -= 0.1}"
               src="@/assets/images/book/icon-delegate-duties-reduce.png"/>
        </div>
      </div>
      <!--履职档案 书-->
      <div class="myArchives sj-book" id="myArchives">

        <!--封面-->
        <div class="pages first-page">
          <div class="depth"></div>
          <div class="badge">
            <img src="@/assets/images/book/badge_icon.png">
          </div>
          <div class="slogan">
            河北省第十三届人民代表大会
          </div>
          <div class="key">
            代表履职档案
          </div>
          <div class="timeSlot">
            2018-2023
          </div>
        </div>
        <!--代表信息-->
        <div depth="1" class="pages">
          <div class="depth"></div>
          <div class="head">
            <img src="@/assets/images/book/avatar.png">
          </div>
          <div class="username" v-text="userMsg.realName">
            曹宗华
          </div>
          <template v-if="userMsg.npcDelegateInfo"
                    v-for="item in userMsg.npcDelegateInfo.presentOccupation.split(/[,|、|，]/)">
            <p class="introduce" v-text="item">
              承德护理职业学院教师、承德音乐协会副主席
            </p>
          </template>
          <!--          <div class="timeSlot">-->
          <!--            2018-2023-->
          <!--          </div>-->
        </div>

        <!--目录-->
        <template v-for="(catalog,index) in bookPage.catalog">
          <book-page :top-class="['visible-hide']" :botom-class="['visible-hide']">
            <div class="catalog">
              <template v-for="(item,cIndex) in catalog">
                <template v-if="cIndex===0 && index===0">
                  <div class="catalog-title">目&nbsp;录</div>
                  <img style="width: 100%" src="@/assets/images/book/icon-catalog-line.png"/>
                </template>
                <template v-if="item.isBigChapter">
                  <ul class="catalog-ul">
                    <li class="catalog-ul-li">
                      <span class="catalog-ul-li-title">{{item.indexName}}</span>
                    </li>
                  </ul>
                </template>
                <template v-else-if="item.isChapter">
                  <li class="catalog-ul-li">
                    <div class="catalog-ul-li-small-title" @click="turnPage(item.indexNum+bookPage.catalog.length+2,item.indexName)">
                      {{item.indexName}}
                    </div>
                  </li>
                </template>
                <template v-else>
                  <template v-if="cIndex===0">
                    <li @click="turnPage(item.indexNum+bookPage.catalog.length+2,item.indexName)" class="catalog-ul-li"
                        style="margin-top: 12px">
                      <div class="catalog-li-text" style="display: flex;">
                        <span>{{item.itemNum}}.</span>
                        <div class="catalog-li-text-title">
                          <span style="background-color: white">{{item.indexName}}</span>
                          <div class="list-line"></div>
                        </div>
                        &nbsp;&nbsp;
                      </div>
                      <div class="list-num">&nbsp;&nbsp;{{item.indexNum}}
                      </div>
                    </li>
                  </template>
                  <template v-else>
                    <li @click="turnPage(item.indexNum+bookPage.catalog.length+2,item.indexName)" class="catalog-ul-li">
                      <div class="catalog-li-text" style="display: flex;">
                        <span>{{item.itemNum}}.</span>
                        <div class="catalog-li-text-title">
                          <span style="background-color: white">{{item.indexName}}</span>
                          <div class="list-line"></div>
                        </div>
                        &nbsp;&nbsp;
                      </div>
                      <div class="list-num">&nbsp;&nbsp;{{item.indexNum}}
                      </div>
                    </li>
                  </template>
                </template>
              </template>
            </div>
          </book-page>
        </template>


        <template v-for="(page,index) in bookPage.bookPages">
          <template v-if="page.isChapter">
            <book-page :top-class="['visible-hide']">
              <div style="width: 100%;height: 100%" v-html="page.content"></div>
            </book-page>
          </template>
          <template v-else>

            <book-page :top-text="getPageHeader(page.pageNum+2+bookPage.catalog.length,page)"
                       :bottom-text="page.pageNum">
              <div class="suggest-msg">
                <!--页内容-->
                <div class="suggest-content margin-top-10">
                  <div class="content-text" v-html="page.content"></div>
                </div>
              </div>
            </book-page>
          </template>
        </template>
        <book-page></book-page>
      </div>

      <!--目录 侧弹窗-->
      <div v-show="catalogShow" id="side-catalog-box"
           class="side-catalog-box animated">
        <div @click="showOrHideCatalog(false)" id="slid-catalog-mask" class="catalog-mask"></div>
        <book-page class="side-catalog-list remove-scroll-bar" :top-class="['visible-hide']">
          <div class="catalog padding-bottom-10" style="font-family: 思源宋体">
            <div class="catalog">
              <template v-for="(catalog,index) in bookPage.catalog">
                <template v-for="(item,cIndex) in catalog">
                  <template v-if="cIndex===0 && index===0">
                    <div class="catalog-title">目&nbsp;录</div>
                    <img style="width: 100%" src="@/assets/images/book/icon-catalog-line.png"/>
                  </template>
                  <template v-if="item.isBigChapter">
                    <ul class="catalog-ul">
                      <li class="catalog-ul-li">
                        <span class="catalog-ul-li-title">{{item.indexName}}</span>
                      </li>
                    </ul>
                  </template>
                  <template v-else-if="item.isChapter">
                    <li class="catalog-ul-li">
                      <div class="catalog-ul-li-small-title" @click="turnPage(item.indexNum+bookPage.catalog.length+2,item.indexName)">
                        {{item.indexName}}
                      </div>
                    </li>
                  </template>
                  <template v-else>
                    <li @click="turnPage(item.indexNum+bookPage.catalog.length+2,item.indexName)" class="catalog-ul-li">
                      <div class="catalog-li-text" style="display: flex;">
                        <span>{{item.itemNum}}.</span>
                        <div class="catalog-li-text-title">
                          <span style="background-color: white">{{item.indexName}}</span>
                          <div class="list-line"></div>
                        </div>
                        &nbsp;&nbsp;
                      </div>
                      <div class="list-num">&nbsp;&nbsp;{{item.indexNum}}
                      </div>
                    </li>
                  </template>
                </template>
              </template>
            </div>
          </div>
        </book-page>
      </div>
    </div>
  </div>
</template>

<script>
  import {getSimpleTimeString, valueIsBlank} from "@/common/js/util";
  import turn from "@/common/js/turnjs4/lib/turn";
  import BookPage from "@/components/book/book-page";
  import ChapterMsg from "@/components/book/chapter-msg";
  import bookinfo from "./bookinfo.json";
  import userinfo from "./userinfo.json";
  export default {
    name: "delegateDutiesArchivesShow",
    components: {ChapterMsg, BookPage,},
    head: {
      title: "代表履职档案"
    },
    filters: {
      fixCatalogNum: function (value) {
        return value < 10 ? "0" + value : value;
      }
    },
    data() {
      return {
        pageZoom: 1,
        pageLoading: true,
        loadDataOver: true,
        catalogData: [
          {
            year: 2020, num: [1, 14, 14, 14, 14],
            titleGoPage: [4, 18, 20, 22, 26],
            contentList: {
              //临时议案建议目录
              suggest: [
                {title: "关于大力推进对日技能劳务工人培训派遣工作解决我省就业压力的建议", num: 2, goPage: 7},
                {title: "关于制定《河北省保护青少年身心健康条例》的议案", num: 7, goPage: 11},
                {title: "关于争取开通北京至吴桥高铁的建议", num: 14},
                {title: "关于开通沧州火车站至黄骅港旅游专线的建议", num: 15},
              ],
              //视察调研临时目录数据
              inspection: [
                {title: "参加深化扶贫脱贫攻坚执法检查", num: 15, goPage: 18},
                {title: "参加衡水湖保护立法调研工作", num: 19},
                {title: "省人大常委会农工委开展陆生野生动物保护立法调研", num: 21},
              ],
              //学习培训目录
              trainLearn: [
                {title: "参加乡村振兴战略专题培训班", num: 22},
                {title: "参加省十三届人大代表履职学习培训班", num: 23, goPage: 22},
              ],
              //参加会议情况
              joinMeet: [
                {title: "出席省十三届人大三次会议", num: 23, goPage: 24},
                {title: "列席省十三届人大常委会第十三次会议", num: 24, goPage: 24},
                {title: "列席省十三届人大常委会第十五次会议", num: 25},
                {title: "列席沧州市第十四届人大五次会议", num: 26},
              ],
              //联系人民群众
              contactPeople: [
                {title: "听取群众关于违法违规圈占土地和占用耕地建房问题的意见", num: 27, goPage: 26},
                {title: "参加南环街道代表之家组织的接待选民活动", num: 29},
                {title: "向群众宣传党的十九大会议精神", num: 31},
              ]
            }
          },
          {
            year: 2019, num: [15, 29, 29, 29, 29],
            contentList: {
              //临时议案建议目录
              suggest: [],
              //视察调研临时目录数据
              inspection: [],
              //学习培训目录
              trainLearn: [],
              //参加会议情况
              joinMeet: [],
              //联系人民群众
              contactPeople: []
            }
          },
          {
            year: 2018, num: [27, 45, 45, 45, 45],
            contentList: {
              //临时议案建议目录
              suggest: [],
              //视察调研临时目录数据
              inspection: [],
              //学习培训目录
              trainLearn: [],
              //参加会议情况
              joinMeet: [],
              //联系人民群众
              contactPeople: []
            }
          }
        ],//目录
        delegateAvatar: "",
        delegateDutiesArchivesShow: false,//是否展示我的履职档案
        yearList: [],//年份列表
        bookIsInit: false,//履职档案是否初始化完毕
        userMsg: userinfo,
        mySuggestionData: [],//履职档案建议列表
        bookTarget: {},//书
        catalogShow: false,//是否显示目录 这个目录是侧边的单独目录
        bookPage: bookinfo,
      }
    },
    watch: {
      delegateDutiesArchivesShow: function (n) {
        //履职档案显示的时候就监听左右事件 隐藏就取消监听
        if (n) {
          this.registerLeftAndRight();
        } else {
          this.removeLeftAndRight();
        }
      }
    },
    methods: {
      goSuggest(pageNum) {
        if (valueIsBlank(pageNum)) {
          pageNum = 5
        }
        this.bookTarget.turn('page', pageNum);
      },
      /**
       *初始化我的履职档案
       */
      initArchives() {
        let _that = this;
        _that.bookTarget.turn({
          gradients: false,//过度期间渐变阴影
          acceleration: true,
          autoCenter: true,//自动居中
          display: 'double',
          duration: 700,
          elevation: 50,
          page: 1,
          when: {
            turning: function (e, page, view) {
              if (_that.catalogShow) {
                _that.showOrHideCatalog(false);
              }
              _that.updateDepth(_that.bookTarget, page);
            },
            turned: function (event, page, view) {
              // that.updateDepth(that.bookTarget, page);
              let query = {..._that.$route.query};
              query.turnPage = page;
            },
            missing: function (e, pages) {
            },
            start: function (e, pageObj) {
              // moveBar(true);
            },
            end: function (e, pageObj) {

              // that.updateDepth(that.bookTarget);
            }
          }
        })
        _that.bookIsInit = true;
      },
      /**
       *打开我的履职档案
       */
      async openArchives() {
        let that = this;
        that.delegateDutiesArchivesShow = true;
        //加载数据
        if (!this.loadDataOver) {
          this.pageLoading = true;
        }
        if (!that.bookIsInit && this.loadDataOver) {

          this.initArchives();
        }
      },
      /**
       *关闭我的履职档案
       */
      closeArchives() {
        this.$router.back();
        // let that = this;
        // that.delegateDutiesArchivesShow = false;
      },
      /**
       *我的履职档案上一页
       */
      goPrevious() {
        this.bookTarget.turn("previous");
      },
      /**
       *我的履职档案下一页
       */
      goNext() {
        this.bookTarget.turn("next");
      },
      /**
       *获取年份列表
       */
      getYearList() {
        // var year = 2018;
        var newYear = new Date().getFullYear();
        for (var i = newYear; i >= 2018; i--) {
          this.yearList.push(i)
        }
      },
      showOrHideDialog() {
        $("#suggest-list-dialog").fadeToggle(300);
      },
      /**
       * 打开目录
       */
      showOrHideCatalog(isShow) {
        if (valueIsBlank(isShow)) {
          isShow = !this.catalogShow;
        }
        this.catalogShow = isShow;
        if (this.catalogShow) {
          let nowPage = this.bookTarget.turn("page");
          let pages = this.bookTarget.turn("pages");
          if (nowPage == 1 || (nowPage == pages && pages % 2 == 0)) {
            $("#slid-catalog-mask").width("75%");
          } else {
            $("#slid-catalog-mask").width("100%");
          }
          $("#side-catalog-box").addClass('animated bounceInRight');
        } else {
          $("#side-catalog-box").removeClass('bounceInRight');
        }
      },
      /**
       * 注册 和 移除 左右按键事件监听
       */
      registerLeftAndRight() {
        let that = this;
        $(document).keydown(function (e) {
          console.log("---------")
          let previous = 37, next = 39;
          switch (e.keyCode) {
            case previous:
              that.goPrevious();
              break;
            case next:
              that.goNext();
              break
          }
        })
      },
      removeLeftAndRight() {
        $(document).unbind('keydown');
      },
      //TODO
      updateDepth(book, newPage) {
        return
        var page = book.turn('page'),
                pages = book.turn('pages'),
                depthWidth = 16 * Math.min(1, page * 2 / pages);

        newPage = newPage || page;

        if (newPage > 3)
          $('.sj-book .p2 .depth').css({
            width: depthWidth,
            left: 20 - depthWidth
          });
        else
          $('.sj-book .p2 .depth').css({width: 0});

        depthWidth = 16 * Math.min(1, (pages - page) * 2 / pages);

        if (newPage < pages - 3)
          $('.sj-book .p111 .depth').css({
            width: depthWidth,
            right: 20 - depthWidth
          });
        else
          $('.sj-book .p111 .depth').css({width: 0});

      },
      /**
       * 书跳转到某页
       * @param pageNum
       * @param titleName
       */
      turnPage(pageNum,titleName) {
        // let array = ['二、参加视察调研检查情况','三、参加学习培训情况','四、参加会议情况'];
        // let arrayString = array.toString();
        // if (arrayString.indexOf(titleName) != -1){
        //   this.$message.warning("建设中");
        //   return;
        // }
        if (!valueIsBlank(pageNum))
          this.bookTarget.turn('page', pageNum);
      },
      /**
       * 得到页眉
       * @param pageNum
       */
      getPageHeader(pageNum, page) {
        if (pageNum % 2 === 1) {
          return page.chapterName;
        } else {
          return page.bigChapterName;
        }
      }
    },
    mounted() {
      let that = this;
      this.bookTarget = $("#myArchives");
      this.getYearList();
    },
    destroyed() {
      this.removeLeftAndRight();
    },
  }

  export function getSuggestionDto(year) {
    return {
      year: year,
      suggestionList: [],
      showNum: 8,//最多展示的个数  大于这个数量的自动 加。。。
      showMore: false,//多的时候是否需要展示全部
    }
  }
</script>

<style scoped>
  /*字体加粗*/
  .catalog-text-weight {
    font-weight: bold;
  }

  /*我的履职档案*/
  .delegate-duties-archives-show {
    position: absolute;
    width: 100%;
    height: calc(100% + 30px);
    top: 0;
    left: 0;
    /*background: rgba(0, 0, 0, 1);*/
    background: #5f5f5f;
    /*background: white;*/
    z-index: 2;
    overflow: hidden;
  }

  /*返回按钮*/
  .delegate-duties-archives-show .back {
    position: absolute;
    left: -120px;
    top: 10px;
    cursor: pointer;
    z-index: 2;
  }

  /*履职档案右侧工具*/
  .book-tools {
    position: absolute;
    width: 50px;
    top: 30px;
    right: -65px;
    /*box-shadow: 0 0 0px 0.5px black;*/
    display: flex;
    flex-direction: column;
    z-index: 2;
  }

  .book-tools .tools-group {
    position: relative;
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .book-tools .tools-item {
    width: 100%;
    cursor: pointer;
    margin-top: 10px;
  }

  .tool-add, .tool-reduce {
    position: relative;
    margin: 0 auto;
    width: 30px !important;
  }

  .tool-resize {
    width: 70px !important;
    margin-left: -10px;
  }

  /*侧滑目录弹窗*//*建议弹窗*/
  .suggest-dialog-box, .side-catalog-box {
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    border: 1px solid #5f5f5f;
    box-sizing: border-box;
  }

  .suggest-dialog-box {
    display: none;
  }

  .catalog-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 16;
  }

  .suggest-dialog {
    position: absolute;
    width: 50%;
    margin: auto;
    top: 0;
    bottom: 0;
    right: 0px;
  }

  .side-catalog-box .side-catalog-list {
    position: relative;
    width: 50%;
    height: 100%;
    /*padding: 20px;*/
    float: right;
    background: white;
    box-sizing: border-box;
    overflow: auto;
    z-index: 16;
  }

  .my-archives-box {
    position: absolute;
    width: calc(960px * 0.45 * 2);
    height: calc(1080px * 0.5 + 5px) !important;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
  }

  /*我的履职档案 书*/
  .myArchives {
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;

    -webkit-transition: margin-left 0.2s ease-in-out;
    -moz-transition: margin-left 0.2s ease-in-out;
    -o-transition: margin-left 0.2s ease-in-out;
    -ms-transition: margin-left 0.2s ease-in-out;
    transition: margin-left 0.2s ease-in-out;
    font-family: "思源宋体";
    background: #5F5F5F;
    /*padding: 0;*/
    /*border: 1px solid #5f5f5f;*/
    box-shadow: 0 0 0 0 #5f5f5f;
    border: 1px solid #5f5f5f;
    display: block;
  }


  /*我的履职档案  每个页面 pages*/
  .myArchives .pages {
    background: white;
  }

  /*封面*/
  .pages .badge {
    margin: 0 auto;
    width: 20%;
    margin-top: 15%;
  }

  .badge img {
    width: 100%;
  }

  /*人物信息*/
  .pages .head {
    margin: 0 auto;
    width: 150px;
    height: 200px;
    margin-top: 80px;
  }

  .head img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    box-shadow: 0 5px 7px 1px rgba(0, 0, 0, 0.2);
    /*border: 1px dashed #888888;*/
    border-radius: 4px;
  }

  .pages .username {
    color: #D7A34C;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    letter-spacing: 8px;
    margin-top: 25px;
    margin-bottom: 20px;
  }

  .pages .introduce {
    position: relative;
    width: 100%;
    margin: auto;
    color: #d8a54b;
    text-align: center;
    /*font-size: 1.1rem;*/
    font-size: 14px;
  }

  .pages .slogan {
    color: #d8a54b;
    font-weight: bold;
    margin-top: 30px;
    text-align: center;
    font-size: 1.4rem;
  }

  .pages .key {
    color: #d8a54b;
    font-weight: bold;
    margin-top: 20%;
    text-align: center;
    font-size: 1.6rem;
  }

  .pages .timeSlot {
    color: #d8a54b;
    font-weight: bold;
    text-align: center;
    position: absolute;
    bottom: 10%;
    width: 100%;
    font-size: 0.8rem;
  }

  /*目录相关样式*/
  .pages .catalog {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 10px auto;
    overflow: auto;
  }

  /deep/ .catalog-title {
    width: 100%;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: -10px;
    margin-top: 20px;
  }

  /deep/ .catalog-ul {
    position: relative;
    padding-left: 0;
    padding-right: 0;
  }

  /deep/ .catalog-ul-li {
    list-style: none;
    margin-top: 0px;
    position: relative;
    overflow: hidden;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-content: center;
    justify-content: space-between;
    line-height: 21px;
  }

  /deep/ .catalog-ul-li-title {
    position: relative;
    margin: 15px auto;
    font-size: 16px;
    font-weight: bold;
  }

  /deep/ .catalog-ul-li-small-title {
    font-size: 14px;
    margin: 10px 0;
    cursor: pointer;
  }

  /deep/ .catalog-li-text {
    position: relative;
    width: 100%;
    background: white;
    z-index: 2;
    color: #4a4a4a;
    letter-spacing: 0.5px;
    font-size: 12px;
    font-family: 思源黑体;
    display: inline-block;
    padding-left: 14px;
  }

  .catalog-li-text-title {
    width: calc(100% - 50px);
  }

  .catalog-li-line {
    position: absolute;
    width: 100%;
    height: 1px;
    margin: auto;
    display: inline-block;
    border-top: 1px dashed #4a4a4a;
    top: 10px;
    /*bottom: 0;*/
    z-index: 1
  }

  .list-num {
    position: absolute;
    height: 100%;
    right: 0;
    bottom: 1px;
    align-items: flex-end;
    display: inline-flex;
    padding: 0 5px;
    z-index: 100;
    text-align: right;
    background: #fff;
    font-size: 12px;
    width: 38px;
  }

  /deep/ ul li div {
    display: inline-block;
  }

  /deep/ .list-line {
    position: absolute;
    height: 1px;
    border-top: 1px dashed #4a4a4a;
    margin: auto;
    bottom: 10px;
    width: calc(100% - 20px);
    z-index: -1;
  }

  /*目录里面的建议标题*/
  /deep/ .catalog-suggest-title-box {
    width: calc(100% - 28px);
    display: inline-flex;
    justify-content: space-between;
  }

  /deep/ .catalog-suggest-title-box .catalog-suggest-title {
    z-index: 2;
    background: white
  }

  /deep/ .remove-scroll-bar::-webkit-scrollbar, .catalog::-webkit-scrollbar {
    display: none;
  }


  /*建议信息样式*/
  .suggest-prominent-color {
    color: #7B4D12;
  }

  .suggest-msg {
    font-family: 思源黑体;
    font-size: 14px;
    margin-top: 10px;
    overflow: hidden;
  }

  .suggest-msg .suggest-title {
    display: flex;
    margin-bottom: 15px;
  }

  .suggest-title .title-label {
    width: 70px;
    flex-shrink: 0;
  }

  .suggest-title .title-content {
    font-family: 思源宋体;
  }

  .suggest-time {
    margin-top: 7px;
  }

  .suggest-fix-unit {
    margin-top: 7px;
  }

  .suggest-time, .suggest-fix-unit, .content-label {
    font-size: 12px;
  }

  .suggest-time .time-content, .suggest-fix-unit .unit-name {
    font-family: 楷体;
  }

  .suggest-fix-msg {
    display: flex;
    justify-content: space-between;
  }

  .content-text {
    font-size: 12px;
    margin-top: 10px;
    line-height: 20px;
    font-family: 仿宋;
  }

  /*测试书阴影使用*/
  .shadow {
    -webkit-box-shadow: 0 4px 10px #666;
    -moz-box-shadow: 0 4px 10px #666;
    -ms-box-shadow: 0 4px 10px #666;
    -o-box-shadow: 0 4px 10px #666;
    box-shadow: 0 4px 10px #666;
  }

  /*书的中间分割阴影*/
  .sj-book .even {
    /*background: -webkit-gradient(linear, left top, right top, color-stop(0.95, #fff), color-stop(1, #dadada));
    background-image: -webkit-linear-gradient(left, #fff 95%, #dadada 100%);
    background-image: -moz-linear-gradient(left, #fff 95%, #dadada 100%);
    background-image: -ms-linear-gradient(left, #fff 95%, #dadada 100%);
    background-image: -o-linear-gradient(left, #fff 95%, #dadada 100%);
    background-image: linear-gradient(left, #fff, #dadada);*/
    background-image: url("~@/assets/images/book/gradient-page-left.jpg");
    background-repeat: repeat-y;
    background-position: top right;
  }


  .sj-book .odd {
    /*background: -webkit-gradient(linear, right top, left top, color-stop(0.95, #fff), color-stop(1, #dadada));
    background-image: -webkit-linear-gradient(right, #fff 95%, #cacaca 100%);
    background-image: -moz-linear-gradient(right, #fff 95%, #cacaca 100%);
    background-image: -ms-linear-gradient(right, #fff 95%, #cacaca 100%);
    background-image: -o-linear-gradient(right, #fff 95%, #cacaca 100%);
    background-image: linear-gradient(right, #fff 95%, #cacaca 100%);*/
    background-image: url("~@/assets/images/book/gradient-page-right.jpg");
    background-repeat: repeat-y;
    background-position: top left;
  }

  .sj-book .first-page {
    background: -webkit-gradient(linear, right top, left top, color-stop(1, #fff), color-stop(1, #fff));
  }

  /*书的加载动画*/
  .sj-book .loader {
    background-image: url("~@/assets/images/book/loader.gif");
    width: 22px;
    height: 22px;
    position: absolute;
    top: 280px;
    left: 219px;
  }

  .sj-book .depth {
    /*background-image: url("~@/assets/images/client/book/pages-depth.png");*/
    display: none;
    position: absolute;
    top: 7px;
    width: 16px;
    height: 100%;
  }

  .sj-book .shadow {
    -webkit-transition: -webkit-box-shadow 0.5s;
    -moz-transition: -moz-box-shadow 0.5s;
    -o-transition: -webkit-box-shadow 0.5s;
    -ms-transition: -ms-box-shadow 0.5s;

    -webkit-box-shadow: 0 0 10px #999;
    -moz-box-shadow: 0 0 10px #999;
    -ms-box-shadow: 0 0 10px #999;
    -o-box-shadow: 0 0 10px #999;
    box-shadow: 0 0 10px #999;
  }

  /*.sj-book .page {
    -webkit-box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    -ms-box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    -o-box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }*/
  /*段落样式*/

  /*章段落样式*/
  /deep/ .chapter-msg {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 20px 10px;
  }

  /deep/ .chapter-top, .chapter-top-even {
    /*height: 150px;*/
    height: 50%;
    display: inline-flex;
    justify-content: center;
    flex-direction: column;
    text-align: right;
    align-items: center;
  }

  /deep/ .chapter-title {
    font-family: 思源宋体;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  }

  /deep/ .chapter-title, .chapter-sort {
    /*width: 20px;*/
    line-height: 22px;
    word-break: break-all;
  }

  /deep/ .chapter-sort {
    /*width: 20px;*/
    /*display: inline-flex;*/
    /*flex-direction: column;*/
    /*align-items: center;*/
  }

  /deep/ .chapter-line {
    position: relative;
    margin: 15px 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid;
  }

  /deep/ .chapter-line i {
    position: absolute;
    right: 13px;
    top: -15px;
    font-size: 20px;
    color: black;
  }

  /deep/ .chapter-introduce {
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

  /deep/ .chapter-top-even {
    text-align: left;
  }

  /deep/ .chapter-top-even .chapter-line i {
    left: 15px;
    right: auto;
  }

  /*标题放左面 通过css 翻转位置*//*chapter-top-even*/
  /deep/ .pages.even .chapter-top {
    /*display: none;*/
  }

  /deep/ .pages.odd .chapter-top-even {
    /*display: none;*/
  }


  /*页段落样式*/
  /deep/ .paragraph {
    text-indent: 2em;
    letter-spacing: 0.25px;
  }

  /deep/ .common-text {
    letter-spacing: 0.25px;
  }

  /deep/ .font-bold {
    font-weight: bold;
  }

  /deep/ .prominent-color {
    color: #7B4D12;
  }

  /deep/ .title-msg {
    font-family: 思源黑体;
    display: flex;
    margin-bottom: 15px;
    font-size: 14px;
    margin-top: 10px;
    overflow: hidden;
  }

  /deep/ .title-msg .title-content {
    font-family: 思源宋体;
  }


  /deep/ .title-msg .title-label {
    font-family: 思源黑体;
    width: 70px;
    flex-shrink: 0;
  }

  /deep/ .title-msg .item-label {
    font-family: 思源黑体;
    font-size: 12px;
    width: 70px;
    flex-shrink: 0;
  }

  /deep/ .title-msg .item-content {
    font-size: 12px;
    font-family: 楷体;
  }


</style>
