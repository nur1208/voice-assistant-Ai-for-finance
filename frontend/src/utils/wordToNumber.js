export const wordToNumber = (word) => {
  const wordNum = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  let finalNum = word;
  if (wordNum.includes(finalNum)) {
    finalNum = wordNum.indexOf(finalNum);
  }

  return finalNum;
};
