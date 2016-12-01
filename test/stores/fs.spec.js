/* @flow */
/* eslint-env mocha */

import {expect} from 'chai'
import {tmpdir} from 'os'
import {join} from 'path'
import fs from 'fs'

import stores from '../../src/stores'

function readFile (p: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(p, (err, content) => {
      if (err) {
        reject(err)
        return
      }

      resolve(content.toString())
    })
  })
}

describe('stores.fs', () => {
  it('.writeFile', async () => {
    const filename = join(tmpdir(), 'test.json')
    const content = JSON.stringify({hello: 'world'})

    await stores.fs.writeFile(filename, content)

    const result = await readFile(filename)

    expect(result).to.be.eql(content)
  })
})
