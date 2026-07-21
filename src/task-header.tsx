import React from 'react'
import { taskCopy } from './lib/task-copy.js'
import { HeaderTitle } from './header-title.js'

type TaskHeaderProps = Readonly<{
  activeCount: number
  completedCount: number
}>

const TaskHeader = ({ activeCount, completedCount }: TaskHeaderProps): React.JSX.Element => (
  <header className='workspace__header'>
    <HeaderTitle />
    <p className='workspace__status'>
      {activeCount}
      {taskCopy.open}
      {completedCount}
      {taskCopy.done}
    </p>
  </header>
)

export { TaskHeader, type TaskHeaderProps }
