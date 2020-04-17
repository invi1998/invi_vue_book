<!--  -->
<template>
  <div>
    <div
      class="search-bar"
      :class="{'hide-title': !titleVisible , 'hide-shadow': !shadowVisible}"
      ref="searchBar"
    >
      <transition name="title-move">
        <div class="search-bar-title-wrapper" v-show="titleVisible">
          <div class="title-text-wrapper">
            <span class="title-text title">{{$t('home.title')}}</span>
          </div>
          <div class="title-icon-shake-wrapper" @click="showFlapCard">
            <span class="icon-ishake icon"></span>
          </div>
        </div>
      </transition>
      <div class="title-icon-back-wrapper" :class="{'hide-title': !titleVisible}" @click="back">
        <span class="icon-iback icon"></span>
      </div>
      <div class="search-bar-input-wrapper" :class="{'hide-title':!titleVisible}">
        <div class="search-bar-blank" :class="{'hide-title': !titleVisible}"></div>
        <div class="search-bar-input">
          <span class="icon-isearch icon"></span>
          <input
            type="text"
            class="input"
            :placeholder="$t('home.hint')"
            v-model="searchText"
            @click="showHotSearch"
          />
        </div>
      </div>
    </div>
    <hot-search-list v-show="hotSearchVisible" ref="hotSearchList"></hot-search-list>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { storeHomeMixin } from "../../utils/mixin";
import hotSearchList from "../../components/home/HotSearchList";
// import scroll from "../common/Scroll";
export default {
  mixins: [storeHomeMixin],
  //import引入的组件需要注入到对象中才能使用
  components: {
    // scroll,
    hotSearchList
  },
  data() {
    //这里存放数据
    return {
      searchText: "",
      titleVisible: true,
      shadowVisible: false,
      transitionDelay: ".2s",
      hotSearchVisible: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    offsetY(offsetY) {
      //向下滚动页面
      if (offsetY > 0) {
        this.hideTitle();
        this.showShadow();
        this.setDelayZ();
        this.$refs.searchBar.style.transitionDelay = `${this.transitionDelay}`;
      } else {
        this.showTitle();
        this.hideShadow();
        this.setDelayF();
        this.$refs.searchBar.style.transitionDelay = `${this.transitionDelay}`;
      }
    },
    hotSearchOffsetY(offsetY) {
      if (offsetY > 0) {
        this.showShadow();
      } else {
        this.hideShadow();
      }
    }
  },
  //方法集合
  methods: {
    showFlapCard(){
      this.setFlapCardVisible(true)
    },
    back() {
      if (this.offsetY > 0) {
        this.showShadow();
      } else {
        this.hideShadow();
      }
      this.hideHotSearch();
    },
    hideHotSearch() {
      this.hotSearchVisible = false;
      if (this.offsetY > 0) {
        this.hideTitle();
        this.showShadow();
      } else {
        this.showTitle();
        this.hideShadow();
      }
    },
    showHotSearch() {
      this.hideTitle();
      this.hideShadow();
      this.hotSearchVisible = true;
      this.$nextTick(() => {
        //等待dom加载完毕再进行reset操作
        this.$refs.hotSearchList.reset();
      });
    },
    hideTitle() {
      this.titleVisible = false;
    },
    showTitle() {
      this.titleVisible = true;
    },
    hideShadow() {
      this.shadowVisible = false;
    },
    showShadow() {
      this.shadowVisible = true;
    },
    setDelayF() {
      this.transitionDelay = "-.5s";
    },
    setDelayZ() {
      this.transitionDelay = ".5s";
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
.search-bar {
  position: relative;
  z-index: 150;
  width: 100%;
  height: px2rem(94);
  transition: box-shadow $animationTime $animationType;
  //   transition-delay:`${'transitionDelay'}`;
  box-shadow: 0 px2rem(3) px2rem(10) 0 rgba(75, 75, 75, 0.2);
  &.hide-title {
    height: px2rem(52);
  }
  &.hide-shadow {
    box-shadow: none;
  }
  .search-bar-title-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: px2rem(42);
    .title-text-wrapper {
      width: 100%;
      height: px2rem(42);
      @include center;
    }
    .title-icon-shake-wrapper {
      position: absolute;
      right: px2rem(15);
      top: 0;
      height: px2rem(42);
      @include center;
    }
  }
  .title-icon-back-wrapper {
    position: absolute;
    left: px2rem(15);
    top: 0;
    z-index: 200;
    height: px2rem(42);
    @include center;
    transition: height $animationTime $animationType;
    &.hide-title {
      height: px2rem(52);
    }
  }
  .search-bar-input-wrapper {
    position: absolute;
    display: flex;
    left: 0;
    top: px2rem(42);
    height: px2rem(52);
    width: 100%;
    padding: px2rem(10);
    box-sizing: border-box;
    transition: top $animationTime $animationType;
    &.hide-title {
      top: 0;
    }
    .search-bar-blank {
      flex: 0 0 0;
      width: 0;
      transition: all $animationTime $animationType;
      &.hide-title {
        flex: 0 0 px2rem(31);
        width: px2rem(31);
      }
    }
    .search-bar-input {
      flex: 1;
      width: 100%;
      background: #f4f4f4;
      border-radius: px2rem(20);
      padding: px2rem(5) px2rem(15);
      box-sizing: border-box;
      border: px2rem(1) solid #eee;
      @include left;
      .icon-isearch {
        color: #999;
      }
      .input {
        width: 100%;
        height: px2rem(22);
        border: none;
        background: transparent;
        margin-left: px2rem(10);
        font-size: px2rem(12);
        &:focus {
          outline: none;
        }
        &::-webkit-input-placeholder {
          color: #ccc;
        }
      }
    }
  }
}
</style>