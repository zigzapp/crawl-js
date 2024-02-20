const { normalizeURL, getURLsFromHTML } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL strip https', () => {
    const input = 'https://boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip end slash', () => {
    const input = 'https://boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'boot.dev/path'
    expect(actual).toEqual(expected)
})


test('normalizeURL capitals', () => {
    const input = 'https://BOOT.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip http', () => {
    const input = 'http://boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://blog.boot.dev/path/">Boot.dev Blog</a>
    </body>
</html>
    `
    const inputBaseURL = "https://blog.boot.dev/path/"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://blog.boot.dev/path/']
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="/path/">Boot.dev Blog</a>
    </body>
</html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://blog.boot.dev/path/']
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML both', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://blog.boot.dev/path1/">Boot.dev Blog Path 1</a>
        <a href="/path2/">Boot.dev Blog Path 2</a>
    </body>
</html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://blog.boot.dev/path1/', 'https://blog.boot.dev/path2/']
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="invalid">Invalid URL</a>
    </body>
</html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})