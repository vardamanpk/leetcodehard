function minimumWindowSubstring(s, t) { 
    // Build character frequency map for t
    const charFreq = new Map();
    for(const c of t) {
        charFreq.set(c, (charFreq.get(c) || 0) + 1)
    }
    let count = charFreq.size;
    let left = 0, right = 0;
    let minLength = Infinity;
    let result = '';
    // Increment right till we find all characters in t
    while(right<s.length) {
        const c = s[right]
        if(charFreq.has(c)) {
            charFreq.set(c, charFreq.get(c) - 1)
            if(charFreq.get(c) === 0)
                count--;
        }
        // Increment left till we no longer have all characters in t
        while(count === 0) {
            const leftChar = s[left];
            if(charFreq.has(leftChar)) {
                charFreq.set(leftChar, charFreq.get(leftChar) + 1)
                if(charFreq.get(leftChar) === 1) {
                    count++;
                } 
             }
            if(minLength > right - left + 1) {
                minLength = right - left + 1;
                result = s.substring(left, right+1)
            }
            left++;
        }
        right++;
    }    
    return result;
   
}

module.exports = minimumWindowSubstring
