const express = require('express');
const fetch = require('node-fetch');
const { isEmpty, not, range, take, filter } = require('ramda');
const { isLegalQueryParams, extractIllegalKeySearch, ombdSearchUrlBuilder, ombdDiscoverUrlBuilder } = require('../common/utils');
const { unkownFilters } = require('../constants/response');
const { get, takeByLimit } = require('../services/cache');

const router = express.Router();

const searchValidation = async (req, res, next) => {
    const illegalSearchKeys = extractIllegalKeySearch(req.query);

    if (not(isEmpty(illegalSearchKeys))) {
        return res.send(unkownFilters(illegalSearchKeys));
    }
    next();
}

router.get('/random', async (req, res) => {
    const { limit } = req.query
    res.send(takeByLimit(limit || 10))
})

router.get('/search', async (req, res) => {
    const { query } = req.query;
    fetch(ombdSearchUrlBuilder({ query: query || ''}))
        .then(r => r.json())
        .then(r => res.send(r))
        .catch(e => res.send(e));
})



module.exports = router