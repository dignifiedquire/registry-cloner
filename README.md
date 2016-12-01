# registry-cloner

> replicate the npm registry into ipfs

## Algorithm

### 1. Change Feed

1. filter for `doc.name`
2. normalize doc
3. write doc to /changes/<seq>.json

### 2. Worker Manager

1. Generate tarballs list
  - flatmap doc.versions to version.dist
2. Spawn workers and distribute available tarballs
3. aggregate versions as
  - doc.versions
  - doc.dist-tags mapped to the version in doc.versions
4. Process module jsons serially, for each version
  - put json to `/npm-registry/<module>/<version>/index.json`

### 3. Worker

Inputs:
- url
- shasum
- target path: `/npm-registry/<module>/-/<module>-<version>.tgz`

1. Download url
2. Verify shasum
3. Save to target path

### 4. After each batch run flush & verification

1. `ipfs files stat /npm-registry`
2. Generate tarballs list from all changes, and for each
  1. verify the shasum of the tarball in ipfs
