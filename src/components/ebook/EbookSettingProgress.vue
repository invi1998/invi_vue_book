<!--  -->
<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible === 2">
      <div class="setting-progress">
        <div class="read-time-wrapper">
          <span class="read-time-text">{{getReadTimeText()}}</span>
          <span class="icon-iforward"></span>
        </div>
        <div class="progress-wrapper">
          <div class="progress-icon-wrapper" @click="preSection()">
            <span class="icon-iback"></span>
          </div>
          <input
            class="progress"
            type="range"
            max="100"
            min="0"
            step="1"
            @input="onProgressInput($event.target.value)"
            @change="onProgressChange($event.target.value)"
            :value="progress"
            :disabled="!bookAvailable"
            ref="progress"
          />
          <div class="progress-icon-wrapper" @click="nextSection()">
            <span class="icon-iforward"></span>
          </div>
        </div>
        <div class="text-wrapper">
          <span class="progress-section-text">{{getSectionName}}-</span>
          <span class="progress-text">({{bookAvailable ? progress + '%' : $t('book.loading')}})</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { ebookMixin } from "../../utils/mixin"; 
export default {
  mixins: [ebookMixin],
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {
    // getSectionName() {
    //   // if(this.section){
    //   //   const sectionInfo = this.currentBook.section(this.section)
    //   //   if(sectionInfo && sectionInfo.href && this.currentBook &&this.currentBook.navigation){
    //   //     return this.currentBook.navigation.get(sectionInfo.href).label
    //   //   }
    //   // }
    //   // return ''
    //   return this.section ? this.navigation[this.section].label:''
    // }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //拖动进度条过程中调用的方法
    onProgressInput(progress) {
      this.setProgress(progress).then(() => {
        this.updateProgressBG();
      });
    },
    //展示当前进度所在的页面
    displayProgress() {
      //通过传入百分比参数到epub电子书的api获取电子书页面定位
      const cfi = this.currentBook.locations.cfiFromPercentage(this.progress / 100)
      this.display(cfi)
    },
    //拖动进度条完成时调用的方法
    onProgressChange(progress) {
      this.setProgress(progress).then(() => {
        this.displayProgress();
        this.updateProgressBG();
      });
    },
    //更新进度条背景色样式
    updateProgressBG() {
      //获取进度条的dom，然后设置它的背景样式
      this.$refs.progress.style.setProperty(
        "background-size",
        `${this.progress}%  100%`,
        "important"
      );
    },
    //跳转到上一章
    prevSection() {
      if (this.section > 0 && this.bookAvailable) {
        this.setSection(this.section - 1).then(() => {
          this.displaySection();
        });
      }
    },
    //跳转到下一章
    nextSection() {
      if (
        this.section < this.currentBook.spine.length - 1 &&
        this.bookAvailable
      ) {
        this.setSection(this.section + 1).then(() => {
          this.displaySection();
        });
      }
    },
    //展示章节
    displaySection() {
      const sectionInfo = this.currentBook.section(this.section);
      if (sectionInfo && sectionInfo.href) {
        this.display(sectionInfo.href)
      }
    },

  },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {
      this.updateProgressBG();
    }, //生命周期 - 更新之后
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
  .setting-progress {
    position: relative;
    width: 100%;
    height: 100%;
    .read-time-wrapper {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: px2rem(40);
      @include center;
      font-size: px2rem(12);
    }
    .progress-wrapper {
      width: 100%;
      height: 100%;
      @include center;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .progress {
        flex: 1;
        width: 100%;
        -webkit-appearance: none;
        height: px2rem(2);
        margin: 0 px2rem(10);
        &:focus {
          outline: none;
        }
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: px2rem(20);
          width: px2rem(20);
          border-radius: 50%;
          background: #ceced0;
          box-shadow: 0 px2rem(4) px2rem(6) 0 rgba(0, 0, 0, 0.15);
          border: none;
        }
      }
      .progress-icon-wrapper {
        flex: 0 0 px2rem(22);
        font-size: px2rem(22);
        @include center;
      }
    }
    .text-wrapper {
      position: absolute;
      left: 0;
      bottom: px2rem(7);
      width: 100%;
      font-size: px2rem(12);
      text-align: center;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      @include center;
      .progress-section-text {
        line-height: px2rem(15);
        @include ellipsis;
      }
      .progress-text {
      }
    }
  }
}
</style>