<!--  -->
<template>
  <transition name="fade">
    <div class="slide-content-wrapper" v-show="menuVisible&&settingVisible === 3">
      <transition name="slide-right">
        <div class="content" v-show="settingVisible === 3">
          <div class="content-page-wrapper" v-if="bookAvailable">
            <div class="content-page">
                <component :is="currentTab===1 ? content:bookmark"></component>
            </div>
            <div class="content-page-tab">
                <div class="content-page-tab-item" :class="{'selected':currentTab ===1}" @click="selectTab(1)">{{$t('book.navigation')}}</div>
                <div class="content-page-tab-item" :class="{'selected':currentTab ===2}" @click="selectTab(2)">{{$t('book.bookmark')}}</div>
            </div>
          </div>
          <div class="content-empty" v-else>
            <ebook-loading></ebook-loading>
          </div>
        </div>
      </transition>
      <div class="content-bg" v-if="settingVisible === 3 || settingVisible === 4" @click="hideTitleAndMenu()"></div>
    </div>
  </transition>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { ebookMixin } from "../../utils/mixin";
import EbookSlideContents from './EbookSlideContents';
import EbookLoading from './EbookLoading'
import EbookBookmark from './EbookSlideBookmark'
export default {
  mixins: [ebookMixin],
  //import引入的组件需要注入到对象中才能使用
  components: {
      EbookSlideContents,
      EbookLoading,
      EbookBookmark
  },
  data() {
    //这里存放数据
    return {
        currentTab:1,
        content:EbookSlideContents,
        bookmark:EbookBookmark
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
      selectTab(tab){
          this.currentTab=tab
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
.slide-content-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 300;
  display: flex;
  .content {
    flex: 0 0 85%;
    width: 85%;
    height: 100%;
    .content-page-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
      .content-page {
          flex: 1;
          width: 100%;
          overflow: hidden;
      }
      .content-page-tab {
          display: flex;
          flex: 0 0 px2rem(48);
          width: 100%;
          height: px2rem(48);
          .content-page-tab-item{
              flex: 1;
              font-size: px2rem(12);
              @include center;
          }
      }
    }
    .content-empty{
      width: 100%;
      height: 100%;
      @include center
    }
  }
  .content-bg {
      flex: 0 0 15%;
      width: 15%;
      height: 100%;
  }
}
</style>