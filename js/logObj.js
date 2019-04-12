!(function () {
    let log = function (target) {
        let result = '';

        if (target) {
            let unknown = []
            let standard = []
            let obj = []
            let fun = []
            let other = []
            for (const key in target) {
                let element = target[key];
                let type = typeof element

                if (element && element === log) {
                    continue
                }

                // console.log(`${key} type is ${type}`)
                if (element === undefined) {
                    unknown.push(key)
                } else if (element === null) {
                    other.push(key)
                } else if (isStandard(type)) {
                    standard.push(key)
                } else if (type === 'function') {
                    fun.push(key)
                } else if (type === 'object') {
                    obj.push(key)
                } else {
                    other.push(key)
                }
            }

            function isStandard(type) {
                return type === 'number' || type === 'string' || type === 'boolean'
            }

            function logKey(array) {
                array.forEach(key => {
                    let value = ''
                    if (key === 'innerText' ||
                        key === 'outerText' ||
                        key === 'innerHTML' ||
                        key === 'outerHTML' ||
                        key === 'textContent') {
                        value = '^_^'
                    } else {
                        value = target[key]
                    }

                    let type = typeof value
                    if (isStandard(type)) {
                        type = "&nbsp;&nbsp;&nbsp;&nbsp;" + type
                    } else {
                        type = ''
                    }

                    if (!target.hasOwnProperty(key)) {
                        type += '&nbsp;&nbsp;false'
                    }

                    let lkey = key.toLowerCase()
                    let style = ''
                    if (lkey.indexOf('width') > -1 ||
                        lkey.indexOf('height') > -1 ||
                        lkey.indexOf('left') > -1 ||
                        lkey.indexOf('top') > -1 ||
                        lkey.indexOf('bottom') > -1 ||
                        lkey.indexOf('right') > -1 ||
                        lkey.indexOf('html') > -1 ||
                        lkey.indexOf('text') > -1 ||
                        lkey.indexOf('inner') > -1 ||
                        lkey.indexOf('outer') > -1 ||
                        lkey.indexOf('name') > -1 ||
                        lkey.indexOf('scroll') > -1
                    ) {
                        style = `style='color:#d00'`
                    } else {
                        style = ''
                    }
                    key = key + " ->" + value + type + "<br>"
                    result += `<span ${style} title='${target}'>${key}</span>`
                });
            }

            let titleStyle = `style='background-color:#ddd'`
            let subTitleStyle = `style='background-color:#eee'`

            result += `<h3 ${titleStyle}>${target}:${standard.length+obj.length+fun.length+other.length+unknown.length}</h3>`

            if (standard.length > 0) {
                result += `<h4 ${subTitleStyle}>普通成员:${standard.length}</h4>`
                logKey(standard)
            }

            if (obj.length) {
                result += `<h4 ${subTitleStyle}>对象成员:${obj.length}</h4>`
                logKey(obj)
            }

            if (fun.length > 0) {
                result += `<h4 ${subTitleStyle}>方法成员:${fun.length}</h4>`
                logKey(fun)
            }

            if (other.length > 0) {
                result += `<h4 ${subTitleStyle}>其他成员:${other.length}</h4>`
                logKey(other)
            }

            if (unknown.length) {
                result += `<h4 ${subTitleStyle}>未知成员:${unknown.length}</h4>`
                logKey(unknown)
            }

        }
        return result
    }
    this.logObj = log
}());