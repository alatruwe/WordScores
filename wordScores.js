/*
Please write a script that takes in a word and returns its score based on the following rules:

- Rule 1: Each letter initially gets a scored based on its location in the alphabet (a=1, b=2, etc...)
- Rule 2: If a consonant appears to the left of a vowel, its score is halved (round up to the nearest integer)
- Rule 3: If a vowel appears next to another vowel, its value is squared.
- Rule 4: The letter Y is considered a vowel if there are no other vowels in the word.
- Rule 5: After calculating the letter score, apply an exponent equal to the number of times the most-repeated letter appears
*/

const alphabet = "abcdefghijklmnopqrstuvwxyz";
let vowels = ["a", "e", "i", "o", "u"];

// return true or false (bool)
function wordHasVowels(word) {
  const vowels = ["a", "e", "i", "o", "u"];
  for (let i = 0; i < word.length; i++) {
    if (vowels.includes(word[i])) {
      return true;
    }
  }
  return false;
}

// return score (number)
function addRegularScore(char) {
  return alphabet.indexOf(char) + 1;
}

// return score (number)
function addScoreSquared(char) {
  return (alphabet.indexOf(char) + 1) ** 2;
}

// return score (number)
function addScoreHalved(char) {
  return (alphabet.indexOf(char) + 1) / 2;
}

// return the total score (number)
function calculateScore(word) {
  let letterScore = 0;
  let occurence = {};

  if (word.length === 0 || typeof word != "string") {
    console.log("This is not a valid input");
    return "This is not a valid input";
  }

  for (let i = 0; i < word.length; i++) {
    // ------------ calculate letter score ------------
    // char is Y
    if (word[i + 1] === "y") {
      if (!wordHasVowels(word)) {
        // Y is a vowel, wordHasVowel is false
        letterScore += Math.round(addScoreHalved(word[i]));
      }
      // Y is a consonant, wordHasVowels is true
      else {
        letterScore += addRegularScore(word[i]);
      }
    }
    // if char is consonant and letter on the right is vowel
    else if (!vowels.includes(word[i]) && vowels.includes(word[i + 1])) {
      letterScore += Math.round(addScoreHalved(word[i]));
    }
    // if vowel with another vowel on right or left
    else if (
      vowels.includes(word[i]) &&
      (vowels.includes(word[i - 1]) || vowels.includes(word[i + 1]))
    ) {
      letterScore += addScoreSquared(word[i]);
    }
    // everything else
    else {
      letterScore += addRegularScore(word[i]);
    }

    // ------------ calculate characters occurence ------------
    const char = word[i];
    if (!occurence[char]) occurence[char] = 1;
    else occurence[char]++;
  }

  // get max occurence
  let occurenceValues = Object.values(occurence);
  let maxOccurence = Math.max(...occurenceValues);

  // ------------ calculate total score ------------
  let totalScore = letterScore ** maxOccurence;

  console.log("the word is: " + word);
  console.log("letter score is: ");
  console.log(letterScore);
  console.log("max occurence is: ");
  console.log(maxOccurence);
  console.log("total score is: ");
  console.log(totalScore);

  return totalScore;
}

calculateScore("intelligently");
calculateScore("agree");
calculateScore("");
calculateScore(123);
