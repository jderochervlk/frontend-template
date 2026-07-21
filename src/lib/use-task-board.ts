import { useCallback, useEffect, useMemo, useState } from 'react'
import type React from 'react'
import { addTask, clearCompletedTasks, toggleTask } from './tasks.js'
import { loadTasks, saveTasks } from './task-storage.js'
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

export const useTaskBoard = (): TaskBoard => {
  const [tasks, setTasks] = useState<Task[]>(loadTasks)
  const [draft, setDraft] = useState('')
  const completedCount = useMemo(() => tasks.filter((task) => task.completed).length, [tasks])

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const handleDraftChange = useCallback((event: Readonly<React.ChangeEvent<HTMLInputElement>>): void => {
    setDraft(event.target.value)
  }, [])

  const handleSubmit = useCallback((event: Readonly<React.SyntheticEvent<HTMLFormElement>>): void => {
    event.preventDefault()

    const nextTitle = draft.trim()
    if (nextTitle === '') {
      return
    }

    setTasks((current) => addTask(current, nextTitle))
    setDraft('')
  }, [draft])

  const handleToggle = useCallback((event: Readonly<React.ChangeEvent<HTMLInputElement>>): void => {
    setTasks((current) => toggleTask(current, event.target.value))
  }, [])

  const handleClear = useCallback((): void => {
    setTasks((current) => clearCompletedTasks(current))
  }, [])

  const handleReset = useCallback((): void => {
    setTasks([])
  }, [])

  return {
    activeCount: tasks.length - completedCount,
    completedCount,
    draft,
    handleClear,
    handleDraftChange,
    handleReset,
    handleSubmit,
    handleToggle,
    tasks,
  }
}
