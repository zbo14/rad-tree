'use strict'

const kvPairs = [
  ['icecream', 'cone'],
  ['foo', 'bar'],
  ['iced', 'coffee'],
  ['foobar', 'baz'],
  ['ice'],
  ['fo', 'mo']
]

const object = {
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
                  node: { value: 'baz' }
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
            key: 'cream',
            node: { value: 'cone' }
          },
          {
            key: 'd',
            node: { value: 'coffee' }
          }
        ],
        value: 'ice'
      }
    }
  ]
}

const string = [
  'fo: mo',
  '  o: bar',
  '    bar: baz',
  'ice: ice',
  '  cream: cone',
  '  d: coffee'
].join('\n')

module.exports = {
  kvPairs,
  object,
  string
}
