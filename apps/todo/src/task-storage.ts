import { createTask } from './task.js'
import type { Task, TaskCreationInput } from './task.js'

const STORAGE_KEY = 'codex-app.tasks'

type StoragePort = Readonly<{
  getItem: (key: string) => string | null
  setItem: (key: string, value: string) => void
}>

type StoredTask = Readonly<{
  completed: boolean
  id: string
  title: string
}>

type TasksLoaded = Readonly<{
  _tag: 'TasksLoaded'
  tasks: readonly Task[]
}>

type TasksLoadFailed = Readonly<{
  _tag: 'TasksLoadFailed'
  reason: 'InvalidJson' | 'InvalidShape' | 'StorageReadFailed'
}>

type TaskLoadResult = TasksLoadFailed | TasksLoaded

type TasksSaved = Readonly<{
  _tag: 'TasksSaved'
}>

type TasksSaveFailed = Readonly<{
  _tag: 'TasksSaveFailed'
  reason: 'StorageWriteFailed'
}>

type TaskSaveResult = TasksSaveFailed | TasksSaved

const isStoredTask = (value: unknown): value is StoredTask =>
  typeof value === 'object' &&
  value !== null &&
  'completed' in value &&
  typeof value.completed === 'boolean' &&
  'id' in value &&
  typeof value.id === 'string' &&
  'title' in value &&
  typeof value.title === 'string'

const toTaskCreationInput = (task: StoredTask): TaskCreationInput => ({
  id: task.id,
  status: task.completed ? 'CompletedTask' : 'ActiveTask',
  title: task.title,
})

const decodeStoredTask = (value: unknown): readonly Task[] => {
  if (!isStoredTask(value)) {
    return []
  }

  const result = createTask(toTaskCreationInput(value))
  const { _tag: resultTag } = result
  return resultTag === 'TaskCreated' ? [result.task] : []
}

const decodeStoredTasks = (value: unknown): TaskLoadResult => {
  if (!Array.isArray(value)) {
    return { _tag: 'TasksLoadFailed', reason: 'InvalidShape' }
  }

  return { _tag: 'TasksLoaded', tasks: value.flatMap((item) => decodeStoredTask(item)) }
}

const parseTasks = (value: string): TaskLoadResult => {
  try {
    const parsed: unknown = JSON.parse(value)
    return decodeStoredTasks(parsed)
  } catch {
    return { _tag: 'TasksLoadFailed', reason: 'InvalidJson' }
  }
}

const loadTasks = (storage: StoragePort): TaskLoadResult => {
  try {
    const value = storage.getItem(STORAGE_KEY)
    return value === null || value === '' ? { _tag: 'TasksLoaded', tasks: [] } : parseTasks(value)
  } catch {
    return { _tag: 'TasksLoadFailed', reason: 'StorageReadFailed' }
  }
}

const isCompletedTask = ({ _tag: taskTag }: Task): boolean => taskTag === 'CompletedTask'

const toStoredTask = (task: Task): StoredTask => ({
  completed: isCompletedTask(task),
  id: task.id.value,
  title: task.title.value,
})

const saveTasks = (storage: StoragePort, tasks: readonly Task[]): TaskSaveResult => {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(tasks.map((task) => toStoredTask(task))))
    return { _tag: 'TasksSaved' }
  } catch {
    return { _tag: 'TasksSaveFailed', reason: 'StorageWriteFailed' }
  }
}

export {
  loadTasks,
  parseTasks,
  saveTasks,
  STORAGE_KEY,
  type StoragePort,
  type TaskLoadResult,
  type TaskSaveResult,
}
