/* @flow */
/* eslint-env mocha */

import {expect} from 'chai'
import {tmpdir} from 'os'
import {join} from 'path'

import stores from '../../src/stores'

describe('stores.fs', () => {
  it('.writeFile and .readFile', async () => {
    const filename = join(tmpdir(), 'test.json')
    const content = JSON.stringify({hello: 'world'})

    await stores.fs.writeFile(filename, content)

    const result = await stores.fs.readFile(filename)

    expect(result.toString()).to.be.eql(content)
  })
})
