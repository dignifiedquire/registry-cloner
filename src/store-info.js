/* @flow */

import series from 'promise.series'

import type {WriteRequest} from './process-changes'
import type {FileStore} from './stores'

/**
 * Process write requests
 */
export default function storeInfo (todos: WriteRequest[], store: FileStore): Promise<void> {
  return series(todos.map((todo) => {
    return store.writeFile(todo.target, todo.content)
  }))
}
