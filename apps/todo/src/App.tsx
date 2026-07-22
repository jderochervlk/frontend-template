import React from 'react'

import { TaskActions } from './TaskActions.js'
import { TaskForm } from './TaskForm.js'
import { TaskHeader } from './TaskHeader.js'
import { TaskList } from './TaskList.js'
import { browserTaskBoardDependencies, useTaskBoard } from './use-task-board.js'

const APP_NAME = 'task-board'

const App = (): React.JSX.Element => {
  const taskBoard = useTaskBoard(browserTaskBoardDependencies)

  return (
    <main className='app-shell' data-app={APP_NAME}>
      <section className='workspace'>
        <TaskHeader activeCount={taskBoard.activeCount} completedCount={taskBoard.completedCount} />
        <TaskForm
          draft={taskBoard.draft}
          onDraftChange={taskBoard.handleDraftChange}
          onSubmit={taskBoard.handleSubmit}
        />
        <TaskList onToggle={taskBoard.handleTaskToggle} tasks={taskBoard.tasks} />
        <TaskActions
          completedCount={taskBoard.completedCount}
          onClear={taskBoard.handleCompletedClear}
          onReset={taskBoard.handleReset}
          taskCount={taskBoard.tasks.length}
        />
      </section>
    </main>
  )
}

export { App, APP_NAME }
