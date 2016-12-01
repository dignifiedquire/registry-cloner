/* @flow */

import {writeFile} from 'fs'

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
  }
}
