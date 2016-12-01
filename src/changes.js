/* @flow */

import follow from 'concurrent-couch-follower'
import normalize from 'normalize-registry-metadata'
import {join} from 'path'
import eos from 'end-of-stream'

import type {FileStore} from './stores'

export default function downloadChanges (from: number, to: number, store: FileStore): Promise<void> {
  const followOptions = {
    db: 'https://replicate.npmjs.com/registry/_changes',
    include_docs: true,
    sequence: () => {},
    now: false,
    concurrency: 5,
    since: from
  }
  const basePath = 'changes'

  return new Promise((resolve, reject) => {
    let stream

    const onChange = function (change: {[id: string]: any}, done: () => void) {
      if (change.seq > to) {
        stream.end()
        done()
        return
      }

      // Ignore design document changes
      if (!change.doc.name) {
        return
      }

      normalize(change.doc)

      const filename = join(basePath, `${change.seq}.json`)
      store
        .writeFile(filename, JSON.stringify(change.doc))
        .then(done, done)
    }

    stream = follow(onChange, followOptions)

    eos(stream, (err) => {
      // Ignore errore due to manual end
      if (err && err.message !== 'premature close') {
        reject(err)
        return
      }

      resolve()
    })
  })
}
