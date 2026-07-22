import React from 'react'

import { taskCopy } from './task-copy.js'

type TaskActionsProps = Readonly<{
  completedCount: number
  onClear: () => void
  onReset: () => void
  taskCount: number
}>

const TaskActions = ({
  completedCount,
  onClear,
  onReset,
  taskCount,
}: TaskActionsProps): React.JSX.Element => (
  <footer className='workspace__footer'>
    <button
      className='secondary-button'
      disabled={completedCount === 0}
      onClick={onClear}
      type='button'
    >
      {taskCopy.clearCompleted}
    </button>
    <button className='secondary-button' disabled={taskCount === 0} onClick={onReset} type='button'>
      {taskCopy.reset}
    </button>
  </footer>
)

export { TaskActions, type TaskActionsProps }
