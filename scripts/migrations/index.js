module.exports = (scriptName, ...args) => require(`./${scriptName}`)(...args)
