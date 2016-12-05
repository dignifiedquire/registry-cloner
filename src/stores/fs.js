/* @flow */

import {
  writeFile as writeFileCb,
  readFile as readFileCb,
  readdir as readdirCb
} from 'fs'
import promisify from 'promisify-es6'
import mkdirpCb from 'mkdirp'

const writeFile = promisify(writeFileCb)
const readFile = promisify(readFileCb)
const mkdirp = promisify(mkdirpCb)
const readdir = promisify(readdirCb)

import Store from './base'

export default class FsStore extends Store {
  _writeFile (p: string, content: Buffer): Promise<void> {
    return writeFile(p, content)
  }

  _readFile (p: string): Promise<Buffer> {
    return readFile(p)
  }

  mkdirp (dirname: string): Promise<void> {
    return mkdirp(this.resolve(dirname))
  }

  _ls (dirname: string): Promise<Array<string>> {
    return readdir(dirname)
  }
}
