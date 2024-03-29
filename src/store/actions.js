const actions = {
    setFileName: ({
        commit
    }, newFileName) => {
        return commit('SET_FILENAME', newFileName)
    },
    setMenuVisible: ({
        commit
    }, newMenuVisible) => {
        return commit('SET_MENUVISIBLE', newMenuVisible)
    },
    setSettingVisible: ({
        commit
    }, newsettingVisible) => {
        return commit('SET_SETTINGVISIBLE', newsettingVisible)
    },
    setDefaultFontSize: ({
        commit
    }, DefaultFontSize) => {
        return commit('SET_DEFAULTFONTSIZE', DefaultFontSize)
    },
    setFontFamilyVisible: ({
        commit
    }, visible) => {
        return commit('SET_FONT_FAMILY_VISIBLE', visible)
    },
    setDefaultFontFamily: ({
        commit
    }, font) => {
        return commit('SET_DEFAULT_FONT_FAMILY', font)
    },
    setDefaultTheme: ({
        commit
    }, theme) => {
        return commit('SET_DEFAULT_THEME', theme)
    },
    setBookAvailable: ({
        commit
    }, bookAvailable) => {
        return commit('SET_BOOK_AVAILABLE', bookAvailable)
    },
    setProgress: ({
        commit
    }, progress) => {
        return commit('SET_PROGRESS', progress)
    },
    setSection: ({
        commit
    }, section) => {
        return commit('SET_SECTION', section)
    },
    setIsPaginating: ({
        commit
    }, isPaginating) => {
        return commit('SET_IS_PAGINATING', isPaginating)
    },
    setCurrentBook: ({
        commit
    }, book) => {
        return commit('SET_CURRENTBOOK', book)
    },
    setNavigation: ({
        commit
    }, navigation) => {
        return commit('SET_NAVIGATION', navigation)
    },
    setCover: ({
        commit
    }, cover) => {
        return commit('SET_COVER', cover)
    },
    setMetadata: ({
        commit
    }, metadata) => {
        return commit('SET_METADATA', metadata)
    },
    setPaginate: ({
        commit
    }, paginate) => {
        return commit('SET_PAGINATE', paginate)
    },
    setPagelist: ({
        commit
    }, pagelist) => {
        return commit('SET_PAGELIST', pagelist)
    },
    setIsBookmark({
        commit
    }, isBookmark) {
        return commit('SET_IS_BOOKMARK', isBookmark)
    },
    setOffsetY({
        commit
    }, offsetY) {
        return commit('SET_OFFSETY', offsetY)
    },
    setHotSearchOffsetY({
        commit
    }, offsetY) {
        return commit('SET_HOT_SEARCH_OFFSETY', offsetY)
    },
    setFlapCardVisible({
        commit
    }, visible) {
        return commit('SET_FLAP_CARD_VISIBLE', visible)
    }
}

export default actions;