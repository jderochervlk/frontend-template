import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { addTask, clearCompletedTasks, toggleTask } from './lib/tasks.js'
import type { Task } from './lib/tasks.js'

const STORAGE_KEY = 'codex-app.tasks'

function loadTasks(): Task[] {
  if (typeof window === 'undefined') {
    return []
  }

  const value = localStorage.getItem(STORAGE_KEY)

  if (!value) {
    return []
  }

  try {
    const parsed = JSON.parse(value) as unknown

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter(isTask)
  } catch {
    return []
  }
}

function isTask(value: unknown): value is Task {
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

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks)
  const [draft, setDraft] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const completedCount = useMemo(() => tasks.filter((task) => task.completed).length, [tasks])

  const activeCount = tasks.length - completedCount

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextTitle = draft.trim()
    if (!nextTitle) {
      return
    }

    setTasks((current) => addTask(current, nextTitle))
    setDraft('')
  }

  return (
    <main className='app-shell'>
      <section className='workspace'>
        <header className='workspace__header'>
          <div>
            <p className='eyebrow'>Starter app</p>
            <h1>Task board</h1>
          </div>
          <p className='workspace__status'>
            {activeCount} open, {completedCount} done
          </p>
        </header>

        <form className='task-form' onSubmit={handleSubmit}>
          <input
            aria-label='Task title'
            className='task-form__input'
            maxLength={120}
            name='title'
            onChange={(event) =>{  setDraft(event.target.value); }}
            placeholder='Add a task'
            value={draft}
          />
          <button className='task-form__button' type='submit'>
            Add
          </button>
        </form>

        <ul className='task-list' aria-label='Tasks'>
          {tasks.length === 0 ? (
            <li className='empty-state'>No tasks yet.</li>
          ) : (
            tasks.map((task) => (
              <li className='task-row' key={task.id}>
                <label>
                  <input
                    checked={task.completed}
                    onChange={() =>{  setTasks((current) => toggleTask(current, task.id)); }}
                    type='checkbox'
                  />
                  <span data-completed={task.completed}>{task.title}</span>
                </label>
              </li>
            ))
          )}
        </ul>

        <footer className='workspace__footer'>
          <button
            className='secondary-button'
            disabled={completedCount === 0}
            onClick={() =>{  setTasks((current) => clearCompletedTasks(current)); }}
            type='button'
          >
            Clear completed
          </button>
          <button
            className='secondary-button'
            disabled={tasks.length === 0}
            onClick={() =>{  setTasks([]); }}
            type='button'
          >
            Reset
          </button>
        </footer>
      </section>
    </main>
  )
}
