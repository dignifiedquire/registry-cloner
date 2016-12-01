/* @flow */

import Fs from './fs'
import Ipfs from './ipfs'
import Memory from './memory'

export type FileStore = {
  writeFile(p: string, content: string | Buffer): Promise<void>,
  readFile(p: string): Promise<Buffer>
}

export default {
  Fs: Fs,
  Ipfs: Ipfs,
  Memory: Memory
}
