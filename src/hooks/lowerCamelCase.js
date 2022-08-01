const toLowerCamelCase = (string) => {
  const wordArray = string.split(' ');

  let [firstWord, rest] = [
    wordArray.slice(0, 1),
    wordArray.slice(1, wordArray.length),
  ];

  if (rest === undefined) return firstWord.toLowerCase();

  rest = rest.map(
    (word) =>
      `${word.slice(0, 1).toUpperCase()}${word
        .slice(1, word.length)
        .toLowerCase()}`
  );

  return [...firstWord, ...rest].join('');
};

export default toLowerCamelCase;
