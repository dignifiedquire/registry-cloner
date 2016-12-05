/* @flow */

import {get, set} from 'lodash'

import Store from './base'

export default class MemoryStore extends Store {
  fs: {[id: string]: any}

  constructor (basePath?: string) {
    super(basePath)
    this.fs = {}
  }

  _writeFile (p: string, content: Buffer): Promise<void> {
    set(this.fs, p.replace(/^\//, '').split('/'), content)
    return Promise.resolve()
  }

  _readFile (p: string): Promise<Buffer> {
    const val = get(this.fs, p.replace(/^\//, '').split('/'))
    if (val != null) {
      return Promise.resolve(val)
    }

    return Promise.reject(new Error('Not found'))
  }

  _ls (p: string): Promise<Array<string>> {
    let val
    if (p === '/') {
      val = this.fs
    } else {
      val = get(this.fs, p.replace(/^\//, '').split('/'))
    }

    return Promise.resolve(Object.keys(val))
  }

  mkdirp (dirname: string): Promise<void> {
    dirname.split('/').reduce((cur, part) => {
      if (part && !cur[part]) {
        cur[part] = {}
      }

      return part ? cur[part] : cur
    }, this.fs)

    return Promise.resolve()
  }
}
