import Vue from 'vue'
import VueI18N from 'vue-i18n'
import en from './en'
import cn from './cn'
import {
    getLocale,
    saveLocale
} from '../utils/localStorage'

Vue.use(VueI18N)

const messages = {
    en,
    cn
}

let locale = getLocale() //创建默认语言
if (!locale) {
    locale = 'cn'
    saveLocale(locale)
}

const i18n = new VueI18N({
    locale, //当前对象的语言
    messages //语言对应的文本
})

export default i18n;