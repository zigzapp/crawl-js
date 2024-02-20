import { normalizeURL, crawlPage } from './crawl.js'

async function main() {

    /*
    if (process.argv.length != 3){
        console.log("no website provided")

        //process.exit(1)
    }
    if (process.argv.length > 3){
        console.log("too many command line args")
        //process.exit(1)
    }
    */
    const baseURL = (process.argv[2] === 3) ? process.argv[2] : "https://wagslane.dev"

    console.log(`starting to crawl: ${baseURL}`)

    const pages = await crawlPage(baseURL,baseURL,{})
    
    console.log(pages)
    
}


// https://www.wagslane.dev/

main()