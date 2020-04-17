<!--  -->
<template>
  <div class="bookmark" :style="style" ref="bookmark"></div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { px2rem } from "../../utils/utils";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},

  props: {
    width: Number,
    height: Number,
    color: String
  },

  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {
    style() {
      if (this.color) {
        return {
          borderColor: `${this.color} ${this.color} transparent ${this.color}`
        };
      } else {
        return {};
      }
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    refresh() {
      if (this.width && this.height) {
        this.$refs.bookmark.style.borderWidth = `${px2rem(
          this.height - 5
        )}rem ${px2rem(this.width / 2)}rem ${px2rem(5)}rem ${px2rem(
          this.width / 2
        )}rem`;
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.refresh();
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
.bookmark {
  width: 0;
  height: 0;
  font-weight: bold;
  line-height: 0;
  border-width: px2rem(50) px2rem(10) px2rem(10) px2rem(10);
  border-style: solid;
  border-color: #A4F1F6 #A4F1F6 transparent #A4F1F6;
}
</style>