/* @flow */

import path from 'path'

export default class Store {
  basePath: string

  constructor (basePath?: string = '/') {
    this.basePath = basePath
  }

  async writeFile (p: string, content: (string | Buffer)): Promise<void> {
    const filename = this.resolve(p)

    // 1. Ensure the containing directory exists
    await this.ensurePath(filename)

    // 2. Create the file

    if (typeof content === 'string') {
      content = new Buffer(content)
    }

    return this._writeFile(filename, content)
  }

  async _writeFile (filename: string, content: Buffer): Promise<void> {
    return Promise.reject('implement me')
  }

  async readFile (p: string): Promise<Buffer> {
    const filename = this.resolve(p)
    return this._readFile(filename)
  }

  async _readFile (filname: string): Promise<Buffer> {
    return Promise.reject('implement me')
  }

  /**
   * Ensure all directories on the given path exist.
   */
  ensurePath (p: string): Promise<void> {
    const filename = this.resolve(p)
    const dirname = path.dirname(filename)

    return this.mkdirp(dirname)
  }

  /**
   * Create all directories for this path
   */
  mkdirp (dirname: string): Promise<void> {
    return Promise.reject('implement me')
  }

  /**
   * Join the given path `p` with the `basePath`.
   */
  resolve (p: string): string {
    return path.resolve(this.basePath, p)
  }
}
