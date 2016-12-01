/* @flow */

import {
  flatten,
  mapValues,
  map
} from 'lodash'

type Version = {
  name: string,
  dist: {
    shasum: string,
    tarball: string
  }
}

type Change = {
  _id: string,
  _rev: string,
  name: string,
  versions: {
    [id: string]: Version
  },
  'dist-tags': {
    [id: string]: string
  }
}

export type DownloadRequest = {
  tarball: string,
  shasum: string,
  target: string
}

export type WriteRequest = {
  content: string,
  target: string
}

type ProcessResults = {
  downloads: DownloadRequest[],
  infos: WriteRequest[]
}

export default function process (changes: Change[]): ProcessResults {
  const downloads = flatten(changes.map((change) => {
    return flatten(map(change.versions, (info, version) => {
      const name = info.name

      return {
        tarball: info.dist.tarball,
        shasum: info.dist.shasum,
        target: `${name}/-/${name}-${version}.tgz`
      }
    }))
  }))

  const infos = flatten(changes.map((change) => {
    const versions = change.versions
    const mappedTags = mapValues(
      change['dist-tags'],
      (version) => versions[version])

    return map(Object.assign(versions, mappedTags), (info, tagOrVersion) => ({
      target: `${info.name}/${tagOrVersion}/index.json`,
      content: JSON.stringify(info)
    }))
  }))

  return {
    downloads,
    infos
  }
}
