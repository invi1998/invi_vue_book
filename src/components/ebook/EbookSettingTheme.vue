<!--  -->
<template>
  <div class="ebook-setting-theme">
    <transition name="slide-up">
      <div class="setting-wrapper" v-show="menuVisible && settingVisible === 1">
        <div class="setting-theme">
          <div
            class="setting-theme-item"
            v-for="(item, index) in themeList"
            :key="index"
            @click="setTheme(item.name)"
          >
            <div
              class="preview"
              :class="{'selected': item.name === defaultTheme}"
              :style="{background: item.style.body.background}"
            ></div>
            <div class="text" :class="{'selected': item.name === defaultTheme}">{{item.alias}}</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { ebookMixin } from "../../utils/mixin";
import { saveTheme } from '../../utils/localStorage';
export default {
  mixins: [ebookMixin],
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
      setTheme(themeName){
          
          this.setDefaultTheme(themeName).then(()=>{
              this.currentBook.rendition.themes.select(this.defaultTheme)
              this.initGlobalStyle()
          })

          saveTheme(this.fileName,themeName)
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
.setting-wrapper {
  position: absolute;
  bottom: px2rem(48);
  left: 0;
  z-index: 190;
  width: 100%;
  height: px2rem(90);
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  .setting-theme {
    height: 100%;
    display: flex;
    .setting-theme-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: px2rem(5);
      box-sizing: border-box;
      .preview {
        flex: 1;
        border: px2rem(1) solid #ccc;
        box-sizing: border-box;
        border: px2rem(1) solid rgb(236, 236, 236);
        border-radius: 50%;
        &.selected {
          box-shadow: 0 px2rem(4) px2rem(6) 0 rgba(0, 0, 0, 0.1);
          border: px2rem(2) solid #5e6369;
        }
      }
      .text {
        flex: 0 0 px2rem(20);
        font-size: px2rem(12);
        @include center;
      }
    }
  }
}
</style>