import React from 'react'
import { taskCopy } from './lib/task-copy.js'

type TaskActionsProps = Readonly<{
  completedCount: number
  hasTasks: boolean
  onClear: () => void
  onReset: () => void
}>

const TaskActions = ({ completedCount, hasTasks, onClear, onReset }: TaskActionsProps): React.JSX.Element => (
  <footer className='workspace__footer'>
    <button className='secondary-button' disabled={completedCount === 0} onClick={onClear} type='button'>
      {taskCopy.clearCompleted}
    </button>
    <button className='secondary-button' disabled={!hasTasks} onClick={onReset} type='button'>
      {taskCopy.reset}
    </button>
  </footer>
)

export { TaskActions, type TaskActionsProps }
