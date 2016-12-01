/* @flow */

import {writeFile, readFile} from 'fs'
import path from 'path'

export default class FsStore {
  basePath: string

  constructor (basePath?: string = '/') {
    this.basePath = basePath
  }

  writeFile (p: string, content: string): Promise<void> {
    const filename = this.resolve(p)

    return new Promise((resolve, reject) => {
      writeFile(filename, content, (err) => {
        if (err) {
          reject(err)
          return
        }

        resolve()
      })
    })
  }

  readFile (p: string): Promise<Buffer> {
    const filename = this.resolve(p)

    return new Promise((resolve, reject) => {
      readFile(filename, (err, content) => {
        if (err) {
          reject(err)
          return
        }

        resolve(content)
      })
    })
  }

  /**
   * Join the given path `p` with the `basePath`.
   */
  resolve (p: string): string {
    return path.join(this.basePath, p)
  }
}
