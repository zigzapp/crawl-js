const { JSDOM } = require('jsdom')

module.exports  = {
    normalizeURL,
    getURLsFromHTML
}

function getURLsFromHTML(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {
        // console.log(linkElement.href) // remove after debug
        if (linkElement.href.slice(0, 1) === '/') {
            //relative
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlObj.href)
            } catch (err){
                console.error(`error with relative url: ${err.message}`)
            }
        } else {
            //absolue
            try {
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href)
            } catch (err){
                console.error(`error with absolute url: ${err.message}`)
            }
        }
    }
    return urls
}

function normalizeURL(url) {
    const urlObj = new URL(url)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length > 0 && hostPath[hostPath.length - 1] === '/') {
        return hostPath.slice(0, -1)
    }
    return hostPath
}
