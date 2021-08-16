const { not, isEmpty, take } = require("ramda");
const fetch = require('node-fetch');
const { ombdDiscoverUrlBuilder } = require("../common/utils");
const mockMovies = require('../mock/moviesMock')

const moviesCache = () => {

    const cache = [];

    const init = (...movies) => cache.push(...movies);

    /*** fecth */
    (() => fetch(ombdDiscoverUrlBuilder({}))
        .then(x => x.json())
        .then(({ results }) => init(...[...results]))
        .catch(x => console.log(x)))();


    /*** mock */
    // (() => init(...mockMovies))()

    const add = ({ id: movieID, ...rest }) => {
        const isIdExist = !!cache.find(({ id }) => movieID === id);
        if (!isIdExist) {
            cache.push({ id: movieID, ...rest })
        };
    };

    const findById = (searchId) => cache.find(({ id }) => searchId === id);

    const takeByLimit = (limit) => take(limit, cache);

    const get = () => [...cache];    

    return {
        add,
        get,
        init,
        findById,
        takeByLimit
    };

};

const cache = moviesCache();
module.exports = cache;