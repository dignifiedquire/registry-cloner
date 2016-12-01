/* @flow */

import request from 'request'
import pump from 'pump'
import sha from 'sha'
import concat from 'concat-stream'
import retry from 'promise-retry'

/**
 * Download the given url, validated with the given sha checksum.
 * Will retry up to `retry` times, which is `4` by default.
 */
export default function downloadRetry (url: string, shasum: string, retries?: number = 4): Promise<Buffer> {
  return retry({
    retries: retries,
    minTimeout: 200,
    maxTimeout: 10 * 1000
  }, (again) => download(url, shasum).catch(again))
}

/**
 * Download the given url, validated with the given sha checksum.
 */
function download (url: string, shasum: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    pump(
      request(url).on('response', (res) => {
        if (res.statusCode >= 400) {
          reject(new Error(`Server responded with code: ${res.statusCode}`))
        }
      }),
      sha.stream(shasum),
      concat(resolve),
      (err) => {
        if (err) {
          reject(err)
          return
        }
      }
    )
  })
}
