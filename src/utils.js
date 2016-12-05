/* @flow */

import assert from 'assert'

/**
 * Split an interval into intervals of max size `size`.
 * `start` and `end` are inclusive.
 */
export function split (start: number, end: number, size: number): Array<Array<number>> {
  assert(start < end, 'End must be greater than start')

  const length = end - start + 1

  if (size > length) {
    return [[start, end]]
  }

  const numIntervals = Math.ceil(length / size)
  const intervals = new Array(numIntervals)

  for (let i = 0; i < numIntervals; i++) {
    intervals[i] = [
      start + (i * size),
      Math.min(start + ((i + 1) * size) - 1, end)
    ]
  }

  return intervals
}
