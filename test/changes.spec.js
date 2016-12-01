/* @flow */
/* eslint-env mocha */

import {expect} from 'chai'

import downloadChanges from '../src/changes'
import change4 from './fixtures/change4.json'
import change5 from './fixtures/change5.json'

describe('fetchUpdateSeq', function () {
  this.timeout(20 * 1000)

  it('stores changes into the provided store', async () => {
    const fs = {}
    const store = {
      writeFile (p: string, content: string): Promise<void> {
        fs[p] = content
        return Promise.resolve()
      }
    }

    await downloadChanges(0, 5, store)
    expect(fs).to.be.eql({
      'changes/4.json': JSON.stringify(change4),
      'changes/5.json': JSON.stringify(change5)
    })
  })
})
