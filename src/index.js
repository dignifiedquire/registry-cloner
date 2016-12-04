/* @flow */

import {join} from 'path'

import downloadChanges from './changes'
import fetchUpdateSeq from './update-seq'
import stores from './stores'

type CloneOpts = {
  from: number,
  to: number,
  batchsize: number,
  registry: string
}

const basePath = join(process.cwd(), '.registry')

export default async function clone (opts: CloneOpts): Promise<void> {
  opts = Object.assign({
    from: 0,
    to: -1,
    batchsize: 1000,
    registry: 'https://skimdb.npmjs.com/registry'
  }, opts)

  const store = new stores.Fs(basePath)

  const latestSeq = await fetchUpdateSeq(opts.registry)

  if (opts.to === -1) {
    opts.to = latestSeq
  } else if (opts.to > latestSeq) {
    throw new Error('Can not replicate into the future')
  }

  await downloadChanges(opts.from, Math.min(opts.to, opts.batchsize), store)
}
