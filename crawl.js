import {JSDOM} from './imports.cjs'
import fetch from 'node-fetch'

export async function crawlPage(baseURL, currentURL, pages){
    console.log (`crawler starting with ${currentURL}`)


    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)
    if (baseURLObj.hostname !== currentURLObj.hostname){
        console.log(`url out of domain ${currentURL}`)
        return pages
    }

    const normalizedCurrentURL = normalizeURL(currentURL)
    if (normalizedCurrentURL in pages){
        console.log(`page already visited ${currentURL}`)
        pages[normalizedCurrentURL]++
        return pages
    }   else {
        pages[normalizedCurrentURL] = 1
    }

    console.log(`actively crawling ${currentURL}`)


    try {
        const resp = await fetch(currentURL)

        if (resp.status > 399 ){
            console.log(`error in fetch with status code: ${resp.status} on page ${currentURL}`)
            return pages
        }

        const contentType = resp.headers.get('content-type')
        
        if (!contentType.includes("text/html")){
            console.log(`content type is not html: ${contentType} on page ${currentURL}`)
        }

        const htmlBody = await resp.text()

        const nextURLs = getURLsFromHTML(htmlBody, baseURL)
        
        for (const nextURL of nextURLs){
            pages = await crawlPage(baseURL, nextURL, pages)
        }

    } catch (err){
       console.log(`error fetching ${currentURL}: ${err.message}`) 
    }

    console.log(`ended crawling ${currentURL}`)

    return pages
}

export function getURLsFromHTML(htmlBody, baseURL){
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
            //absolute
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

export function normalizeURL(url) {
    const urlObj = new URL(url)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length > 0 && hostPath[hostPath.length - 1] === '/') {
        return hostPath.slice(0, -1)
    }
    return hostPath
}