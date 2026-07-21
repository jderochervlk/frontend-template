import React from 'react'
import { TaskActions } from './TaskActions.js'
import { TaskForm } from './TaskForm.js'
import { TaskHeader } from './TaskHeader.js'
import { TaskList } from './TaskList.js'
import { useTaskBoard } from './lib/use-task-board.js'

const APP_NAME = 'task-board'

const App = (): React.JSX.Element => {
  const taskBoard = useTaskBoard()

  return (
    <main className='app-shell'>
      <section className='workspace'>
        <TaskHeader activeCount={taskBoard.activeCount} completedCount={taskBoard.completedCount} />
        <TaskForm
          draft={taskBoard.draft}
          onChange={taskBoard.handleDraftChange}
          onSubmit={taskBoard.handleSubmit}
        />
        <TaskList onToggle={taskBoard.handleToggle} tasks={taskBoard.tasks} />
        <TaskActions
          completedCount={taskBoard.completedCount}
          hasTasks={taskBoard.tasks.length > 0}
          onClear={taskBoard.handleClear}
          onReset={taskBoard.handleReset}
        />
      </section>
    </main>
  )
}

export { App, APP_NAME }
