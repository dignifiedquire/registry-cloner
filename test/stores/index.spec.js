/* @flow */
/* eslint-env mocha */

import {expect} from 'chai'
import {tmpdir} from 'os'
import garbage from 'garbage'
import rimrafCb from 'rimraf'
import promisify from 'promisify-es6'
import IPFS from 'ipfs-daemon'

const rimraf = promisify(rimrafCb)

import type {FileStore} from '../../src/stores'
import stores from '../../src/stores'

describe('stores', () => {
  let dir
  storeTests('fs', {
    setup (): Promise<FileStore> {
      dir = tmpdir() + '/me'
      return Promise.resolve(new stores.Fs(dir))
    },
    teardown (): Promise<void> {
      return rimraf(dir)
    }
  })

  storeTests('memory', {
    setup (): Promise<FileStore> {
      dir = tmpdir() + '/me'
      return Promise.resolve(new stores.Memory())
    },
    teardown (): Promise<void> {
      return Promise.resolve()
    }
  })

  let ipfs
  storeTests('ipfs', {
    setup (): Promise<FileStore> {
      return new Promise((resolve, reject) => {
        ipfs = new IPFS({
          IpfsDataDir: tmpdir()
        })

        ipfs.on('ready', () => {
          resolve(new stores.Ipfs('/me'))
        })
        ipfs.on('error', (err) => {
          throw err
        })
      })
    },
    teardown (): Promise<void> {
      ipfs.stop()
      return Promise.resolve()
    }
  })
})

function storeTests (name: string, config: {setup: () => Promise<FileStore>, teardown: () => Promise<void>}) {
  describe(name, function () {
    this.timeout(20 * 1000)

    let store
    beforeEach(async () => {
      store = await config.setup()
    })

    afterEach(config.teardown)

    it('writeFile & readFile', async () => {
      const filename = 'test.json'
      const content = JSON.stringify(garbage(10))

      await store.writeFile(filename, content)

      const result = await store.readFile(filename)

      expect(result.toString()).to.be.eql(content)
    })

    it('ls & mkdirp', async () => {
      await store.writeFile('hello/file1.txt', 'hello')
      await store.writeFile('hello/world.txt', 'world')
      await store.mkdirp('world/end')

      const ls1 = await store.ls('hello')
      expect(ls1).to.be.eql(['file1.txt', 'world.txt'])

      const ls2 = await store.ls('/')
      expect(ls2).to.be.eql(['hello', 'world'])

      const ls3 = await store.ls('world')
      expect(ls3).to.be.eql(['end'])
    })
  })
}
