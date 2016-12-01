/* @flow */
/* eslint-env mocha */

import {expect} from 'chai'
import IPFS from 'ipfs-daemon'
import {tmpdir} from 'os'
import garbage from 'garbage'

import stores from '../../src/stores'

describe('stores.ipfs', function () {
  this.timeout(20 * 1000)

  let ipfs
  before((done) => {
    ipfs = new IPFS({
      IpfsDataDir: tmpdir()
    })

    ipfs.on('ready', done)
    ipfs.on('error', (err) => {
      throw err
    })
  })

  after(() => {
    ipfs.stop()
  })

  it('.writeFile and .readFile', async () => {
    const store = new stores.Ipfs('/test')

    const filename = 'test.json'
    const content = JSON.stringify(garbage(10))

    await store.writeFile(filename, content)

    const result = await store.readFile(filename)

    expect(result.toString()).to.be.eql(content)
  })
})
