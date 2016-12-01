/* @flow */

import downloadChanges from './changes'
import fetchUpdateSeq from './update-seq'

type CloneOpts = {
  from: number,
  to: number,
  batchsize: number
}

export default function clone (opts: CloneOpts): Promise<void> {
  opts = Object.assign(opts, {
    from: 0,
    to: -1,
    batchsize: 1000
  })

  return fetchUpdateSeq()
    .then((latestSeq) => {
      if (opts.to === -1) {
        opts.to = latestSeq
      } else if (opts.to > latestSeq) {
        throw new Error('Can not replicate into the future')
      }

      return downloadChanges(opts.from, Math.min(opts.to, opts.batchsize))
    })
}
