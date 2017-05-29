'use strict'

const assert = require('chai').assert
const stableId = require('../lib/stable-id')

describe('stable-id', function () {

    it('should return id for object', function () {
        assert.equal(stableId({foo: 'bar'}), '7a38bf81f383f69433ad6e900d35b3e2')
    })

    it('should return id for string', function () {
        assert.equal(stableId('foo'), '2c26b46b68ffc68ff99b453c1d304134')
    })

    it('should return id for number', function () {
        assert.equal(stableId(0), '5feceb66ffc86f38d952786c6d696c79')
    })

    it('should return same id for number and number as string', function () {
        assert.equal(stableId(0), stableId('0'))
        assert.equal(stableId(3.14), stableId('3.14'))
    })

    it('should return id for boolean', function () {
        assert.equal(stableId(false), 'fcbcf165908dd18a9e49f7ff27810176')
        assert.equal(stableId(true), 'b5bea41b6c623f7c09f1bf24dcae58eb')
    })

    it('should return same id for boolean and boolean as string', function () {
        assert.equal(stableId(false), stableId('false'))
        assert.equal(stableId(true), stableId('true'))
    })

    it('should use U+221E for Infinity', function () {
        assert.equal(stableId('∞'), '78d9ce976067aaa5aa9024c17a726c9b')
        assert.strictEqual(stableId(Infinity), stableId('∞'))
    })

    it('should return undefined for everything else', function () {
        assert.strictEqual(stableId(undefined), undefined)
        assert.strictEqual(stableId(null), undefined)
        assert.strictEqual(stableId(NaN), undefined)
    })

    it('should throw exception on circular references', function () {
        // create circular reference
        var foo = {}
        var bar = {'foo': foo}
        foo.bar = bar
        // test for exception
        assert.throws(() => stableId(foo), 'Converting circular structure to JSON')
    })

    it('should return object with id and data when flag set', function () {
        // get id with data
        var id = stableId({foo: 'bar'}, true)
        // test id and data
        assert.equal(id.id, '7a38bf81f383f69433ad6e900d35b3e2')
        assert.equal(id.data, '{"foo":"bar"}')
    })

    it('should return object with undefined id and data when flag set', function () {
        // get id with data
        var id = stableId(undefined, true)
        // test id and data
        assert.deepEqual(id.id, undefined)
        assert.equal(id.data, undefined)
    })
    
})