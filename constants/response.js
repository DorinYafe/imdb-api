const { reduce, } = require("ramda");

module.exports = Object.freeze({
    unkownFilters: (filters = {}) => reduce(
        (errorMessage, [key]) => `${errorMessage} ${key}`,
        '[Error] illegal filters:',
        Object.entries(filters)
    )
})