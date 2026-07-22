import { expect, test } from 'vitest'

import {
  TASK_TITLE_MAX_LENGTH,
  addTask,
  clearCompletedTasks,
  countCompletedTasks,
  createTask,
  toggleTask,
} from '../task.js'
import type { Task } from '../task.js'

const activeTask: Task = {
  _tag: 'ActiveTask',
  id: { _tag: 'TaskId', value: '1' },
  title: { _tag: 'TaskTitle', value: 'Ship scaffold' },
}

const completedTask: Task = {
  _tag: 'CompletedTask',
  id: { _tag: 'TaskId', value: '2' },
  title: { _tag: 'TaskTitle', value: 'Check linting' },
}

const baseTasks: readonly Task[] = [activeTask, completedTask]

test('createTask trims valid identifiers and titles', () => {
  const result = createTask({ id: ' task-3 ', status: 'ActiveTask', title: ' Write tests ' })

  expect(result).toStrictEqual({
    _tag: 'TaskCreated',
    task: {
      _tag: 'ActiveTask',
      id: { _tag: 'TaskId', value: 'task-3' },
      title: { _tag: 'TaskTitle', value: 'Write tests' },
    },
  })
})

test('createTask returns an explicit failure for an empty identifier', () => {
  const result = createTask({ id: ' ', status: 'ActiveTask', title: 'Write tests' })

  expect(result).toStrictEqual({ _tag: 'InvalidTaskId', value: ' ' })
})

test('createTask returns an explicit failure for an empty title', () => {
  const result = createTask({ id: 'task-3', status: 'ActiveTask', title: '  ' })

  expect(result).toStrictEqual({ _tag: 'InvalidTaskTitle', reason: 'Empty', value: '  ' })
})

test('createTask returns an explicit failure for an overlong title', () => {
  const title = 'a'.repeat(TASK_TITLE_MAX_LENGTH + 1)
  const result = createTask({ id: 'task-3', status: 'ActiveTask', title })

  expect(result).toStrictEqual({ _tag: 'InvalidTaskTitle', reason: 'TooLong', value: title })
})

test('addTask adds an existing task to the front without changing prior tasks', () => {
  const tasks = addTask(baseTasks, activeTask)

  expect(tasks).toStrictEqual([activeTask, ...baseTasks])
})

test('toggleTask changes only the matching task state', () => {
  const tasks = toggleTask(baseTasks, activeTask.id)

  expect(tasks).toStrictEqual([
    { _tag: 'CompletedTask', id: activeTask.id, title: activeTask.title },
    completedTask,
  ])
})

test('toggleTask changes a completed task back to active', () => {
  const tasks = toggleTask(baseTasks, completedTask.id)

  expect(tasks).toStrictEqual([
    activeTask,
    { _tag: 'ActiveTask', id: completedTask.id, title: completedTask.title },
  ])
})

test('clearCompletedTasks retains only active tasks', () => {
  const tasks = clearCompletedTasks(baseTasks)

  expect(tasks).toStrictEqual([activeTask])
})

test('countCompletedTasks counts tagged completed states', () => {
  expect(countCompletedTasks(baseTasks)).toBe(1)
})
