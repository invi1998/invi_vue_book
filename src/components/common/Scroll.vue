<!--  -->
<template>
  <div
    class="scroll-wrapper"
    :class="{'no-scroll':ifNoScroll}"
    @scroll.passive="handleScroll"
    ref="scrollWrapper"
  >
    <slot></slot>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { realPx } from "@/utils/utils";
export default {
  props: {
    top: {
      type: Number,
      default: 0
    },
    bottom: {
      type: Number,
      default: 0
    },
    ifNoScroll: {
      type: Boolean,
      default: false
    },
    initPosition: {
      type: Object,
      default: () => {
        return {
          x: 0,
          y: 0
        };
      }
    }
  },
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //捕捉当屏幕产生滑动时Y轴的偏移量
    handleScroll(e) {
      const offsetY =
        e.target.scrollTop || window.pageYOffset || document.body.scrollTop;
      this.$emit("onScroll", offsetY);
    },
    scrollTo(x, y) {
      this.$refs.scrollWrapper.scrollTo(x, y);
    },
    refresh() {
      if (this.$refs.scrollWrapper) {
        this.$refs.scrollWrapper.style.height =
          window.innerHeight - realPx(this.top) - realPx(this.bottom) + "px";
        this.$refs.scrollWrapper.addEventListener("scroll", this.handleScroll);
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.refresh();
    this.$nextTick(() => {
      setTimeout(() => {
        this.scrollTo(realPx(this.initPosition.x), realPx(this.initPosition.y));
      }, 1);
    });
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
.scroll-wrapper {
  position: relative;
  z-index: 100;
  width: 100%;
  @include scroll;
  &.no-scroll {
    overflow: hidden;
  }
}
</style>