const hashCode = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    var code = value.charCodeAt(i);
    hash = (hash << 5) - hash + code;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

export default hashCode;
