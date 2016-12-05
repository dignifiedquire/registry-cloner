/* @flow */
/* eslint-env mocha */

import {expect} from 'chai'

import {split} from '../src/utils'

describe('utils', () => {
  describe('split', () => {
    it('returns the same interval if length < size', () => {
      expect(split(0, 10, 20)).to.be.eql([[0, 10]])
    })
    it('regular sizes', () => {
      expect(split(0, 49, 10)).to.be.eql([
        [0, 9],
        [10, 19],
        [20, 29],
        [30, 39],
        [40, 49]
      ])
      expect(split(32, 61, 10)).to.be.eql([
        [32, 41],
        [42, 51],
        [52, 61]
      ])
    })
    it('odd sizes', () => {
      expect(split(0, 6, 2)).to.be.eql([
        [0, 1],
        [2, 3],
        [4, 5],
        [6, 6]
      ])

      expect(split(121, 178, 5)).to.be.eql([
        [121, 125],
        [126, 130],
        [131, 135],
        [136, 140],
        [141, 145],
        [146, 150],
        [151, 155],
        [156, 160],
        [161, 165],
        [166, 170],
        [171, 175],
        [176, 178]
      ])
    })
  })
})
