import { crawlPage } from './crawl.js'
import { printReport } from './report.js'

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
    
    printReport(pages)
    
}


// https://www.wagslane.dev/

main()