/* @flow */

export default class MemoryStore {
  fs: {[id: string]: any}

  constructor () {
    this.fs = {}
  }

  writeFile (p: string, content: string | Buffer): Promise<void> {
    if (typeof content === 'string') {
      content = new Buffer(content)
    }

    this.fs[p] = new Buffer(content)
    return Promise.resolve()
  }

  readFile (p: string): Promise<Buffer> {
    if (this.fs[p]) {
      return Promise.resolve(this.fs[p])
    }

    return Promise.reject(new Error('Not found'))
  }
}
