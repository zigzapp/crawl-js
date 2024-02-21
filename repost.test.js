import { test, expect } from '@jest/globals';
import { sortPages } from './report.js';

test('sortPages 2 pages', () => {
    const input = {
        'https://wagslane.dev/path': 3,
        'https://wagslane.dev': 1
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev',1],
        ['https://wagslane.dev/path',3]
    ]
    expect(actual).toEqual(expected)
})



test('sortPages 5 pages', () => {
    const input = {
        'https://wagslane.dev/path': 3,
        'https://wagslane.dev': 2,
        'https://wagslane.dev/path2': 7,
        'https://wagslane.dev/path3': 1,
        'https://wagslane.dev/path4': 4
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev/path3', 1],
        ['https://wagslane.dev',2],
        ['https://wagslane.dev/path',3],
        ['https://wagslane.dev/path4', 4],
        ['https://wagslane.dev/path2', 7],
    ]
    expect(actual).toEqual(expected)
})