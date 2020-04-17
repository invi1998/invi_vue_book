<!--  -->
<template>
  <div class="ebook-loading">
    <div class="monsterText">
      <div class="sentence1">{{$t('loading.sentence1')}}</div>
      <div class="sentence2">{{$t('loading.sentence2')}}</div>
      <div class="sentence3">{{$t('loading.sentence3')}}</div>
    </div>
    <div class="monster">
      <div class="eye">
        <div class="eyeBall"></div>
      </div>
      <div class="mouth"></div>
    </div>
    <div class="monster blue">
      <div class="eye">
        <div class="eyeBall"></div>
      </div>
      <div class="mouth"></div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      complete: false
    };
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
.ebook-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  .monsterText {
    display: flex;
    flex-direction: column;
    text-align: left;
    color: aliceblue;
    line-height: px2rem(40);
    height: 75%;
    width: 50%;
    // padding: 0 px2rem(15);
    margin-left: px2rem(10);
    .sentence1 {
      flex: 1;
      font-size: px2rem(12);
    //   margin-right: px2rem(5);
    //   margin-top: px2rem(35);
      height: auto;
    //   width: px2rem(14);
    }
    .sentence2 {
      flex: 1;
      font-size: px2rem(12);
    //   margin-right: px2rem(10);
    //   margin-top: px2rem(35);
       height: auto;
    //    width: px2rem(14);
    }
    .sentence3 {
      flex: 1;
      font-size: px2rem(10);
    //   margin-right: px2rem(10);
    //   margin-top: px2rem(40);
       height: auto;
    //    width: px2rem(14);
    }
  }
  .monster {
    z-index: 10;
    height: px2rem(50);
    width: px2rem(50);
    background: #f60754;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: px2rem(10);
    margin-left: px2rem(10);
    box-shadow: 0 px2rem(10) px2rem(10) 0 rgba(0, 0, 0, 0.3);
    position: relative;
    &.blue {
      background: #074177;

      animation: jumpingBlue 0.8s infinite alternate !important;
      animation-delay: 0.5s !important;
      .eyeBall {
        background: #f60754 !important;
      }
      .mouth {
        background: #f60754 !important;
      }
    }
    &::before,
    &::after {
      content: "";
      height: px2rem(5);
      width: px2rem(10);
      background: white;
      display: block;
      border-radius: px2rem(5);
      position: absolute;
      top: px2rem(-5);
    }
    &::after {
      left: 45%;
      transform: rotate(-30deg);
    }
    &::before {
      right: 45%;
      transform: rotate(30deg);
    }
    animation: jumpingRed 0.8s infinite alternate;
    .eye {
      height: 42%;
      width: 42%;
      border-radius: 50%;
      background: white;
      display: flex;
      justify-content: center;
      align-items: center;
      .eyeBall {
        height: 50%;
        width: 50%;
        border-radius: 50%;
        background: #074177;
        animation: eyemove 1s infinite alternate;
      }
    }
    .mouth {
      height: 10%;
      width: px2rem(10);
      margin-top: 30%;
      background: white;
      border-radius: px2rem(3);
    }
  }
  @keyframes jumpingRed {
    50% {
      top: 0;
      box-shadow: 0 px2rem(10) px2rem(10) 0 rgb(224, 97, 109);
    }
    100% {
      top: px2rem(-30);
      box-shadow: 0 px2rem(60) px2rem(50) 0 rgb(224, 97, 109);
    }
  }
  @keyframes jumpingBlue {
    50% {
      top: 0;
      box-shadow: 0 px2rem(10) px2rem(10) 0 rgb(7, 66, 120);
    }
    100% {
      top: px2rem(-30);
      box-shadow: 0 px2rem(60) px2rem(50) 0 rgb(7, 66, 120);
    }
  }
  @keyframes eyemove {
    0%,
    10% {
      transform: translate(-50%);
    }
    90%,
    100% {
      transform: translate(50%);
    }
  }
  .pageLoading {
    background: #074177;
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transition: opacity 0.4s;
    &.complete {
      opacity: 0;
      .monster {
        transform: rotateZ(360deg);
        transition: 0.4s;
      }
    }
    .loading {
      margin-top: px2rem(50);
      background: white;
      height: px2rem(8);
      width: px2rem(200);
      border-radius: px2rem(5);
      display: block;
      overflow: hidden;
      transition: 0.4s;
      .bar {
        background: #db4d6d;
        height: 100%;
        width: 0;
      }
    }
  }
}
</style>