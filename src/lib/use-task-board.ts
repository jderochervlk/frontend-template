import { useCallback, useEffect, useMemo, useState } from 'react'
import type React from 'react'

import { loadTasks, saveTasks } from './task-storage.js'
import { addTask, clearCompletedTasks, toggleTask } from './tasks.js'
import type { Task } from './tasks.js'

export type TaskBoard = Readonly<{
  activeCount: number
  completedCount: number
  draft: string
  handleClear: () => void
  handleDraftChange: (event: Readonly<React.ChangeEvent<HTMLInputElement>>) => void
  handleReset: () => void
  handleSubmit: (event: Readonly<React.SyntheticEvent<HTMLFormElement>>) => void
  handleToggle: (event: Readonly<React.ChangeEvent<HTMLInputElement>>) => void
  tasks: readonly Task[]
}>

type PersistentTasks = Readonly<{
  addTaskByTitle: (title: string) => void
  clearCompleted: () => void
  reset: () => void
  tasks: readonly Task[]
  toggleTaskById: (id: string) => void
}>

const usePersistentTasks = (): PersistentTasks => {
  const [tasks, setTasks] = useState<Task[]>(loadTasks)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const addTaskByTitle = useCallback((title: string): void => {
    setTasks((current) => addTask(current, title))
  }, [])

  const clearCompleted = useCallback((): void => {
    setTasks((current) => clearCompletedTasks(current))
  }, [])

  const reset = useCallback((): void => {
    setTasks([])
  }, [])

  const toggleTaskById = useCallback((id: string): void => {
    setTasks((current) => toggleTask(current, id))
  }, [])

  return { addTaskByTitle, clearCompleted, reset, tasks, toggleTaskById }
}

export const useTaskBoard = (): TaskBoard => {
  const { addTaskByTitle, clearCompleted, reset, tasks, toggleTaskById } = usePersistentTasks()
  const [draft, setDraft] = useState('')
  const completedCount = useMemo(() => tasks.filter((task) => task.completed).length, [tasks])

  const handleDraftChange = useCallback(
    (event: Readonly<React.ChangeEvent<HTMLInputElement>>): void => {
      setDraft(event.target.value)
    },
    [],
  )

  const handleSubmit = useCallback(
    (event: Readonly<React.SyntheticEvent<HTMLFormElement>>): void => {
      event.preventDefault()

      const nextTitle = draft.trim()
      if (nextTitle === '') {
        return
      }

      addTaskByTitle(nextTitle)
      setDraft('')
    },
    [addTaskByTitle, draft],
  )

  const handleToggle = useCallback(
    (event: Readonly<React.ChangeEvent<HTMLInputElement>>): void => {
      toggleTaskById(event.target.value)
    },
    [toggleTaskById],
  )

  return {
    activeCount: tasks.length - completedCount,
    completedCount,
    draft,
    handleClear: clearCompleted,
    handleDraftChange,
    handleReset: reset,
    handleSubmit,
    handleToggle,
    tasks,
  }
}
