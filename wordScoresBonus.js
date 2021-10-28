/*
BONUS ROUND (Modifying Rule 1):
- Each letter initially gets a score based on its location in the alphabet starting with the first letter of the word (gym = [g=1, h=2, i=3, etc..., e=25, f=26])

*/
let vowels = ["a", "e", "i", "o", "u"];

// return regular alphabet or custom alphabet (string)
function createAlphabetString(word) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  if (word[0] !== "a") {
    // index of first letter in the alphabet
    let index = alphabet.indexOf(word[0]);

    // cut alphabet at the index and save the left part
    let substringLeft = alphabet.substring(0, index);

    // cut alphabet at the index and save the right part
    let substringRight = alphabet.substring(index, 26);

    // concatenate new alphabet string
    let newAlphabet = substringRight + substringLeft;

    console.log("the new alphabet is " + newAlphabet);
    return newAlphabet;
  }
  return alphabet;
}

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
function addRegularScore(alphabet, char) {
  return alphabet.indexOf(char) + 1;
}

// return score (number)
function addScoreSquared(alphabet, char) {
  return (alphabet.indexOf(char) + 1) ** 2;
}

// return score (number)
function addScoreHalved(alphabet, char) {
  return (alphabet.indexOf(char) + 1) / 2;
}

// return the total score (number)
function calculateScore(word) {
  if (word.length === 0 || typeof word != "string") {
    console.log("This is not a valid input");
    return "This is not a valid input";
  }

  console.log("the word is: " + word);
  const alphabet = createAlphabetString(word);
  let letterScore = 0;
  let occurence = {};

  for (let i = 0; i < word.length; i++) {
    // ------------ calculate letter score ------------
    // char is Y
    if (word[i + 1] === "y") {
      if (!wordHasVowels(word)) {
        // Y is a vowel, wordHasVowel is false
        letterScore += Math.round(addScoreHalved(alphabet, word[i]));
      }
      // Y is a consonant, wordHasVowels is true
      else {
        letterScore += addRegularScore(alphabet, word[i]);
      }
    }
    // if char is consonant and letter on the right is vowel
    else if (!vowels.includes(word[i]) && vowels.includes(word[i + 1])) {
      letterScore += Math.round(addScoreHalved(alphabet, word[i]));
    }
    // if vowel with another vowel on right or left
    else if (
      vowels.includes(word[i]) &&
      (vowels.includes(word[i - 1]) || vowels.includes(word[i + 1]))
    ) {
      letterScore += addScoreSquared(alphabet, word[i]);
    }
    // everything else
    else {
      letterScore += addRegularScore(alphabet, word[i]);
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

  console.log("letter score is: ");
  console.log(letterScore);
  console.log("max occurence is: ");
  console.log(maxOccurence);
  console.log("total score is: ");
  console.log(totalScore);

  return totalScore;
}

calculateScore("zoo");
calculateScore("gym");
calculateScore("");
calculateScore(123);
