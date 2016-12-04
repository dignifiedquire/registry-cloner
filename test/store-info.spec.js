/* @flow */
/* eslint-env mocha */

import {expect} from 'chai'

import storeInfo from '../src/store-info'
import stores from '../src/stores'

describe('storeInfo', () => {
  it('stores requests in order', async () => {
    const store = new stores.Memory()

    await storeInfo([{
      target: '/1.json',
      content: '1'
    }, {
      target: '/2.json',
      content: '2'
    }, {
      target: '/1.json',
      content: '10'
    }], store)

    expect(store.fs).to.be.eql({
      '1.json': new Buffer('10'),
      '2.json': new Buffer('2')
    })
  })
})
