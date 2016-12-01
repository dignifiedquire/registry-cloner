/* @flow */
/* eslint-env mocha */

import {expect} from 'chai'

import change4 from './fixtures/change4.json'
import change5 from './fixtures/change5.json'

import process from '../src/process-changes'

describe('processChanges', () => {
  it('generates a tarball list from a set of changes', () => {
    const result = process([change4, change5])

    expect(result.downloads).to.be.eql([{
      shasum: '934758bd8eda6481218e0d6c29dab8c10d573c5c',
      tarball: 'http://registry.npmjs.org/Reston/-/Reston-0.1.1.tgz',
      target: 'Reston/-/Reston-0.1.1.tgz'
    }, {
      shasum: '18f4c291eaf1b0fc3a9a168d5aa685febc5068ff',
      tarball: 'http://registry.npmjs.org/Reston/-/Reston-0.2.0.tgz',
      target: 'Reston/-/Reston-0.2.0.tgz'
    }, {
      shasum: '00a2b5e0beb0ae48149c921ba3254f75bbc58efa',
      tarball: 'http://registry.npmjs.org/asyncevents/-/asyncevents-0.1.0.tgz',
      target: 'asyncevents/-/asyncevents-0.1.0.tgz'
    }])

    expect(result.infos.map((i) => i.target)).to.be.eql([
      'Reston/0.1.1/index.json',
      'Reston/0.2.0/index.json',
      'Reston/latest/index.json',
      'asyncevents/0.1.0/index.json',
      'asyncevents/latest/index.json'
    ])

    expect(result.infos[0].content).to.be.eql('{"name":"Reston","version":"0.1.1","description":"An improved HTTP client library for node.js","contributors":[{"name":"Zohaib Sibt-e-Hassan","email":"zohaib.hassan@gmail.com"}],"homepage":"https://github.com/maxpert/Reston","engines":{"node":">=0.2.5"},"main":"./lib/Reston","repository":"git://github.com/maxpert/Reston.git","author":{"name":"Zohaib Sibt-e-Hassan","url":"http://maxpert.net.tc/"},"_id":"Reston@0.1.1","_engineSupported":true,"_npmVersion":"0.2.18","_nodeVersion":"v0.4.0","directories":{"lib":"./lib"},"files":[""],"_defaultsLoaded":true,"dist":{"shasum":"934758bd8eda6481218e0d6c29dab8c10d573c5c","tarball":"http://registry.npmjs.org/Reston/-/Reston-0.1.1.tgz"}}')
  })
})
