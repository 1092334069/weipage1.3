class AjaxOnce {
    constructor() {
        this.urlList = []
    }
    ajax(option) {
        if (option && option.url) {
            if (this.checkNoHasUrl(option.url)) {
                this.pushUrl(option.url)
                const resOption = this.parseAjaxOption(option)
                $.ajax(resOption)
            }
        }
    }
    pushUrl(url) {
        this.urlList.push(url)
    }
    pullUrl(url) {
        for (let i = this.urlList.length - 1; i >= 0; i--) {
            if (url === this.urlList[i]) {
                this.urlList.splice(i, 1)
            }
        }
    }
    checkNoHasUrl(url) {
        for (let i = this.urlList.length - 1; i >= 0; i--) {
            if (url === this.urlList[i]) {
                return false
            }
        }
        return true
    }
    parseAjaxOption(option) {
        const _this = this
        const res = {}
        for (const key in option) {
            res[key] = option[key]
        }
        if (res.complete) {
            res.complete = function () {
                option.complete()
                _this.pullUrl(option.url)
            }
        } else {
            res.complete = function () {
                _this.pullUrl(option.url)
            }
        }
        return res
    }
}

const ajaxOnce = new AjaxOnce()

export { ajaxOnce }
