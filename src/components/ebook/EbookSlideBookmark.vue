<!--  -->
<template>
  <div class="ebook-slide-bookmark">
    <div class="slide-bookmark-title">{{$t('book.bookmark')}}.{{bookmark ? bookmark.length : 0}}</div>
    <scroll class="slide-bookmark-list" :top="48" :bottom="48">
      <div
        class="slide-bookmark-item"
        v-for="(item, index) in bookmark"
        :key="index"
        @click="displayBookmark(item.cfi)"
      >
        <div class="slide-bookmark-item-icon">
          <div class="icon-bookmark"></div>
        </div>
        <div class="slide-bookmark-item-text">{{item.text}}</div>
      </div>
    </scroll>
  </div>
</template>

<script>
import { getBookmark } from "../../utils/localStorage";
import { ebookMixin } from "../../utils/mixin";
import scroll from '../common/Scroll'
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  mixins: [ebookMixin],
  //import引入的组件需要注入到对象中才能使用
  components: {
      scroll
  },
  data() {
    //这里存放数据
    return {
        bookmark: null
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    displayBookmark(target) {
      this.display(target, () => {
        this.hideTitleAndMenu();
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.bookmark = getBookmark(this.fileName);
  },
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

.ebook-slide-bookmark {
  width: 100%;
  .slide-bookmark-title {
    width: 100%;
    height: px2rem(48);
    font-size: px2rem(14);
    font-weight: bold;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    @include left;
  }
  .slide-bookmark-list {
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-bookmark-item {
      display: flex;
      padding: px2rem(15) 0;
      box-sizing: border-box;
      .slide-bookmark-item-icon {
        flex: 0 0 px2rem(29);
        @include left;
        .icon-bookmark {
          width: px2rem(20);
          height: px2rem(20);
          font-size: px2rem(12);
          border-radius: 50%;
          background: #bbb;
          @include center;
        }
      }
      .slide-bookmark-item-text {
        font-size: px2rem(14);
        line-height: px2rem(15);
        max-height: px2rem(45);
        @include ellipsis2(3);
      }
    }
  }
}
</style>