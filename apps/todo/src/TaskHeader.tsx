import React from 'react'

import { getTaskStatusCopy, taskCopy } from './task-copy.js'

type TaskHeaderProps = Readonly<{
  activeCount: number
  completedCount: number
}>

const TaskHeader = ({ activeCount, completedCount }: TaskHeaderProps): React.JSX.Element => (
  <header className='workspace__header'>
    <div>
      <p className='eyebrow'>{taskCopy.starterApp}</p>
      <h1>{taskCopy.taskBoard}</h1>
    </div>
    <p className='workspace__status'>{getTaskStatusCopy({ activeCount, completedCount })}</p>
  </header>
)

export { TaskHeader, type TaskHeaderProps }
