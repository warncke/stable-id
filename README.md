# stable-id

Stable ID generates a 128-bit hex string id that is the first 128 bits of an
SHA-256 hash of the input data.

Objects are serialized using
[json-stable-stringify](https://www.npmjs.com/package/json-stable-stringify).

Errors will be thrown on objects that include circular references.

As of version 1.0.0 this string is lower case where previously it was upper
case.

## Stable id usage

    const stableId = require('stable-id')

    stableId(foo)

## Object stable id

    // 7a38bf81f383f69433ad6e900d35b3e2
    stableId({foo: 'bar'})

## String stable id

    // 2c26b46b68ffc68ff99b453c1d304134
    stableId('foo')

## Number stable id

    // 5feceb66ffc86f38d952786c6d696c79
    stableId(0)

    // 5feceb66ffc86f38d952786c6d696c79
    stableId('0')

Numbers are converted to strings so the stable id for a number will be the
same as the stable id of a string representation of the same number.

NaN and Infinity are not supported and return undefined.

## Boolean stable id

    // b5bea41b6c623f7c09f1bf24dcae58eb
    stableId(true)

    // b5bea41b6c623f7c09f1bf24dcae58eb
    stableId('true')

Booleans are converted to strings so the string true and the boolean true will
yield the same id.

## Infinity stable id

    // 78d9ce976067aaa5aa9024c17a726c9b
    stableId(Infinity)

    // 78d9ce976067aaa5aa9024c17a726c9b
    stableId('∞')

The number Infinity is converted to the U+221E unicode infinity character.

## Undefined id

    // undefined
    stableId(undefined)

    // undefined
    stableId(null)

    // undefined
    stableId(NaN)

undefined, null, and NaN all return an undefined id.

## Stable id with data

    var id = stableId({foo: 'bar'}, true)

    id.id   // 7a38bf81f383f69433ad6e900d35b3e2
    id.data // {"foo":"bar"}

When called with the second argument === true an object will be returned with
an `id` property which is the hex id and a `data` property which is the exact
string that was used to generate that id.

When storing data this method should be used to insure that the data stored
exactly matches the data that was used to create the id.