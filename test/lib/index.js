'use strict'

const assert = require('assert')
const fixtures = require('../fixtures')
const Tree = require('../../lib')

describe('lib/index', () => {
  beforeEach(() => {
    this.tree = new Tree()
    fixtures.kvPairs.forEach(([k, v]) => this.tree.set(k, v))
  })

  describe('#get()', () => {
    it('gets each value by key', () => {
      assert.strictEqual(this.tree.get('fo'), 'mo')
      assert.strictEqual(this.tree.get('foo'), 'bar')
      assert.strictEqual(this.tree.get('foobar'), 'baz')
      assert.strictEqual(this.tree.get('ice'), 'ice')
      assert.strictEqual(this.tree.get('iced'), 'coffee')
      assert.strictEqual(this.tree.get('icecream'), 'cone')
    })

    it('returns undefined when it can\'t find value for key', () => {
      assert.strictEqual(this.tree.get('icedcoffee'), undefined)
    })
  })

  describe('#toObject()', () => {
    it('converts tree to object', () => {
      assert.deepStrictEqual(this.tree.toObject(), fixtures.object)
    })
  })

  describe('#toString()', () => {
    it('converts tree to string', () => {
      assert.strictEqual(this.tree.toString(), fixtures.string)
    })
  })

  describe('#remove()', () => {
    it('removes key', () => {
      assert.strictEqual(this.tree.remove('icecream'), true)

      assert.deepStrictEqual(this.tree.toObject(), {
        edges: [
          {
            key: 'fo',
            node: {
              value: 'mo',
              edges: [
                {
                  key: 'o',
                  node: {
                    value: 'bar',
                    edges: [
                      {
                        key: 'bar',
                        node: {
                          value: 'baz',
                          edges: []
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            key: 'ice',
            node: {
              edges: [
                {
                  key: 'd',
                  node: {
                    value: 'coffee',
                    edges: []
                  }
                }
              ],
              value: 'ice'
            }
          }
        ]
      })

      assert.strictEqual(this.tree.toString(), [
        'fo: mo',
        '  o: bar',
        '    bar: baz',
        'ice',
        '  d: coffee'
      ].join('\n'))
    })

    it('removes multiple keys', () => {
      assert.strictEqual(this.tree.remove('icecream'), true)
      assert.strictEqual(this.tree.remove('ice'), true)

      assert.deepStrictEqual(this.tree.toObject(), {
        edges: [
          {
            key: 'fo',
            node: {
              value: 'mo',
              edges: [
                {
                  key: 'o',
                  node: {
                    value: 'bar',
                    edges: [
                      {
                        key: 'bar',
                        node: {
                          value: 'baz',
                          edges: []
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            key: 'iced',
            node: {
              edges: [],
              value: 'coffee'
            }
          }
        ]
      })

      assert.strictEqual(this.tree.toString(), [
        'fo: mo',
        '  o: bar',
        '    bar: baz',
        'iced: coffee'
      ].join('\n'))
    })

    it('doesn\'t remove nonexistent key (too long)', () => {
      assert.strictEqual(this.tree.remove('foobarbaz'), false)
      assert.deepStrictEqual(this.tree.toObject(), fixtures.object)
      assert.strictEqual(this.tree.toString(), fixtures.string)
    })

    it('doesn\'t remove nonexistent key (too short)', () => {
      assert.strictEqual(this.tree.remove('fooba'), false)
      assert.deepStrictEqual(this.tree.toObject(), fixtures.object)
      assert.strictEqual(this.tree.toString(), fixtures.string)
    })
  })
})
