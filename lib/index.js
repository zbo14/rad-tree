'use strict'

/**
 * A Radix (or Prefix) Tree
 */
class Tree {
  /**
   * @param {*} value
   */
  constructor (value) {
    this.edges = []

    if (value) {
      this.value = value
    }
  }

  /**
   * Delete a key.
   *
   * @param {String} key
   *
   * @param {Boolean}
   */
  delete (key) {
    for (let i = 0; i < this.edges.length; i++) {
      const edge = this.edges[i]
      const node = edge.node

      if (edge.key === key) {
        this.edges.splice(i, 1)

        node.edges.forEach(edge => {
          edge.key = key + edge.key
        })

        this.edges.push(...node.edges)

        return true
      }

      if (key.startsWith(edge.key)) {
        const left = key.slice(edge.key.length)
        return node.delete(left)
      }

      if (edge.key.startsWith(key)) break
    }

    return false
  }

  /**
   * Get a value by key.
   *
   * @param  {String} key
   *
   * @return {*}
   */
  get (key) {
    for (let i = 0; i < this.edges.length; i++) {
      const edge = this.edges[i]
      const node = edge.node

      if (edge.key === key) return node.value

      if (key.startsWith(edge.key)) {
        const left = key.slice(edge.key.length)
        return node.get(left)
      }
    }
  }

  /**
   * Set a value for a key.
   *
   * @param  {String} key
   * @param  {*}      [value = key]
   *
   * @return {Tree}
   */
  set (key, value = key) {
    for (let i = 0; i < this.edges.length; i++) {
      const edge = this.edges[i]
      const node = edge.node

      if (edge.key[0] !== key[0]) continue

      if (edge.key === key) {
        node.value = value
        return node
      }

      let left1 = null
      let left2 = null
      let newKey = key[0]

      for (let j = 1; j < key.length && j < edge.key.length; j++) {
        if (key[j] !== edge.key[j]) break
        newKey += key[j]
      }

      if (newKey.length < edge.key.length) {
        left1 = edge.key.slice(newKey.length)
      }

      if (newKey.length < key.length) {
        left2 = key.slice(newKey.length)
      }

      edge.key = newKey

      if (left1 && left2) {
        const edges = node.edges
        node.edges = []
        const child = node.set(left1, node.value)
        child.edges = edges
        node.set(left2, value)
        delete node.value
      } else if (left1) {
        const edges = node.edges
        node.edges = []
        const child = node.set(left1, node.value)
        child.edges = edges
        node.value = value
      } else {
        node.set(left2, value)
      }

      return node
    }

    const node = new Tree(value)
    const edge = { key, node }
    this.edges.push(edge)

    return node
  }

  /**
   * Convert a tree to an object.
   *
   * @return {Object}
   */
  toObject () {
    const obj = {}

    if (this.edges.length) {
      obj.edges = this.edges
        .sort((a, b) => a.key > b.key ? 1 : -1)
        .map(({ key, node }) => ({
          key,
          node: node.toObject()
        }))
    }

    if (this.value) {
      obj.value = this.value
    }

    return obj
  }

  /**
   * Convert a tree to a string.
   *
   * @param  {Number} [level = 0]
   *
   * @return {String}
   */
  toString (level = 0) {
    return this.edges
      .sort((a, b) => a.key > b.key ? 1 : -1)
      .map(({ key, node }) => {
        const arr = [key]

        if (node.value) {
          arr.push(': ', node.value)
        }

        if (node.edges.length) {
          arr.push('\n', node.toString(level + 1))
        }

        return '  '.repeat(level) + arr.join('')
      })
      .join('\n')
  }
}

module.exports = Tree
