<!--  -->
<template>
  <div class="store-home">
    <search-bar></search-bar>
    <flap-card :v-data="random"></flap-card>
    <scroll :top="scrollTop" @onScroll='onScroll' ref="scroll">
      <div>sdfsiuhsidfiuhds</div>
      <div>sdfsiuhsidfiuhds</div>
      <div>sdfsiuhsidfinnnnnnnuhds</div>
      <div>sdfsiuhsidfiuhds</div>
      <div>sdfsiuhsi              dfiuhds</div>
      <div>sdfsiuhsidfiuhds</div>
      <div>sdfsiuhsidfiuhds</div>
      <div>sdfsiuhsidfiuhds</div>
      <div>sdfsiuhsidfiuhds</div>
      <div>sdfsiuhs idfiuhds</div>
      <div>sdfsiuhsidfiuhds</div>
      <div>sdfsiuhsidfiuhds</div>
      <div>sdfsihguhsidfiuhds</div>
      <div>sdfsiuhsidfiuhds</div>
      <div>sdfsggiuhsidfiuhds</div>
      <div>sdfsiuhsidfiuhds</div>
      <div>sdfsiuhsidfiuhds</div>
      <div>sdfgggggggggggggsiuhsidfiuhds</div>
      <div>sdfsiuhsidfiuhds</div>
      <div>sdfsiuhsidfiuhds</div>
      <div>sdfsiuhsidfiuhds</div>
      <div>sdfsiuhsidfiuhds</div>
      <div>sdfsiuhsidfiuhds</div>
      <div>sdfsiuhsidfiuhds</div>
      <div>sdfsiuhsidfiuhds</div>
      <div>sdfsiuhsidfiuhds</div>
      <div>sdfsiuhsidfiuhds</div>
      <div>sdfsiuhsidfiuhds</div>
    </scroll>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import SearchBar from "../../components/home/SearchBar";
import scroll from "../../components/common/Scroll";
import FlapCard from '../../components/home/FlapCard'
import {storeHomeMixin} from '../../utils/mixin'
import {home} from '../../api/store'
export default {
    mixins:[storeHomeMixin],
  //import引入的组件需要注入到对象中才能使用
  components: {
    SearchBar,
    scroll,
    FlapCard
  },
  data() {
    //这里存放数据
    return {
        scrollTop:94,
        random:null
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
      onScroll(offsetY){
          this.setOffsetY(offsetY)
          if(offsetY>0){
              this.scrollTop = 52
          }else{
              this.scrollTop=94
          }
          this.$refs.scroll.refresh()
      }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    home().then((response)=>{
      if(response&&response.status===200){
        const data = response.data
        console.log(data)
        const randomIndex = Math.floor(Math.random()*data.random.length)
        this.random = data.random[randomIndex]
      }
    })
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
.store-home {
  width: 100%;
  height: 100%;
}
</style>