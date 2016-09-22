'use strict'

const assert = require('chai').assert
const stableId = require('../lib/stable-id')

describe('stable-id', function () {

    it('should return id for object', function () {
        assert.equal(stableId({foo: 'bar'}), '7A38BF81F383F69433AD6E900D35B3E2')
    })

    it('should return id for string', function () {
        assert.equal(stableId('foo'), '2C26B46B68FFC68FF99B453C1D304134')
    })

    it('should return id for number', function () {
        assert.equal(stableId(0), '5FECEB66FFC86F38D952786C6D696C79')
    })

    it('should return same id for number and number as string', function () {
        assert.equal(stableId(0), stableId('0'))
        assert.equal(stableId(3.14), stableId('3.14'))
    })

    it('should return id for boolean', function () {
        assert.equal(stableId(false), 'FCBCF165908DD18A9E49F7FF27810176')
        assert.equal(stableId(true), 'B5BEA41B6C623F7C09F1BF24DCAE58EB')
    })

    it('should return same id for boolean and boolean as string', function () {
        assert.equal(stableId(false), stableId('false'))
        assert.equal(stableId(true), stableId('true'))
    })

    it('should return undefined for everything else', function () {
        assert.strictEqual(stableId(undefined), undefined)
        assert.strictEqual(stableId(null), undefined)
        assert.strictEqual(stableId(NaN), undefined)
        assert.strictEqual(stableId(Infinity), undefined)
    })

    it('should throw exception on circular references', function () {
        // create circular referenc
        var foo = {}
        var bar = {'foo': foo}
        foo.bar = bar
        // test for exception
        assert.throws(() => stableId(foo), 'Converting circular structure to JSON')
    })
    
})