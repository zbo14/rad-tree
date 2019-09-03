# rad-tree

Small library implementing a radix (or prefix) tree.

## Install

`npm i --save rad-tree`

## Usage

### Create a tree

```js
'use strict'

const Tree = require('rad-tree')

const tree = new Tree()
```

### Set key/value pairs

```js
...

tree.set('icecream', 'cone')
tree.set('foo', 'bar')
tree.set('iced', 'coffee')
tree.set('foobar', 'baz')
tree.set('ice')
tree.set('fo', 'mo')
```

### Get values

```js
...

tree.get('foobar')
// 'baz'

tree.get('icedcoffee')
// undefined
```

### Delete key/value pairs

```js
...

tree.delete('foobar')
// true

tree.delete('icedcoffee')
// false
```

### Generate object representation of tree

```js
...

tree.toObject()

// {
//   edges: [
//     {
//       key: 'fo',
//       node: {
//         value: 'mo',
//         edges: [
//           {
//             key: 'o',
//             node: {
//               value: 'bar',
//               edges: [
//                 {
//                   key: 'bar',
//                   node: { value: 'baz' }
//                 }
//               ]
//             }
//           }
//         ]
//       }
//     },
//     {
//       key: 'ice',
//       node: {
//         edges: [
//           {
//             key: 'cream',
//             node: { value: 'cone' }
//           },
//           {
//             key: 'd',
//             node: { value: 'coffee' }
//           }
//         ],
//         value: 'ice'
//       }
//     }
//   ]
// }
```

### Generate string representation of tree

```js
...

tree.toString()

// `fo: mo
//   o: bar
//     bar: baz
// ice: ice
//   cream: cone
//   d: coffee`
```

## Test

`npm test`

## Lint

`npm run lint`

## Documentation

`npm run doc`

## Contributing

Please do!

If you find a bug, want a feature added, or just have a question, feel free to [open an issue](https://github.com/zbo14/rad-tree/issues/new). In addition, you're welcome to [create a pull request](https://github.com/zbo14/rad-tree/compare/develop...) addressing an issue. You should push your changes to a feature branch and request merge to `develop`.

Make sure linting and tests pass and coverage is 💯 before creating a pull request!
