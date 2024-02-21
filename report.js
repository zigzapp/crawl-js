export function printReport(pages){
    console.log("===========")
    console.log("REPORT")
    console.log("===========")
    const sortedPages = sortPages(pages)
    for (const sortedPage of sortedPages){
        const url = sortedPage[0]
        const hits = sortedPage[1]
        console.log(`Found ${hits} links to page: ${url}`)
    }
    console.log("===========")
    console.log("END REPORT")
    console.log("===========")
}

export function sortPages(pages) {
    const pagesArr = Object.entries(pages);

    pagesArr.sort((a, b) => {
        const aHits = Number(a[1]); // Ensure aHits is a number
        const bHits = Number(b[1]); // Ensure bHits is a number

        if (bHits === aHits) {
            // If hits are equal, maintain original order
            return 0;
        } else {
            // Otherwise, sort in descending order based on hits
            return aHits - bHits;
        }
    });

    return pagesArr;
}
