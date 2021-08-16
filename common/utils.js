const { reduce, filter, not, includes } = require('ramda')
const { MOVIES_API, API_KEY, FILTER_OPTIONS } = require('../constants/constants')

const urlByApi = (baseUrl) => (queryParams = {}) => reduce(
    (url, [key, value]) => `${url}&${key}=${value}`,
    baseUrl,
    Object.entries(queryParams)
);

const extractIllegalKeySearch = (queryParams) => Object.fromEntries(
    filter(
        ([k]) => not(includes(k, FILTER_OPTIONS)),
        Object.entries(queryParams)
    )
);

const ombdDiscoverUrlBuilder = urlByApi(`${MOVIES_API}/3/discover/movie?api_key=${API_KEY}`);
const ombdSearchUrlBuilder = urlByApi(`${MOVIES_API}/3/search/multi?api_key=${API_KEY}`);

module.exports = Object.freeze({
    ombdDiscoverUrlBuilder,
    ombdSearchUrlBuilder,
    extractIllegalKeySearch
})