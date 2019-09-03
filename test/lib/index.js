'use strict'

const assert = require('assert')
const fixtures = require('../fixtures')
const Tree = require('../../lib')

describe('lib/index', () => {
  beforeEach(() => {
    this.tree = new Tree()
    fixtures.kvPairs.forEach(([k, v]) => this.tree.set(k, v))
  })

  describe('#set()', () => {
    it('sets a key/value pair that creates a node with no value', () => {
      this.tree.set('foobaz')

      assert.strictEqual(this.tree.toString(), [
        'fo: mo',
        '  o: bar',
        '    ba',
        '      r: baz',
        '      z: foobaz',
        'ice: ice',
        '  cream: cone',
        '  d: coffee'
      ].join('\n'))
    })
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

  describe('#delete()', () => {
    it('deletes key', () => {
      assert.strictEqual(this.tree.delete('icecream'), true)

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
                          value: 'baz'
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
                    value: 'coffee'
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
        'ice: ice',
        '  d: coffee'
      ].join('\n'))
    })

    it('deletes another key', () => {
      assert.strictEqual(this.tree.delete('foo'), true)

      assert.deepStrictEqual(this.tree.toObject(), {
        edges: [
          {
            key: 'fo',
            node: {
              value: 'mo',
              edges: [
                {
                  key: 'obar',
                  node: {
                    value: 'baz'
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
                  key: 'cream',
                  node: {
                    value: 'cone'
                  }
                },
                {
                  key: 'd',
                  node: {
                    value: 'coffee'
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
        '  obar: baz',
        'ice: ice',
        '  cream: cone',
        '  d: coffee'
      ].join('\n'))
    })

    it('deletes multiple keys', () => {
      assert.strictEqual(this.tree.delete('icecream'), true)
      assert.strictEqual(this.tree.delete('ice'), true)

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
                          value: 'baz'
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

    it('doesn\'t delete nonexistent key (too long)', () => {
      assert.strictEqual(this.tree.delete('foobarbaz'), false)
      assert.deepStrictEqual(this.tree.toObject(), fixtures.object)
      assert.strictEqual(this.tree.toString(), fixtures.string)
    })

    it('doesn\'t delete nonexistent key (too short)', () => {
      assert.strictEqual(this.tree.delete('fooba'), false)
      assert.deepStrictEqual(this.tree.toObject(), fixtures.object)
      assert.strictEqual(this.tree.toString(), fixtures.string)
    })
  })
})
