module.exports  = {
    normalizeURL
}

function normalizeURL(url) {
    const urlObj = new URL(url)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length > 0 && hostPath[hostPath.length - 1] === '/') {
        return hostPath.slice(0, -1)
    }
    return hostPath
}