<!--  -->
<template>
  <div class="ebook-reader">
    <div id="read"></div>
    <div
      class="ebook-reader-mask"
      @click="onMaskClick"
      @touchmove="move"
      @touchend="moveEnd"
      @mousedown.left="onMouseEnter"
      @mousemove="onMouseMove"
      @mouseup.left="onMouseEnd"
    ></div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// //使用mapgetters快速调用vuex里的对象
// import { mapGetters } from "vuex";

import { ebookMixin } from "../../utils/mixin";

import Epub from "epubjs";
import {
  getFontFamily,
  saveFontFamily,
  getFontSize,
  saveFontSize,
  getTheme,
  saveTheme,
  getLocation
} from "../../utils/localStorage";
import { flatten } from "../../utils/book";
global.ePub = Epub;

export default {
  //使用mapgetters和mapActions快速调用vuex里的对象
  mixins: [ebookMixin],

  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {
    // ...mapGetters(["fileName",'menuVisible'])
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //电脑端鼠标手势适配
    //1-鼠标进入点击状态
    //2-鼠标进入点击状态后的移动状态
    //3-鼠标从移动状态松手
    //4-鼠标还原
    onMouseEnter(e) {
      this.mouseState = 1;
      this.mouseStartTime = e.timeStamp
      e.preventDefault();
      e.stopPropagation();
    },
    onMouseMove(e) {
      if (this.mouseState === 1) {
        this.mouseState = 2;
      } else if (this.mouseState === 2) {
        let offsetY = 0;
        if (this.firstOffsetY) {
          offsetY = e.clientY - this.firstOffsetY;
          this.setOffsetY(offsetY);
        } else {
          this.firstOffsetY = e.clientY;
        }
      }
      e.preventDefault();
      e.stopPropagation();
    },
    onMouseEnd(e) {
      if (this.mouseState === 2) {
        //还原偏移量
        this.setOffsetY(0);
        this.firstOffsetY = null;
        this.mouseState=3
      }else{
        this.mouseState=4
      }
      const time = e.timeStamp - this.mouseStartTime
      if(time<200){
        this.mouseState=4
      }
      e.preventDefault();
      e.stopPropagation();
    },

    //上一页
    prevPage() {
      if (this.rendition) {
        this.rendition.prev().then(() => {
          this.refreshLocation();
        });
        this.hideTitleAndMenu();
      }
    },

    //下一页
    nextPage() {
      if (this.rendition) {
        this.rendition.next().then(() => {
          this.refreshLocation();
        });
        this.hideTitleAndMenu();
      }
    },

    //标题栏和菜单栏点击显示或掩藏
    toggleTiltleAndMenu() {
      // this.$store.dispatch('setMenuVisible',!this.menuVisible);
      if (this.menuVisible) {
        this.setSettingVisible(-1);
        this.setFontFamilyVisible(false);
      }
      this.setMenuVisible(!this.menuVisible);
    },

    //电子书初始化渲染过程
    initRendition() {
      this.rendition = this.book.renderTo("read", {
        width: window.innerWidth,
        height: window.innerHeight,
        method: "default"
      });
      const location = getLocation(this.fileName);
      this.display(location, () => {
        this.initTheme();
        this.initFontSize();
        this.initFontFamily();
        this.initGlobalStyle();
        this.refreshLocation();
      });
      this.rendition.hooks.content.register(contents => {
        Promise.all([
          contents.addStylesheet(
            process.env.VUE_APP_RES_URL + "/fonts/daysOne.css"
          ),
          contents.addStylesheet(
            process.env.VUE_APP_RES_URL + "/fonts/cabin.css"
          ),
          contents.addStylesheet(
            process.env.VUE_APP_RES_URL + "/fonts/montserrat.css"
          ),
          contents.addStylesheet(
            process.env.VUE_APP_RES_URL + "/fonts/tangerine.css"
          )
        ]).then(() => {});
      });
    },

    //电子书翻页手势解析
    initGesture() {
      this.rendition.on("touchstart", event => {
        this.touchStartX = event.changedTouches[0].clientX;
        this.touchStartTime = event.timeStamp;
      });
      this.rendition.on("touchend", event => {
        const offsetX = event.changedTouches[0].clientX - this.touchStartX;

        const time = event.timeStamp - this.touchStartTime;
        if (time < 500 && offsetX > 40) {
          this.prevPage();
        } else if (time < 500 && offsetX < -40) {
          this.nextPage();
        } else {
          this.toggleTiltleAndMenu();
        }
        event.preventDefault(); //禁止事件默认方法调用
        event.stopPropagation(); //禁用事件传播
      });
    },

    //初始化主题
    initTheme() {
      let defaultTheme = getTheme(this.fileName);
      if (!defaultTheme) {
        defaultTheme = this.themeList[0].name;
        saveTheme(this.fileName, defaultTheme);
      }
      this.setDefaultTheme(defaultTheme);
      this.themeList.forEach(theme => {
        // 主题注册
        this.rendition.themes.register(theme.name, theme.style);
      });
      // 注册完成，从localstorage缓存中选择一个默认样式
      this.rendition.themes.select(defaultTheme);
    },

    //初始化电子书字号设置
    initFontSize() {
      //从localstorage中获取或者存入字体大小缓存
      let fontSize = getFontSize(this.fileName);
      if (!fontSize) {
        saveFontSize(this.fileName, this.defaultFontSize);
      } else {
        this.rendition.themes.fontSize(fontSize);
        this.setDefaultFontSize(fontSize);
      }
    },

    //初始化电子书渲染字体
    initFontFamily() {
      //从localstorage中获取或者存入字体缓存
      let font = getFontFamily(this.fileName);
      if (!font) {
        saveFontFamily(this.fileName, this.defaultFontFamily);
      } else {
        this.rendition.themes.font(font);
        this.setDefaultFontFamily(font);
      }
    },

    //parseBook(获取图书封面连接，以及图书的基本信息)
    parseBook() {
      this.book.loaded.cover.then(cover => {
        this.book.archive.createUrl(cover).then(url => {
          this.setCover(url);
        });
      });
      this.book.loaded.metadata.then(metadata => {
        this.setMetadata(metadata);
      });
      this.book.loaded.navigation.then(nav => {
        const navItem = flatten(nav.toc);

        function find(item, level = 0) {
          return !item.parent
            ? level
            : find(
                navItem.filter(parentItem => parentItem.id === item.parent)[0],
                ++level
              );
        }
        navItem.forEach(item => {
          item.level = find(item);
        });
        console.log(navItem);
        this.setNavigation(navItem);
      });
    },

    //解析电子书
    initEpub() {
      const url =
        process.env.VUE_APP_RES_URL + "/epub/" + this.fileName + ".epub";
      this.book = new Epub(url);
      this.setCurrentBook(this.book);
      this.initRendition();
      this.initGesture();
      this.parseBook();
      //分页解析
      this.book.ready
        .then(() => {
          return this.book.locations.generate(
            750 * (window.innerWidth / 350) * (getFontSize(this.fileName) / 16)
          );
        })
        .then((locations) => {
          locations.forEach(item=>{
            this.navigation.forEach(nav=>{
              nav.pagelist = []
            })
            const loc = item.match(/\[(.*)\]!/)[1]
            this.navigation.forEach(nav=>{
              if(nav.href){
                const href = nav.href.match(/^(.*)\.html$/)[1]
                if(href===loc){
                  nav.pagelist.push(item)
                }
              }
            })
            let currentPage = 1
            this.navigation.forEach( (nav, index)=>{
              if (index === 0){
                nav.page = 1
              } else{
                nav.page=currentPage
              }
              currentPage +=nav.pagelist.length +1
            })
          })
          this.setPagelist(locations)
          this.setBookAvailable(true);
          this.refreshLocation();
        });
    },

    onMaskClick(e) {
      if(this.mouseState&&(this.mouseState===2||this.mouseState===3)){
        return
      }
      const offsetX = e.offsetX;
      const width = window.innerWidth;
      if (offsetX > 0 && offsetX < width * 0.3) {
        this.prevPage();
      } else if (offsetX > 0 && offsetX > width * 0.7) {
        this.nextPage();
      } else {
        this.toggleTiltleAndMenu();
      }
    },

    move(e) {
      let offsetY = 0;
      if (this.firstOffsetY) {
        offsetY = e.changedTouches[0].clientY - this.firstOffsetY;
        this.setOffsetY(offsetY);
      } else {
        this.firstOffsetY = e.changedTouches[0].clientY;
      }
      e.preventDefault(); //禁止调用默认方法
      e.stopPropagation(); //禁止传播
    },

    moveEnd() {
      //还原偏移量
      this.setOffsetY(0);
      this.firstOffsetY = null;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.setFileName(this.$route.params.fileName.split("|").join("/")).then(
      () => {
        this.initEpub();
      }
    );
    // this.$store
    //   .dispatch("setFileName", this.$route.params.fileName.split("|").join("/"))
    //   .then(() => {
    //     this.initEpub();
    //   });
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
.ebook-reader {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .read {
  }
  .ebook-reader-mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 150;
    width: 100%;
    height: 100%;
    background: transparent;
  }
}
</style>