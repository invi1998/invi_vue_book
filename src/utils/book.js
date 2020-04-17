import {getReadTime} from './localStorage'
import {realPx} from './utils'

export const FONT_SIZE_LIST = [{
        fontSize: 12
    },
    {
        fontSize: 14
    },
    {
        fontSize: 16
    },
    {
        fontSize: 18
    },
    {
        fontSize: 20
    },
    {
        fontSize: 22
    },
    {
        fontSize: 24
    },
    {
        fontSize: 26
    }
]

export const FONT_FAMILY = [{
        font: 'Default'
    },
    {
        font: 'Cabin'
    },
    {
        font: 'Days One'
    },
    {
        font: 'Montserrat'
    },
    {
        font: 'Tangerine'
    }
]

export function themeList(vue) {
    return [{
            alias: vue.$t('book.themeDefault'), //样式别名
            name: 'Default',
            style: {
                body: {
                    'color': '#3c3f46',
                    "background": '#ffffff',
                    'padding-top':`${realPx(48)}px !important`,
                    'padding-bottom':`${realPx(48)}px !important`
                }
            }
        },
        {
            alias: vue.$t('book.themeJade'), //样式别名
            name: 'Jade',
            style: {
                body: {
                    'color': '#3c3f46',
                    "background": '#F1E6EC',
                    'padding-top':`${realPx(48)}px !important`,
                    'padding-bottom':`${realPx(48)}px !important`
                }
            }
        },
        {
            alias: vue.$t('book.themeGold'), //样式别名
            name: 'Gold',
            style: {
                body: {
                    'color': '#5c5b56',
                    "background": '#c6c2b6',
                    'padding-top':`${realPx(48)}px !important`,
                    'padding-bottom':`${realPx(48)}px !important`
                }
            }
        },
        {
            alias: vue.$t('book.themeEye'), //样式别名
            name: 'Eye',
            style: {
                body: {
                    'color': '#404c42',
                    "background": '#a9c1a9',
                    'padding-top':`${realPx(48)}px !important`,
                    'padding-bottom':`${realPx(48)}px !important`
                }
            }
        },
        {
            alias: vue.$t('book.themeNight'), //样式别名
            name: 'Night',
            style: {
                body: {
                    'color': '#cecece',
                    "background": '#383838',
                    'padding-top':`${realPx(48)}px !important`,
                    'padding-bottom':`${realPx(48)}px !important`
                }
            }
        },
        {
            alias: vue.$t('book.themeWaterRed'), //样式别名
            name: 'WaterRed',
            style: {
                body: {
                    'color': '#ffffff',
                    "background": '#E17F88',
                    'padding-top':`${realPx(48)}px !important`,
                    'padding-bottom':`${realPx(48)}px !important`
                }
            }
        }
    ]
}

export function addCss(href) {
    // 通过dom创建一个link标签
    const link = document.createElement('link')
    //设置link属性
    link.setAttribute('rel', 'styleSheet')
    link.setAttribute('type', 'text/css')
    link.setAttribute('href', href)
    //通过dom的getElementsByTagName选中到head头部，然后调用api appendChild将设置好的link标签添加到head头部
    document.getElementsByTagName('head')[0].appendChild(link)
}

export function removeCss(href) {
    //通过dom获取所有的link标签
    const links = document.getElementsByTagName('link')
    for (let i = links.length; i >= 0; i--) {
        const link = links[i]
        if (link && link.getAttribute('href') && link.getAttribute('href') === href) {
            link.parentNode.removeChild(link)
        }
    }
}

export function removeAllCss() {
    removeCss(process.env.VUE_APP_RES_URL + '/theme/theme_default.css')
    removeCss(process.env.VUE_APP_RES_URL + '/theme/theme_eye.css')
    removeCss(process.env.VUE_APP_RES_URL + '/theme/theme_night.css')
    removeCss(process.env.VUE_APP_RES_URL + '/theme/theme_gold.css')
    removeCss(process.env.VUE_APP_RES_URL + '/theme/theme_waterRed.css')
    removeCss(process.env.VUE_APP_RES_URL + '/theme/theme_jade.css')
}

export function  getReadTimeByMinute(fileName){
    const readTime = getReadTime(fileName)
    if(!readTime){
      return 0
    }else{
      return Math.ceil(readTime/60)
    }
  }

  //将多维数组扁平化为一维数组
 export function flatten(array) {
    return [].concat(...array.map(item => [].concat(item,...flatten(item.subitems))));
  }