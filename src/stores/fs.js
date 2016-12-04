/* @flow */

import {writeFile as writeFileCb, readFile as readFileCb} from 'fs'
import path from 'path'
import promisify from 'promisify-es6'

const writeFile = promisify(writeFileCb)
const readFile = promisify(readFileCb)

export default class FsStore {
  basePath: string

  constructor (basePath?: string = '/') {
    this.basePath = basePath
  }

  writeFile (p: string, content: string | Buffer): Promise<void> {
    const filename = this.resolve(p)

    return writeFile(filename, content)
  }

  readFile (p: string): Promise<Buffer> {
    const filename = this.resolve(p)

    return readFile(filename)
  }

  /**
   * Join the given path `p` with the `basePath`.
   */
  resolve (p: string): string {
    return path.join(this.basePath, p)
  }
}
