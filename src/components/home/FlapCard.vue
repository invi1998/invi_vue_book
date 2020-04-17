<!--  -->
<template>
  <div class="flap-card-wrapper" v-show="flapCardVisible">
    <div
      class="flap-card-bg"
      :class="{'animation':runFlapCardAnimation}"
      v-show="runFlapCardAnimation"
    >
      <div
        class="flap-card"
        v-for="(item,index) in flapCardList"
        :key="index"
        :style="{zIndex:item.zIndex}"
      >
        <div class="flap-card-circle">
          <div
            class="flap-card-semi-sircle flap-card-semi-sircle-left"
            :style="semiCrcleStyle(item,'left')"
            ref="left"
          ></div>
          <div
            class="flap-card-semi-sircle flap-card-semi-sircle-right"
            :style="semiCrcleStyle(item,'right')"
            ref="right"
          ></div>
        </div>
      </div>
      <div class="point-line-wrapper">
        <div
          class="point"
          :class="{'animation':runPointAnimation}"
          v-for="(item,index) in pointList"
          :key="index"
        ></div>
      </div>
    </div>
    <div
      class="book-card"
      :class="{'animation':runBookCardAnimation}"
      v-show="runBookCardAnimation"
    >
      <div class="book-card-wrapper">
        <div class="img-wrapper">
          <img class="img" :src="data?data.cover:''" />
        </div>
        <div class="content-wrapper">
          <div class="content-title">{{data?data.title:''}}</div>
          <div class="content-author sub-title-medium">{{data?tata.author:''}}</div>
          <div class="content-category">{{categoryText()}}</div>
        </div>
        <div class="read-btn" @click.stop="showBookDetail(data)">{{$t('home.readNow')}}</div>
      </div>
    </div>
    <div class="close-btn-wrapper">
      <div class="icon-iclose" @click="close"></div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { storeHomeMixin } from "../../utils/mixin";
import { flapCardList, categoryText } from "../../utils/store";
export default {
  mixins: [storeHomeMixin],
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    data: Object
  },
  data() {
    //这里存放数据
    return {
      flapCardList,
      front: 0,
      back: 1,
      intervalTime: 20,
      runFlapCardAnimation: false,
      pointList: null,
      runPointAnimation: false,
      runBookCardAnimation: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    flapCardVisible(v) {
      if (v) {
        this.runAnimation();
      }
    }
  },
  //方法集合
  methods: {
    close() {
      this.setFlapCardVisible(false);
      this.stopAnimation();
    },
    semiCrcleStyle(item, dir) {
      return {
        backgroundColor: `rgb(${item.r},${item.g},${item.b})`,
        backgroundSize: item.backgroundSize,
        backgroundImage: dir === "left" ? item.imgLeft : item.imgRight
      };
    },
    rotate(index, type) {
      const item = this.flapCardList[index];
      let dom;
      if (type === "front") {
        dom = this.$refs.right[index];
      } else {
        dom = this.$refs.left[index];
      }
      dom.style.transform = `rotateY(${item.rotateDegree}deg)`;
      dom.style.backgroundColor = `rgb(${item.r},${item._g},${item.b})`;
    },
    flapCardRotate() {
      const frontFlapCard = this.flapCardList[this.front];
      const backFlapCard = this.flapCardList[this.back];
      frontFlapCard.rotateDegree += 10;
      frontFlapCard._g -= 5;
      backFlapCard.rotateDegree -= 10;
      if (backFlapCard.rotateDegree < 90) {
        backFlapCard._g += 5;
      }

      if (
        frontFlapCard.rotateDegree === 90 &&
        backFlapCard.rotateDegree === 90
      ) {
        backFlapCard.zIndex += 2;
      }
      this.rotate(this.front, "front");
      this.rotate(this.back, "back");
      if (
        frontFlapCard.rotateDegree === 180 &&
        backFlapCard.rotateDegree === 0
      ) {
        this.next();
      }
    },
    next() {
      const frontFlapCard = this.flapCardList[this.front];
      const backFlapCard = this.flapCardList[this.back];
      frontFlapCard.rotateDegree = 0;
      backFlapCard.rotateDegree = 0;
      frontFlapCard._g = frontFlapCard.g;
      backFlapCard._g = backFlapCard.g;
      this.rotate(this.front, "front");
      this.rotate(this.back, "back");
      this.front++;
      this.back++;
      const len = this.flapCardList.length;
      if (this.front >= len) {
        this.front = 0;
      }
      if (this.back >= len) {
        this.back = 0;
      }
      //zIndex动态变化
      //100->96
      //99->100
      //98-99
      //97->98
      //96->97
      this.flapCardList.forEach((item, index) => {
        item.zIndex = 100 - ((index - this.front + len) % len);
      });
      this.prepare();
    },
    prepare() {
      const backFlapCard = this.flapCardList[this.back];
      backFlapCard.rotateDegree = 180;
      backFlapCard._g = backFlapCard.g - 5 * 9;
      this.rotate(this.back, "back");
    },
    startFlapCardAnimation() {
      this.prepare();
      this.task = setInterval(() => {
        this.flapCardRotate();
      }, this.intervalTime);
    },
    startPointAnimation() {
      this.runPointAnimation = true;
    },
    reset() {
      this.front = 0;
      this.back = 1;
      this.flapCardList.forEach((item, index) => {
        item.zIndex = 100 - index;
        item._g = item.g;
        item.rotateDegree = 0;
        this.rotate(index, "front");
        this.rotate(index, "back");
      });
      this.runBookCardAnimation=false
      this.runFlapCardAnimation =false
      this.runPointAnimation = false
    },
    stopAnimation() {
      this.runFlapCardAnimation = false;
      if (this.task) {
        clearInterval(this.task);
      }
      if(this.timeout){
        clearTimeout(this.timeout)
      }
      if(this.timeout2){
        clearTimeout(this.timeout2)
      }
      this.reset();
    },
    runAnimation() {
      this.runFlapCardAnimation = true;
      this.timeout = setTimeout(() => {
        this.startFlapCardAnimation();
        this.startPointAnimation();
      }, 500);
      this.timeout2 = setTimeout(() => {
        this.stopAnimation();
        this.runBookCardAnimation = true;
      }, 3500);
    },
    categoryText() {
      if (this.data) {
        return categoryText(this.data.catagory, this);
      } else {
        return "";
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.pointList = [];
    for (let i = 0; i < 18; i++) {
      this.pointList.push(`point${i}`);
    }
  },
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
@import "../../assets/styles/flapCard.scss";
.flap-card-wrapper {
  @include absCenter;
  height: 100%;
  width: 100%;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.6);
  @include center;
  .close-btn-wrapper {
    position: absolute;
    left: 0;
    bottom: px2rem(30);
    z-index: 1100;
    width: 100%;
    @include center;
    .icon-iclose {
      width: px2rem(45);
      height: px2rem(45);
      font-size: px2rem(25);
      border-radius: 50%;
      background: #333;
      color: white;
      @include center;
    }
  }
  .flap-card-bg {
    position: relative;
    height: px2rem(64);
    width: px2rem(64);
    border-radius: px2rem(10);
    background: white;
    transform: scale(0);
    opacity: 0;
    &.animation {
      animation: flapCardMove 0.5s ease-in-out both;
    }
    @keyframes flapCardMove {
      0% {
        transform: scale(0);
        opacity: 0;
      }
      50% {
        transform: scale(1.4);
        opacity: 1;
      }
      75% {
        transform: scale(0.85);
        opacity: 1;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
    .flap-card {
      width: px2rem(48);
      height: px2rem(48);
      @include absCenter;
      .flap-card-circle {
        display: flex;
        width: 100%;
        height: 100%;
        .flap-card-semi-sircle {
          flex: 0 0 50%;
          width: 50%;
          height: 100%;
          background: orangered;
          background-repeat: no-repeat;
          backface-visibility: hidden;
        }
        .flap-card-semi-sircle-left {
          border-radius: px2rem(24) 0 0 px2rem(24);
          background-position: center right;
          transform-origin: right;
        }
        .flap-card-semi-sircle-right {
          border-radius: 0 px2rem(24) px2rem(24) 0;
          background-position: center left;
          transform-origin: left;
        }
      }
    }
    .point-line-wrapper {
      z-index: 1500;
      @include absCenter;
      .point {
        border-radius: 50%;
        @include absCenter;
        &.animation {
          //scss循环
          @for $i from 1 to length($moves) {
            &:nth-child(#{$i}) {
              @include move($i);
            }
          }
        }
      }
    }
  }
  .book-card {
    position: absolute;
    width: 65%;
    height: 70%;
    max-width: px2rem(400);
    box-sizing: border-box;
    border-radius: px2rem(20);
    background: white;
    &.animation {
      animation: scale 0.3s ease-in both;
      @keyframes scale {
        0% {
          transform: scale(0);
          opacity: 0;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
    }
    .book-card-wrapper {
      width: 100%;
      height: 100%;
      @include columnTop;
      .img-wrapper {
        width: 100%;
        margin-top: px2rem(20);
        @include center;
        .img {
          width: px2rem(90);
          height: px2rem(130);
        }
      }
      .content-wrapper {
        padding: 0 px2rem(20);
        margin-top: px2rem(20);
        .content-title {
          color: #333;
          font-weight: bold;
          font-size: px2rem(18);
          line-height: px2rem(20);
          max-height: px2rem(40);
          text-align: center;
          @include ellipsis2(2);
        }
        .content-author {
          margin-top: px2rem(10);
          text-align: center;
        }
        .content-category {
          color: #999;
          font-size: px2rem(14);
          margin-top: px2rem(10);
          text-align: center;
        }
      }
      .read-btn {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 1100;
        width: 100%;
        border-radius: 0 0 px2rem(20) px2rem(20);
        padding: px2rem(15) 0;
        text-align: center;
        color: white;
        font-size: px2rem(14);
        background: $color-blue;
      }
    }
  }
}
</style>