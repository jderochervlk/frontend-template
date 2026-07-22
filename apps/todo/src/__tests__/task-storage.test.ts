import { expect, test, vi } from 'vitest'

import { STORAGE_KEY, loadTasks, parseTasks, saveTasks } from '../task-storage.js'
import type { StoragePort } from '../task-storage.js'
import type { Task } from '../task.js'

const storedTasks =
  '[{"completed":false,"id":"1","title":"Ship scaffold"},{"completed":true,"id":"2","title":"Check linting"}]'
const missingStoredValue = new URLSearchParams().get('tasks')

const activeTask: Task = {
  _tag: 'ActiveTask',
  id: { _tag: 'TaskId', value: '1' },
  title: { _tag: 'TaskTitle', value: 'Ship scaffold' },
}

const createStorage = (storedValue: string | null): StoragePort => {
  const writes = new Map<string, string>()

  return {
    getItem: vi.fn<StoragePort['getItem']>(() => storedValue),
    setItem: vi.fn<StoragePort['setItem']>((key, value): void => {
      writes.set(key, value)
    }),
  }
}

test('parseTasks decodes persisted booleans into tagged domain states', () => {
  const result = parseTasks(storedTasks)

  expect(result).toStrictEqual({
    _tag: 'TasksLoaded',
    tasks: [
      activeTask,
      {
        _tag: 'CompletedTask',
        id: { _tag: 'TaskId', value: '2' },
        title: { _tag: 'TaskTitle', value: 'Check linting' },
      },
    ],
  })
})

test('parseTasks returns a typed failure for invalid JSON', () => {
  expect(parseTasks('{')).toStrictEqual({ _tag: 'TasksLoadFailed', reason: 'InvalidJson' })
})

test('parseTasks returns a typed failure for a non-array payload', () => {
  expect(parseTasks('{}')).toStrictEqual({ _tag: 'TasksLoadFailed', reason: 'InvalidShape' })
})

test('parseTasks drops malformed entries at the external data boundary', () => {
  const result = parseTasks(`[{"id":1},${storedTasks.slice(1)}`)

  expect(result).toStrictEqual({
    _tag: 'TasksLoaded',
    tasks: [
      activeTask,
      {
        _tag: 'CompletedTask',
        id: { _tag: 'TaskId', value: '2' },
        title: { _tag: 'TaskTitle', value: 'Check linting' },
      },
    ],
  })
})

test('loadTasks reads from the injected storage port', () => {
  const storage = createStorage(storedTasks)
  const result = loadTasks(storage)

  expect(result).toStrictEqual(parseTasks(storedTasks))
  expect(storage.getItem).toHaveBeenCalledExactlyOnceWith(STORAGE_KEY)
})

test('loadTasks treats a missing stored value as an empty task list', () => {
  const result = loadTasks(createStorage(missingStoredValue))

  expect(result).toStrictEqual({ _tag: 'TasksLoaded', tasks: [] })
})

test('saveTasks serializes tagged tasks through the injected storage port', () => {
  const storage = createStorage(missingStoredValue)
  const result = saveTasks(storage, [activeTask])

  expect(result).toStrictEqual({ _tag: 'TasksSaved' })
  expect(storage.setItem).toHaveBeenCalledExactlyOnceWith(
    STORAGE_KEY,
    '[{"completed":false,"id":"1","title":"Ship scaffold"}]',
  )
})
