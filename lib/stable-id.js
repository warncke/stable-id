'use strict'

/* npm libraries */
var crypto = require('crypto')
var stringify = require('json-stable-stringify')

/* public functions */
module.exports = stableId

/**
 * @function stableId
 *
 * generate 128bit hex id of for input data. data may be a boolean, object,
 * number or string. booleans and numbers will be converted to strings.
 *
 * undefined will be returned for all other values including NaN and Infinity.
 *
 * @param {*} data
 *
 * @returns {string|undefined}
 *
 * @throws {} 
 */
function stableId (data) {
    // convert data to JSON if it is an object
    if (data && typeof data === 'object') {
        data = stringify(data)
    }
    // convert number to string
    else if (typeof data === 'boolean' || (typeof data === 'number' && !Number.isNaN(data) && data !== Infinity)) {
        data = data.toString()
    }
    // return undefined for everything other than string
    else if (typeof data !== 'string') {
        return undefined
    }
    // calculate hash of data
    var hash = crypto.createHash('sha256').update(data).digest('hex').toUpperCase()
    // return first 128 bits
    return hash.substring(0, 32)
}