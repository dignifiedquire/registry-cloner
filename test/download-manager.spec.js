/* @flow */
/* eslint-env mocha */

import {expect} from 'chai'
import {tmpdir} from 'os'
import {join} from 'path'
import {readFile as readFileCb} from 'fs'
import promisify from 'promisify-es6'

const readFile = promisify(readFileCb)

import Manager from '../src/download-manager'

describe('DownloadManager', function () {
  this.timeout(10 * 1000)

  it('downloads the requested files', async () => {
    const dir = tmpdir()
    const manager = new Manager({type: 'Fs', basePath: dir})

    const reqs = [{
      tarball: 'https://registry.npmjs.org/ww/-/ww-0.0.0.tgz',
      shasum: 'b21a62b017067f15081248b7ca42764600ee84fa',
      target: 'file1.txt'
    }, {
      tarball: 'https://registry.npmjs.org/utf7/-/utf7-1.0.0.tgz',
      shasum: '70c895de9d85b8ee7ef5a1fa8e169241c46e72cc',
      target: 'file2.txt'
    }]

    await Promise.all(
      reqs.map((req) => manager.download(req))
    )

    const file1 = await readFile(join(dir, 'file1.txt'))
    const file2 = await readFile(join(dir, 'file2.txt'))

    const wwFixture = await readFile(join(__dirname, 'fixtures', 'ww-0.0.0.tgz'))
    const utf7Fixture = await readFile(join(__dirname, 'fixtures', 'utf7-1.0.0.tgz'))
    expect(file1).to.be.eql(wwFixture)
    expect(file2).to.be.eql(utf7Fixture)
  })
})
