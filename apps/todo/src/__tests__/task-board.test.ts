import { expect, test } from 'vitest'

import {
  getActiveCount,
  getCompletedCount,
  initializeTaskBoard,
  taskBoardReducer,
} from '../task-board.js'
import type { TaskBoardState } from '../task-board.js'
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

const state: TaskBoardState = {
  draft: 'Write tests',
  tasks: [activeTask, completedTask],
}

test('initializeTaskBoard uses loaded tasks and an empty draft', () => {
  const result = initializeTaskBoard({ _tag: 'TasksLoaded', tasks: [activeTask] })

  expect(result).toStrictEqual({ draft: '', tasks: [activeTask] })
})

test('initializeTaskBoard recovers from a load failure with no tasks', () => {
  const result = initializeTaskBoard({ _tag: 'TasksLoadFailed', reason: 'InvalidJson' })

  expect(result).toStrictEqual({ draft: '', tasks: [] })
})

test('taskBoardReducer updates the draft without changing tasks', () => {
  const result = taskBoardReducer(state, { _tag: 'DraftChanged', value: 'Review tests' })

  expect(result).toStrictEqual({ draft: 'Review tests', tasks: state.tasks })
})

test('taskBoardReducer submits a valid trimmed task and clears the draft', () => {
  const result = taskBoardReducer(state, { _tag: 'TaskSubmitted', id: '3' })

  expect(result).toStrictEqual({
    draft: '',
    tasks: [
      {
        _tag: 'ActiveTask',
        id: { _tag: 'TaskId', value: '3' },
        title: { _tag: 'TaskTitle', value: 'Write tests' },
      },
      ...state.tasks,
    ],
  })
})

test('taskBoardReducer leaves state unchanged when submission is invalid', () => {
  const invalidState: TaskBoardState = { draft: ' ', tasks: state.tasks }
  const result = taskBoardReducer(invalidState, { _tag: 'TaskSubmitted', id: '3' })

  expect(result).toBe(invalidState)
})

test('taskBoardReducer toggles a task by its refined identifier', () => {
  const result = taskBoardReducer(state, { _tag: 'TaskToggled', id: activeTask.id })

  expect(result.tasks[0]).toStrictEqual({
    _tag: 'CompletedTask',
    id: activeTask.id,
    title: activeTask.title,
  })
})

test('taskBoardReducer removes completed tasks', () => {
  const result = taskBoardReducer(state, { _tag: 'CompletedTasksCleared' })

  expect(result).toStrictEqual({ draft: state.draft, tasks: [activeTask] })
})

test('taskBoardReducer resets tasks while retaining the current draft', () => {
  const result = taskBoardReducer(state, { _tag: 'TaskBoardReset' })

  expect(result).toStrictEqual({ draft: state.draft, tasks: [] })
})

test('task board count selectors derive active and completed counts', () => {
  expect(getActiveCount(state)).toBe(1)
  expect(getCompletedCount(state)).toBe(1)
})
