/* @flow */

import request from 'request'

export default function fetchUpdateSeq (registry: string): Promise<number> {
  return new Promise((resolve, reject) => {
    request(registry, (err, req, body) => {
      if (err) {
        return reject(err)
      }

      const parsed = JSON.parse(body)

      resolve(parsed.update_seq)
    })
  })
}
