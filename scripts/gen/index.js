// eslint-disable-next-line import/no-dynamic-require,global-require
module.exports = (scriptName, ...args) => require(`./${scriptName}`)(...args)
