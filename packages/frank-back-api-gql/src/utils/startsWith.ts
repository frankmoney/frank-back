const startsWith = (str: string, substr: string): boolean =>
  typeof str === 'string' && str.substr(0, substr.length) === substr

export default startsWith
