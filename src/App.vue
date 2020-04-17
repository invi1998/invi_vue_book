<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

// import {mapGetters} from 'vuex'

document.addEventListener('DOMContentLoaded',()=>{
  const html = document.querySelector('html')
  let fontSize = window.innerWidth/10
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontSize = fontSize + 'px'
})

// const getters = {
//   a:()=>1,
//   b:()=>2,
//   d:()=>4,
//   c:()=>3
// }

// function fn(keys){
//   const data={}
//   keys.forEach(key=>{
//     if(Object.prototype.hasOwnProperty.call(getters,key)){
//       data[key] = getters[key]
//     }
//   })
//   return data
// } 

export default {
  computed:{
    // ...mapGetters(['test']),
    // ...fn(['a','b','d','c'])
    // // 3点扩展运算符，实现了将对象展开并且合并到新的对象里，这里即是向computed对象里混入一个新的对象test，然后便于使用this.test
  },

  methods:{
  },

  mounted(){
    // this.$store.dispatch('setTest',19).then(()=>{
    //   console.log(this.test) 
    // })
    // console.log(this.a,this.b,this.c)
  }
};
</script>

<style lang='scss' scoped> 
@import './assets/styles/global.scss';
// .text {
//   font-family: "Days One";
//   font-size: px2rem(20);
//   color: rgb(114, 211, 250);
// }
#app{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
