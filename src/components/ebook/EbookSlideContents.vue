<!--  -->
<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-content-search-icon">
          <span class="icon-isearch"></span>
        </div>
        <input
          type="text"
          class="slide-contents-search-input"
          :placeholder="$t('book.searchHint')"
          @click="showSearchPage()"
          @keyup.enter.exact="search()"
          v-model="searchText"
        />
      </div>
      <div
        class="slide-contents-search-cancel"
        v-if="searchVisible"
        @click="hideSearchPage()"
      >{{$t('book.cancel')}}</div>
    </div>
    <div class="slide-contents-book-wrapper" v-show="!searchVisible">
      <div class="slide-contents-book-img-wrapper">
        <img :src="cover" alt class="slide-contents-book-img" />
      </div>
      <div class="slide-contents-book-info-wrapper">
        <div class="slide-contents-book-title">
          <span class="slide-content-book-title-text">{{metadata.title}}</span>
        </div>
        <div class="slide-contents-book-author">
          <span class="slide-content-book-author-text">{{metadata.creator}}</span>
        </div>
      </div>
      <div class="slider-contents-book-progress-wrapper">
        <div class="slide-contents-book-progress">
          <span class="progress">{{progress+'%'}}</span>
          <span class="progress-text">{{$t('book.haveRead2')}}</span>
        </div>
        <div class="slide-contents-book-time">{{getReadTimeText()}}</div>
      </div>
    </div>
    <scroll
      class="slide-contents-list"
      :top="156"
      :bottom="48"
      ref="scroll"
      v-show="!searchVisible"
    >
      <div class="slide-contents-item" v-for="(item,index) in navigation" :key="index">
        <span
          class="slide-contents-item-label"
          :class="{'selected':section===index}"
          :style="contentItemStyle(item)"
          @click="displayContent(item.href,false)"
        >{{item.label}}</span>
        <span class="slide-contents-item-page">{{item.page}}</span>
      </div>
    </scroll>
    <scroll class="slide-search-list" :top="66" :bottom="48" v-show="searchVisible">
      <div
        class="slide-search-item"
        v-for="(item,index) in searchList"
        :key="index"
        v-html="item.excerpt"
        @click="displayContent(item.cfi,true)"
      ></div>
    </scroll>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { ebookMixin } from "../../utils/mixin";
import Scroll from "../../components/common/Scroll";
import { px2rem } from "../../utils/utils";
export default {
  mixins: [ebookMixin],
  //import引入的组件需要注入到对象中才能使用
  components: {
    Scroll
  },
  data() {
    //这里存放数据
    return {
      searchVisible: false,
      searchList: null,
      searchText: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    hideSearchPage() {
      this.searchVisible = false;
      this.searchText = "";
      this.searchList = null;
    },
    showSearchPage() {
      this.searchVisible = true;
    },
    contentItemStyle(item) {
      return {
        marginLeft: `${px2rem(item.level * 15)}rem`
      };
    },
    //带隐藏目录和标题的回调函数
    displayContent(target, highLight = false) {
      this.display(target, () => {
        this.hideTitleAndMenu();
      });
      if (highLight) {
        this.currentBook.rendition.annotations.highlight(target);
      }
    },
    //全文搜索方法
    doSearch(q) {
      return Promise.all(
        this.currentBook.spine.spineItems.map(item =>
          item
            .load(this.currentBook.load.bind(this.currentBook))
            .then(item.find.bind(item, q))
            .finally(item.unload.bind(item))
        )
      ).then(results => Promise.resolve([].concat.apply([], results)));
    },
    search() {
      if (this.searchText && this.searchText.length > 0) {
        this.doSearch(this.searchText).then(list => {
          this.searchList = list;
          this.searchList.map(item => {
            item.excerpt = item.excerpt.replace(
              this.searchText,
              `<span class="content-search-text">${this.searchText}</span>`
            );
            return item;
          });
        });
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
@import "../../assets/styles/global.scss";
.ebook-slide-contents {
  width: 100%;
  font-size: 0;
  .slide-contents-search-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(36);
    margin: px2rem(20) 0 px2rem(10) 0;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-contents-search-input-wrapper {
      flex: 1;
      @include center;
      .slide-content-search-icon {
        flex: 0 0 px2rem(28);
        font-size: px2rem(12);
        @include center;
        .icon-isearch {
        }
      }
      .slide-contents-search-input {
        flex: 1;
        width: 100%;
        height: px2rem(32);
        font-size: px2rem(14);
        background: transparent;
        border: none;
        &:focus {
          outline: none;
        } //通过:focus这个伪类设置搜索框获得焦点时的边框样式
      }
    }
    .slide-contents-search-cancel {
      flex: 0 0 px2rem(50);
      font-size: px2rem(14);
      @include right;
    }
  }
  .slide-contents-book-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(90);
    padding: px2rem(10) px2rem(15) px2rem(20) px2rem(15);
    box-sizing: border-box;
    .slide-contents-book-img-wrapper {
      flex: 0 0 px2rem(45);
      .slide-contents-book-img {
        width: px2rem(45);
        height: px2rem(60);
      }
    }
    .slide-contents-book-info-wrapper {
      flex: 1;
      @include columnLeft;
      padding: 0 px2rem(10);
      box-sizing: border-box;
      .slide-contents-book-title {
        //375*0.85=318.75-30=288.75-20=268.75-5=223.75-70=153.75
        // width: px2rem(153.75);
        font-size: px2rem(14);
        @include left; //外层居左排列
        .slide-content-book-title-text {
          @include ellipsis2(3); //内层缩放
        }
      }
      .slide-contents-book-author {
        //375*0.85=318.75-30=288.75-20=268.75-5=223.75-70=153.75
        // width: px2rem(153.75);
        font-size: px2rem(12);
        margin-top: px2rem(5);
        @include left; //外层居左排列
        .slide-content-book-author-text{
          @include ellipsis2(1); //内层缩放
        }
      }
    }
    .slider-contents-book-progress-wrapper {
      flex: 0 0 px2rem(70);
      @include columnLeft;
      .slide-contents-book-progress {
        .progress {
          font-size: px2rem(14);
          line-height: px2rem(16);
        }
        .progress-text {
          font-size: px2rem(12);
          line-height: px2rem(14);
          margin-left: px2rem(2);
        }
      }
      .slide-contents-book-time {
        font-size: px2rem(12);
        margin-top: px2rem(5);
        line-height: px2rem(14);
      }
    }
  }
  .slide-contents-list {
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-contents-item {
      padding: px2rem(20) 0;
      box-sizing: border-box;
      display: flex;
      .slide-contents-item-label {
        flex: 1;
        font-size: px2rem(14);
        line-height: px2rem(16);
        @include ellipsis;
      }
      .slide-contents-item-page {
        flex: 0 0 px2rem(30);
        font-size: px2rem(10);
        @include right;
      }
    }
  }
  .slide-search-list {
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-search-item {
      font-size: px2rem(14);
      line-height: px2rem(16);
      padding: px2rem(20) 0;
      box-sizing: border-box;
    }
  }
}
</style>