/* @flow */

import {writeFile, readFile} from 'fs'

export default {
  writeFile (p: string, content: string): Promise<void> {
    return new Promise((resolve, reject) => {
      writeFile(p, content, (err) => {
        if (err) {
          reject(err)
          return
        }

        resolve()
      })
    })
  },

  readFile (p: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      readFile(p, (err, content) => {
        if (err) {
          reject(err)
          return
        }

        resolve(content)
      })
    })
  }
}
