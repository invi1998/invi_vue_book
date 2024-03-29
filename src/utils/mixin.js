// 利用vuex和vue的mixin实现组件间的解耦和复用

import {
    mapGetters,
    mapActions
} from 'vuex'
import {
    themeList,
    addCss,
    removeAllCss,
    getReadTimeByMinute
} from '../utils/book'
import {
    saveLocation,
    getBookmark
} from '../utils/localStorage'

export const ebookMixin = {
    computed: {
        ...mapGetters([
            'fileName',
            'menuVisible',
            'settingVisible',
            'defaultFontSize',
            'defaultFontFamily',
            'fontFamilyVisible',
            'defaultTheme',
            'bookAvailable',
            'progress',
            'section',
            'isPaginating',
            'currentBook',
            'navigation',
            'cover',
            'metadata',
            'paginate',
            'pagelist',
            'offsetY',
            'isBookmark'
        ]),
        themeList() {
            return themeList(this);
        },
        getSectionName() {
            return this.section ? this.navigation[this.section].label : ''
        }
    },
    methods: {
        ...mapActions([
            'setMenuVisible',
            'setFileName',
            'setSettingVisible',
            'setDefaultFontSize',
            'setDefaultFontFamily',
            'setFontFamilyVisible',
            'setDefaultTheme',
            'setBookAvailable',
            'setProgress',
            'setSection',
            'setIsPaginating',
            'setCurrentBook',
            'setNavigation',
            'setCover',
            'setMetadata',
            'setPaginate',
            'setPagelist',
            'setOffsetY',
            'setIsBookmark'
        ]),
        //设置全局样式
        initGlobalStyle() {
            removeAllCss();
            switch (this.defaultTheme) {
                case "Default":
                    addCss(process.env.VUE_APP_RES_URL + "/theme/theme_default.css");
                    break;
                case "Eye":
                    addCss(process.env.VUE_APP_RES_URL + "/theme/theme_eye.css");
                    break;
                case "Gold":
                    addCss(process.env.VUE_APP_RES_URL + "/theme/theme_gold.css");
                    break;
                case "Night":
                    addCss(process.env.VUE_APP_RES_URL + "/theme/theme_night.css");
                    break;
                case "WaterRed":
                    addCss(process.env.VUE_APP_RES_URL + "/theme/theme_waterRed.css");
                    break;
                case "Jade":
                    addCss(process.env.VUE_APP_RES_URL + "/theme/theme_jade.css");
                    break;
                default:
                    addCss(process.env.VUE_APP_RES_URL + "/theme/theme_default.css");
            }
        },
        //刷新緩存
        refreshLocation() {
            //获取电子书的书页信息
            const currentLocation = this.currentBook.rendition.currentLocation()
            if (currentLocation && currentLocation.start.index) {
                this.setSection(currentLocation.start.index)
                const startCfi = currentLocation.start.cfi
                //获取进度百分比
                const progress = this.currentBook.locations.percentageFromCfi(currentLocation.start.cfi)
                this.setProgress(Math.floor(progress * 100))
                this.setSection(currentLocation.start.index)
                saveLocation(this.fileName, startCfi)
                const bookmark = getBookmark(this.fileName)
                if (bookmark) {
                    if (bookmark.some(item => item.cfi === startCfi)) {
                        this.setIsBookmark(true)
                    } else {
                        this.setIsBookmark(false)
                    }
                } else {
                    this.setIsBookmark(false)
                }
                saveLocation(this.fileName, startCfi)
                if (this.pagelist) {
                    const totalPage = this.pagelist.length
                    const currentPage = currentLocation.start.location
                    if (currentPage && currentPage > 0) {
                        this.setPaginate(currentPage + ' / ' + totalPage)
                    } else {
                        this.setPaginate('')
                    }
                } else {
                    this.setPaginate('')
                }
            }
        },

        display(target, cb) {
            if (target) {
                this.currentBook.rendition.display(target).then(() => {
                    this.refreshLocation()
                    if (cb) {
                        cb()
                    }
                })
            } else {
                this.currentBook.rendition.display().then(() => {
                    this.refreshLocation()
                    if (cb) {
                        cb()
                    }
                })
            }
        },


        //掩藏菜单栏和标题栏
        hideTitleAndMenu() {
            // this.$store.dispatch('setMenuVisible',false);
            this.setMenuVisible(false);
            this.setSettingVisible(-1);
            this.setFontFamilyVisible(false);
        },

        //获取阅读时间
        getReadTimeText() {
            return this.$t('book.haveRead').replace('$1', getReadTimeByMinute(this.fileName))
        },




    },
}

export const storeHomeMixin = {
    computed: {
        ...mapGetters([
            'offsetY',
            'hotSearchOffsetY',
            'flapCardVisible'
        ])
    },
    methods: {
        ...mapActions([
            'setOffsetY',
            'setHotSearchOffsetY',
            'setFlapCardVisible'
        ]),
        showBookDetail(book){
            console.log(book)
        }
    }
}