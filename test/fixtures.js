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
            key: 'cream',
            node: {
              value: 'cone',
              edges: []
            }
          },
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
}

const string = [
  'fo: mo',
  '  o: bar',
  '    bar: baz',
  'ice',
  '  cream: cone',
  '  d: coffee'
].join('\n')

module.exports = {
  kvPairs,
  object,
  string
}
