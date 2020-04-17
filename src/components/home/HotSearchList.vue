<!--  -->
<template>
  <transition name="hot-search-move">
    <scroll class="hot-search-wrapper" :top="52" @onScroll="onScroll" ref="scroll">
      <hot-search
        :label="$t('home.hotSearch')"
        :btn="$t('home.change')"
        :hotSearch="searchList.hotSearch"
      ></hot-search>
      <div class="line"></div>
      <hot-search
        :label="$t('home.historySearch')"
        :btn="$t('home.clear')"
        :hotSearch="searchList.historySearch"
      ></hot-search>
    </scroll>
  </transition>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import scroll from "../common/Scroll";
import hotSearch from "./HotSearch";
import { storeHomeMixin } from "../../utils/mixin";
export default {
  mixins: [storeHomeMixin],
  //import引入的组件需要注入到对象中才能使用
  components: {
    scroll,
    hotSearch
  },
  data() {
    //这里存放数据
    return {
      searchList: {
        hotSearch: [
          {
            type: 1,
            text: "Self-Reported Population Health",
            num: "1.8万"
          },
          {
            type: 1,
            text: "Library and Information Sciences",
            num: "1.1万"
          },
          {
            type: 1,
            text: "Global Business Strategy",
            num: "1.3万"
          },
          {
            type: 1,
            text: "Corporate Data Quality",
            num: "1.0万"
          },
          {
            type: 1,
            text: "Verrechnungspreise",
            num: "3.9万"
          }
        ],
        historySearch: [
          {
            type: 2,
            text: "Computer Science"
          },
          {
            type: 1,
            text: "Building the Infrastructure for Cloud Security"
          },
          {
            type: 2,
            text: "ePub"
          },
          {
            type: 2,
            text: "api"
          },
          {
            type: 2,
            text: "Vue.js"
          },
          {
            type: 2,
            text: "Nginx"
          },
          {
            type: 2,
            text: "Java"
          },
          {
            type: 2,
            text: "hdfs"
          },
          {
            type: 2,
            text: "vuejs"
          },
          {
            type: 2,
            text: "es6"
          },
          {
            type: 2,
            text: "Intel"
          },
          {
            type: 1,
            text: "Pro Git"
          },
          {
            type: 2,
            text: "imooc"
          },
          {
            type: 2,
            text: "Education"
          },
          {
            type: 2,
            text: "Springer"
          },
          {
            type: 2,
            text: "Environment"
          }
        ]
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    onScroll(offsetY) {
      this.setHotSearchOffsetY(offsetY);
    },
    reset() {
      this.$refs.scroll.scrollTo(0, 0);
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
.hot-search-wrapper {
  width: 100%;
  height: 100%;
  background: white;
  .line {
    width: 100%;
    height: 0;
    border-top: px2rem(1) solid #eee;
    margin: px2rem(10) 0;
  }
}
</style>