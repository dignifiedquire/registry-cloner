/* @flow */

import API from 'ipfs-api'
import concat from 'concat-stream'

import Store from './base'

type StoreOpts = {
  flush: boolean,
  url?: string
}

export default class IpfsStore extends Store {
  api: typeof API
  flush: boolean

  constructor (basePath?: string = '/', opts?: StoreOpts = {flush: false}) {
    super(basePath)
    this.api = new API(opts.url)
    this.flush = opts.flush
  }

  _writeFile (filename: string, content: Buffer): Promise<void> {
    return this.api.files.write(filename, content, {
      e: true, // create if not exists
      flush: this.flush
    })
  }

  async _readFile (p: string): Promise<Buffer> {
    const stream = await this.api.files.read(p)

    return new Promise((resolve, reject) => {
      stream
        .pipe(concat((content) => resolve(content)))
        .once('error', reject)
    })
  }

  /**
   * Create all directories for this path
   */
  mkdirp (dirname: string): Promise<void> {
    return this.api.files.mkdir(dirname, {
      p: true,
      flush: this.flush
    })
  }
}
