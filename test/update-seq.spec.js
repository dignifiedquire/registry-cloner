/* @flow */
/* eslint-env mocha */

import {expect} from 'chai'
import nock from 'nock'

import fetchUpdateSeq from '../src/update-seq'
import registryFixture from './fixtures/registry.json'

describe('fetchUpdateSeq', () => {
  before(() => {
    nock('https://skimdb.npmjs.com')
      .get('/registry')
      .reply(200, registryFixture)
  })

  after(() => {
    nock.restore()
  })

  it('returns the latest update_seq', async () => {
    const updateSeq = await fetchUpdateSeq('https://skimdb.npmjs.com/registry')

    expect(updateSeq).to.be.eql(829184)
  })
})
