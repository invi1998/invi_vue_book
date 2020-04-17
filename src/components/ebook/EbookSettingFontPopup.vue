<!--   -->
<template>
  <transition name="popup-slide-up">
    <div class="ebook-popup-list" v-show="fontFamilyVisible">
      <div class="ebook-popup-title">
        <div class="ebook-popup-title-icon" @click="hide">
          <span class="icon-idown2"></span>
        </div>
        <span class="ebook-popup-title-text">{{$t('book.selectFont')}}</span>
      </div>
      <div class="ebook-popup-list-wrapper">
        <div class="ebook-popup-item"  v-for="(item , index) in fontFamilyList" :key="index" @click="setFontFamily(item.font)" :class="{'selectedBG':isSelected(item)}">
          <div class="ebook-popup-item-text" :class="{'selected':isSelected(item)}">{{item.font}}</div>
          <div class="eboo-popup-item-check">
            <span class="icon-icheck" v-if="isSelected(item)"></span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import { ebookMixin } from "../../utils/mixin";
import { FONT_FAMILY } from "../../utils/book";

import {saveFontFamily} from '../../utils/localStorage'

export default {
  mixins: [ebookMixin],

  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      fontFamilyList: FONT_FAMILY
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    hide() {
      this.setFontFamilyVisible(false);
    },
    isSelected(item) {
      return this.defaultFontFamily === item.font;
    },
    setFontFamily(font){
      this.setDefaultFontFamily(font);
      saveFontFamily(this.fileName,font);
      if(font=== 'Default'){
        this.currentBook.rendition.themes.font('Times New Roman');
      }else{
        this.currentBook.rendition.themes.font(font);
      }
      
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
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
.ebook-popup-list {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 300;
  width: 100%;
  // background: white;
  box-shadow: 0 px2rem(-4) px2rem(6) rgba(0, 0, 0, 0.1);
  .ebook-popup-title {
    position: relative;
    padding: px2rem(15);
    // border-bottom: px2rem(1) solid rgb(190, 190, 190);
    text-align: center;
    @include center;
    .ebook-popup-title-icon {
      position: absolute;
      left: px2rem(15);
      top: 0;
      height: 100%;
      @include center;
      .icon-idown2 {
        font-size: px2rem(16);
      }
    }
    .ebook-popup-title-text {
      font-size: px2rem(14);
      font-weight: bold;
    }
  }
  .ebook-popup-list-wrapper {
    .ebook-popup-item {
      display: flex;
      padding: px2rem(15);
      // &.selectedBG{
      //    background: #e2fae2;
      // }
      .ebook-popup-item-text {
        flex: 1;
        font-size: px2rem(14);
        text-align: left;
        // &.selected {
        //   color: #00cc00;
        // }
      }
      .eboo-popup-item-check {
        flex: 1;
        text-align: right;
        font-size: px2rem(14);
        // color: #00cc00;
      }
    }
  }
}
</style>