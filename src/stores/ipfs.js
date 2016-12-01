/* @flow */

import API from 'ipfs-api'
import path from 'path'
import concat from 'concat-stream'

import type {Readable} from 'stream'

type StoreOpts = {
  flush: boolean,
  url?: string
}

export default class IpfsStore {
  api: typeof API
  basePath: string
  flush: boolean

  constructor (basePath?: string = '/', opts?: StoreOpts = {flush: false}) {
    this.api = new API(opts.url)
    this.basePath = basePath
    this.flush = opts.flush
  }

  async writeFile (p: string, content: (string | Buffer)): Promise<void> {
    const filename = this.resolve(p)

    // 1. Ensure the containing directory exists
    await this.ensurePath(filename)

    // 2. Create the file

    if (typeof content === 'string') {
      content = new Buffer(content)
    }

    return this.api.files.write(filename, content, {
      e: true, // create if not exists
      flush: this.flush
    })
  }

  async readFile (p: string): Promise<Buffer> {
    const stream = await this.readFileStream(p)

    return new Promise((resolve, reject) => {
      stream
        .pipe(concat((content) => resolve(content)))
        .once('error', reject)
    })
  }

  readFileStream (p: string): Promise<Readable> {
    const filename = this.resolve(p)

    return this.api.files.read(filename)
  }

  /**
   * Ensure all directories on the given path exist.
   */
  ensurePath (p: string): Promise<void> {
    const filename = this.resolve(p)
    const dirname = path.dirname(filename)

    return this.mkdirp(dirname)
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

  /**
   * Join the given path `p` with the `basePath`.
   */
  resolve (p: string): string {
    return path.join(this.basePath, p)
  }
}
