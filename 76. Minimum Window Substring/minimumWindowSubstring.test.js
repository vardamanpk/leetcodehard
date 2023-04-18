const minimumWindowSubstring = require('./minimumWindowSubstring')

describe('minimumWindowSubstring', () => {
    test('should return minimum window substring when t present in s', () => {
        expect(minimumWindowSubstring('ADOBECODEBANC', 'ABC')).toBe('BANC')
    }),
    test('should return entire string when its the minumum window', () => {
        expect(minimumWindowSubstring('a','a')).toBe('a')
    }),
    test('should return empty string when t is not present in s', () => {
        expect(minimumWindowSubstring('abc','d')).toBe('')
    })
})