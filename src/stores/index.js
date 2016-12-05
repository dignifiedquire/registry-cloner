/* @flow */

import Fs from './fs'
import Ipfs from './ipfs'
import Memory from './memory'

export type FileStore = {
  writeFile(p: string, content: string | Buffer): Promise<void>,
  readFile(p: string): Promise<Buffer>,
  ls(p: string): Promise<Array<string>>,
  mkdirp(p: string): Promise<void>
}

export type StoreType = 'Fs' | 'Ipfs' | 'Memory'

export type StoreConfig = {
  type: StoreType,
  opts?: {[id: string]: any},
  basePath?: string
}

export default {
  Fs: Fs,
  Ipfs: Ipfs,
  Memory: Memory
}
