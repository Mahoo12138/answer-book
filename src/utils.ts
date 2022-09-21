const randomIdFormQuestion = (question: string, max: number = 1, min = 0) => {
  let seed = string2Hash(question);
  seed = (seed * 9301 + 49297) % 233280;
  const rnd = seed / 233280.0;
  return Math.ceil(min + rnd * (max - min));
}

const string2Hash = (str: string) => {
  let hash = 0, i = 0, chr = 0;
  if (str.length === 0) return hash;
  for (; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return hash > 0 ? hash : -hash;
};

export {randomIdFormQuestion}