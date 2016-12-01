/* @flow */
/* eslint-env mocha */

import {expect} from 'chai'

import downloadChanges from '../src/changes'
import change4 from './fixtures/change4.json'
import change5 from './fixtures/change5.json'

import stores from '../src/stores'

describe('fetchUpdateSeq', function () {
  this.timeout(20 * 1000)

  it('stores changes into the provided store', async () => {
    const store = new stores.Memory()

    await downloadChanges(0, 5, store)
    expect(store.fs).to.be.eql({
      'changes/4.json': new Buffer(JSON.stringify(change4)),
      'changes/5.json': new Buffer(JSON.stringify(change5))
    })
  })
})
