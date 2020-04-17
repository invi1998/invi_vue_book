<!--  -->
<template>
  <div>
    <div class="hot-search-title">
      <span class="label">{{label}}</span>
      <span class="btn">{{btn}}</span>
    </div>
    <div class="hot-search-list">
      <div class="hot-search-item" v-for="(item, index) in hotSearch" :key="index">
        <div class="icon-wrapper">
          <span class="icon-book icon" v-if="item.type === 1"></span>
          <span class="icon-search icon" v-if="item.type === 2"></span>
        </div>
        <div class="hot-search-text-wrapper">
          <div class="text" ref="searchText">{{item.text}}</div>
          <div class="num" v-if="item.num">{{item.num}}人搜索</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { realPx } from "../../utils/utils";
export default {
  props: {
    label: String,
    btn: String,
    hotSearch: Array
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
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$refs.searchText.forEach(item => {
      item.style.width = window.innerWidth - realPx(20) - realPx(40) + "px";
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

.hot-search-title {
  display: flex;
  width: 100%;
  font-size: px2rem(13);
  padding: px2rem(10);
  box-sizing: border-box;
  .label {
    flex: 1;
    text-align: left;
    font-weight: bold;
    color: #666;
  }
  .btn {
    flex: 1;
    text-align: right;
    font-weight: bold;
    color: #409eff;
  }
}
.hot-search-list {
  width: 100%;
  padding: 0 px2rem(10);
  box-sizing: border-box;
  .hot-search-item {
    padding: px2rem(10) 0;
    display: flex;
    .icon-wrapper {
      flex: 0 0 px2rem(40);
      @include center;
      .icon-book {
        font-size: px2rem(16);
      }
      .icon-search {
        font-size: px2rem(16);
      }
    }
    .hot-search-text-wrapper {
      flex: 1;
      height: px2rem(35);
      @include columnLeft;
      .text {
        flex: 1;
        height: 100%;
        font-size: px2rem(14);
        font-weight: bold;
        color: #666;
        @include ellipsis;
        @include left;
      }
      .num {
        font-size: px2rem(12);
        color: #999;
        margin-top: px2rem(5);
      }
    }
  }
}
</style>