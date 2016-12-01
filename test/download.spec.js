/* @flow */
/* eslint-env mocha */

import {expect} from 'chai'
import nock from 'nock'

import download from '../src/download'

describe('download', () => {
  before(() => {
    nock('http://awesome.com')
      .persist()
      .get('/file')
      .reply(200, 'hello world')
  })

  after(() => {
    nock.cleanAll()
  })

  it('downloads the requested file', async () => {
    const file = await download('http://awesome.com/file', '2aae6c35c94fcfb415dbe95f408b9ce91ee846ed')

    expect(file.toString()).to.be.eql('hello world')
  })

  it('retries the given amount of retries on failure', async function (): Promise<void> {
    this.timeout(10 * 1000)

    nock('http://awesome.com')
      .get('/fail')
      .reply(404)
      .get('/fail')
      .reply(503)
      .get('/fail')
      .reply(200, 'hello world')

    const file = await download('http://awesome.com/fail', '2aae6c35c94fcfb415dbe95f408b9ce91ee846ed', 4)

    expect(file.toString()).to.be.eql('hello world')
  })

  it('fails on non matching shasum', async () => {
    try {
      await download('http://awesome.com/file', 'helloshasum', 0)
    } catch (err) {
      expect(err.message).to.match(/shasum check failed/)
      return
    }

    throw new Error('I shall not be called')
  })
})
