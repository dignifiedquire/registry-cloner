/* @flow */
/* eslint-env mocha */

import {expect} from 'chai'
import {tmpdir} from 'os'
import garbage from 'garbage'

import stores from '../../src/stores'

describe('stores.fs', () => {
  it('.writeFile and .readFile', async () => {
    const store = new stores.Fs(tmpdir())

    const filename = 'test.json'
    const content = JSON.stringify(garbage(10))

    await store.writeFile(filename, content)

    const result = await store.readFile(filename)

    expect(result.toString()).to.be.eql(content)
  })
})
