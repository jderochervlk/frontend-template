import type { Task } from './tasks.js'

const STORAGE_KEY = 'codex-app.tasks'

const isTask = (value: unknown): value is Task => {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const candidate = value as Partial<Task>

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.title === 'string' &&
    typeof candidate.completed === 'boolean'
  )
}

const parseTasks = (value: string): Task[] => {
  try {
    const parsed = JSON.parse(value) as unknown

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter((task) => isTask(task))
  } catch {
    return []
  }
}

const loadTasks = (): Task[] => {
  if (typeof document !== 'object') {
    return []
  }

  const value = localStorage.getItem(STORAGE_KEY)

  if (value === null || value === '') {
    return []
  }

  return parseTasks(value)
}

const saveTasks = (tasks: readonly Task[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

export { loadTasks, saveTasks }
