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
 * when the includeData argument is true an object containing the data string
 * used to generate the id will be returned with the id.
 *
 * @param {*} data
 * @param {boolean} includeData - return data with id
 *
 * @returns {object|string|undefined}
 *
 * @throws {TypeError} on objects with circular references
 */
function stableId (data, includeData) {
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
        // return either object with id and data or string id
        return includeData
            ? {data: undefined, id: undefined}
            : undefined
    }
    // calculate hash of data, convert to upper, and get first 128 bits
    var id = crypto.createHash('sha256').update(data).digest('hex').toUpperCase().substring(0, 32)
    // return either object with id and data or string id
    return includeData
        ? {data: data, id: id}
        : id
}