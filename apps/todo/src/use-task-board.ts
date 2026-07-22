import { useCallback, useEffect, useReducer } from 'react'

import {
  getActiveCount,
  getCompletedCount,
  initializeTaskBoard,
  taskBoardReducer,
} from './task-board.js'
import { loadTasks, saveTasks } from './task-storage.js'
import type { TaskLoadResult, TaskSaveResult } from './task-storage.js'
import type { Task, TaskId } from './task.js'

type TaskBoardDependencies = Readonly<{
  createId: () => string
  loadTasks: () => TaskLoadResult
  saveTasks: (tasks: readonly Task[]) => TaskSaveResult
}>

type TaskBoard = Readonly<{
  activeCount: number
  completedCount: number
  draft: string
  handleCompletedClear: () => void
  handleDraftChange: (value: string) => void
  handleReset: () => void
  handleSubmit: () => void
  handleTaskToggle: (id: TaskId) => void
  tasks: readonly Task[]
}>

const loadBrowserTasks = (): TaskLoadResult => loadTasks(localStorage)

const saveBrowserTasks = (tasks: readonly Task[]): TaskSaveResult => saveTasks(localStorage, tasks)

const browserTaskBoardDependencies: TaskBoardDependencies = {
  createId: (): string => crypto.randomUUID(),
  loadTasks: loadBrowserTasks,
  saveTasks: saveBrowserTasks,
}

const initializeTaskBoardFromDependencies = (
  dependencies: TaskBoardDependencies,
): ReturnType<typeof initializeTaskBoard> => initializeTaskBoard(dependencies.loadTasks())

const useTaskBoard = (dependencies: TaskBoardDependencies): TaskBoard => {
  const [state, dispatch] = useReducer(
    taskBoardReducer,
    dependencies,
    initializeTaskBoardFromDependencies,
  )

  // Synchronize reducer state with browser local storage.
  useEffect((): void => {
    dependencies.saveTasks(state.tasks)
  }, [dependencies, state.tasks])

  const handleCompletedClear = useCallback((): void => {
    dispatch({ _tag: 'CompletedTasksCleared' })
  }, [])

  const handleReset = useCallback((): void => {
    dispatch({ _tag: 'TaskBoardReset' })
  }, [])

  const handleSubmit = useCallback((): void => {
    dispatch({ _tag: 'TaskSubmitted', id: dependencies.createId() })
  }, [dependencies])

  const handleTaskToggle = useCallback((id: TaskId): void => {
    dispatch({ _tag: 'TaskToggled', id })
  }, [])

  const handleDraftChange = useCallback((value: string): void => {
    dispatch({ _tag: 'DraftChanged', value })
  }, [])

  return {
    activeCount: getActiveCount(state),
    completedCount: getCompletedCount(state),
    draft: state.draft,
    handleCompletedClear,
    handleDraftChange,
    handleReset,
    handleSubmit,
    handleTaskToggle,
    tasks: state.tasks,
  }
}

export { browserTaskBoardDependencies, type TaskBoard, useTaskBoard }
