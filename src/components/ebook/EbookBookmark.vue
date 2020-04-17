<!--  -->
<template>
  <div class="ebook-bookmark" ref="ebookBookmark">
    <div class="ebook-bookmark-text-wrapper">
      <div class="ebook-bookmark-down-wrapper" ref="iconDown">
        <span class="icon-idown"></span>
      </div>
      <div class="ebook-bookmark-text">{{text}}</div>
    </div>
    <div class="ebook-bookmark-icon-wrapper" :style="isFixed ? fixedStyle : {}">
      <bookmark :color="color" :width="15" :height="50" ref="bookmark"></bookmark>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Bookmark from "../common/Bookmark";
import { realPx } from "../../utils/utils";
import { ebookMixin } from "../../utils/mixin";
import { getBookmark, saveBookmark } from "../../utils/localStorage";
const BLUE = "#FF514B";
const WHITE = "#A4F1F6";
export default {
  mixins: [ebookMixin],
  //import引入的组件需要注入到对象中才能使用
  components: {
    Bookmark
  },
  data() {
    //这里存放数据
    return {
      text: "",
      color: WHITE,
      isFixed: false
    };
  },
  //监听属性 类似于data概念
  computed: {
    height() {
      return realPx(50);
    },
    threshold() {
      return realPx(85);
    },
    fixedStyle() {
      return {
        position: "fixed",
        top: 0,
        right: `${(window.innerWidth - this.$refs.ebookBookmark.clientWidth) / 2}px`
      };
    }
  },
  //监控data中的数据变化
  watch: {
    offsetY(v) {
      //书签未到达临街状态
      if (!this.bookAvailable || this.menuVisible || this.settingVisible >= 0) {
        return;
      }
      if (v >= this.height && v <= this.threshold) {
        this.beforeThreshold(v);
      } else if (v >= this.threshold) {
        this.afterThreshold(v);
      } else if (v > 0 && v < this.height) {
        //状态未超过书签高度
        this.beforeHeight();
      } else if (v === 0) {
        //状态归位
        this.restore();
      }
    },
    isBookmark(isBookmark) {
      if (isBookmark) {
        this.color = BLUE;
        this.isFixed = true;
      } else {
        this.color = WHITE;
        this.isFixed = false;
      }
    }
  },
  //方法集合
  methods: {
    addBookmark() {
      this.bookmark = getBookmark(this.fileName);
      if (!this.bookmark) {
        this.bookmark = [];
      }
      const currentLocation = this.currentBook.rendition.currentLocation();
      const cfibase = currentLocation.start.cfi.replace(/!.*/, "");
      const cfistart = currentLocation.start.cfi
        .replace(/.*!/, "")
        .replace(/\)$/, "");
      const cfiend = currentLocation.end.cfi
        .replace(/.*!/, "")
        .replace(/\)$/, "");
      const cfirange = `${cfibase}!,${cfistart},${cfiend})`;
      this.currentBook.getRange(cfirange).then(range => {
        const text = range.toString().replace(/\$\$/g, "");
        this.bookmark.push({
          //通过这cfi来判断当前页是否是书签页，而且下次还可以直接通过该书签页的cfi直接display实现书签页跳转
          cfi: currentLocation.start.cfi,
          //书签文本缩写
          text: text
        });
        this.setIsBookmark(true);
        saveBookmark(this.fileName, this.bookmark);
      });
    },
    removeBookmark() {
      const currentLocation = this.currentBook.rendition.currentLocation();
      const cfi = currentLocation.start.cfi;
      this.bookmark = getBookmark(this.fileName);
      if (this.bookmark) {
        saveBookmark(
          this.fileName,
          this.bookmark.filter(item => item.cfi !== cfi)
        );
        this.setIsBookmark(false);
      }
    },
    beforeThreshold(v) {
      this.$refs.ebookBookmark.style.top = `${-v}px`;
      this.beforeHeight();
      // const iconDown = this.$refs.iconDown;
      if (this.$refs.iconDown.style.transform === "rotate(180deg)") {
        this.$refs.iconDown.style.transform === "rotate(0deg)";
      }
      this.isFixed = false;
    },
    afterThreshold(v) {
      // //书签超越达临街状态
      this.$refs.ebookBookmark.style.top = `${-v}px`;
      if (this.isBookmark) {
        this.text = this.$t("book.releaseDeleteMark");
        this.color = WHITE;
        this.isFixed = false;
      } else {
        this.text = this.$t("book.releaseAddMark");
        this.color = BLUE;
        this.isFixed = true;
      }

      // const iconDown = this.$refs.iconDown;
      if (
        this.$refs.iconDown.style.transform === "" ||
        this.$refs.iconDown.style.transform === "rotate(0deg)"
      ) {
        this.$refs.iconDown.style.transform = "rotate(180deg)";
        console.log('null-0')
      }
    },
    beforeHeight() {
      if (this.isBookmark) {
        this.text = this.$t("book.pulldownDeleteMark");
        this.color = BLUE;
        this.isFixed = true;
      } else {
        this.text = this.$t("book.pulldownAddMark");
        this.color = WHITE;
        this.isFixed = false;
      }
    },
    restore() {
      setTimeout(() => {
        this.$refs.ebookBookmark.style.top = `${-this.height}px`;
        this.$refs.iconDown.style.transform = "rotate(0deg)";
      }, 200);
      if (this.isFixed) {
        this.setIsBookmark(true);
        this.addBookmark();
      } else {
        this.setIsBookmark(false);
        this.removeBookmark();
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
.ebook-bookmark {
  // background: rgb(68, 72, 75);
  position: absolute;
  top: px2rem(-50);
  left: 0;
  z-index: 200;
  width: 100%;
  height: px2rem(50);
  .ebook-bookmark-text-wrapper {
    position: absolute;
    right: px2rem(45);
    bottom: 0;
    display: flex;
    .ebook-bookmark-down-wrapper {
      font-size: px2rem(14);
      color: rgb(63, 63, 63);
      transition: all 0.2s linear;
      @include center;
    }
    .ebook-bookmark-text {
      font-size: px2rem(14);
      color: rgb(68, 68, 68);
    }
  }
  .ebook-bookmark-icon-wrapper {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: px2rem(10);
  }
}
</style>