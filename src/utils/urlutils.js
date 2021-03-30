export function urlToRegex(path) {
    return new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$")
}

export function parseParams(templateUrl, actualUrl) {
    const values = actualUrl.match(urlToRegex(templateUrl))?.slice(1)
    const keys = Array.from(templateUrl.matchAll(/:([A-Za-z]\w*)/g)).map(result => result[1])
    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]]
    }))
}

export function formParamsUrl(templateUrl, params){
    return templateUrl.replace(/:([A-Za-z]\w*)/g, (key)=>{
        return params[key.substr(1, key.length)]
    })
}