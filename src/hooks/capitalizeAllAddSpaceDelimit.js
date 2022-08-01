const capitalizeAllAddSpaceDelimit = (string) => {
  return string
    .split(' ')
    .map(
      (word) =>
        `${word.slice(0, 1).toUpperCase()}${word
          .slice(1, word.length)
          .toLowerCase()}`
    )
    .join(' ');
};

export default capitalizeAllAddSpaceDelimit;
