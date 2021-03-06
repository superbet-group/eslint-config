import { sqrt } from "./module";

// function that determines the inverse square root of a number
export function inverseSqrt(x) {
  return sqrt(1 / x);
}

// function that rotates a 2 dimensional array to the left
export function rotate2DArrayLeft(array) {
  return array.map((_row, i) =>
    array.map((_col, j) => array[j][array.length - i - 1])
  );
}

function reverse(x) {
  return x.split("").reverse().join("");
}

// function that finds the longest palindrome in a string
export function findLongestPalindrome(str) {
  let longestPalindrome = "";
  let longestPalindromeLength = 0;
  for (let i = 0; i < str.length; i += 1) {
    for (let j = i; j < str.length; j += 1) {
      const subString = str.substring(i, j + 1);
      if (subString === reverse(subString)) {
        if (subString.length > longestPalindromeLength) {
          longestPalindrome = subString;
          longestPalindromeLength = subString.length;
        }
      }
    }
  }
  return longestPalindrome;
}

// 6. ZigZag Conversion https://leetcode.com/problems/zigzag-conversion/
export function convert(s, numRows) {
  if (numRows === 1) {
    return s;
  }
  const rows = [];
  for (let i = 0; i < numRows; i += 1) {
    rows.push("");
  }
  let index = 0;
  let direction = 1;
  for (let i = 0; i < s.length; i += 1) {
    rows[index] += s[i];
    if (index === numRows - 1) {
      direction = -1;
    } else if (index === 0) {
      direction = 1;
    }
    index += direction;
  }
  return rows.join("");
}

// 11. Container With Most Water https://leetcode.com/problems/container-with-most-water/
export function maxArea(height) {
  let max =
    Math.min(height[0], height[height.length - 1]) * (height.length - 1);
  let left = 0;
  let right = height.length - 1;
  while (left < right) {
    const area = Math.min(height[left], height[right]) * (right - left);
    if (area > max) {
      max = area;
    }
    if (height[left] < height[right]) {
      left += 1;
    } else {
      right -= 1;
    }
  }
  return max;
}

// 17. Letter Combinations of a Phone Number https://leetcode.com/problems/letter-combinations-of-a-phone-number/
export function letterCombinations(digits) {
  if (!digits) {
    return [];
  }
  const mapping = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };
  const result = [];
  const helper = (partial, index, string) => {
    if (index === digits.length) {
      result.push(string);
      return;
    }
    const letters = mapping[partial[index]];
    for (let i = 0; i < letters.length; i += 1) {
      helper(partial, index + 1, string + letters[i]);
    }
  };
  helper(digits, 0, "");
  return result;
}

// 22. Generate Parentheses https://leetcode.com/problems/generate-parentheses/
export function generateParenthesis(n) {
  const result = [];
  const helper = (partial, left, right) => {
    if (left === right && left === n) {
      result.push(partial);
      return;
    }
    if (left < n) {
      helper(`${partial}(`, left + 1, right);
    }
    if (right < left) {
      helper(`${partial})`, left, right + 1);
    }
  };
  helper("", 0, 0);
  return result;
}

// 20. Valid Parentheses https://leetcode.com/problems/valid-parentheses/
export function isValid(s) {
  const mapping = {
    "(": ")",
    "{": "}",
    "[": "]",
  };
  const stack = [];
  for (let i = 0; i < s.length; i += 1) {
    if (mapping[s[i]]) {
      stack.push(s[i]);
    } else if (!stack.length || mapping[stack.pop()] !== s[i]) {
      return false;
    }
  }
  return !stack.length;
}

// 23. Merge k Sorted Lists https://leetcode.com/problems/merge-k-sorted-lists/
class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function mergeKLists(lists) {
  const result = new ListNode(0);
  let current = result;
  const helper = (innerLists) => {
    if (!innerLists.length) {
      return;
    }
    const min = Math.min(...innerLists.map((x) => x.val));
    const partial = innerLists.filter((x) => x.val === min);
    current.next = new ListNode(min);
    current = current.next;
    helper(partial);
  };
  helper(lists);
  return result.next;
}
