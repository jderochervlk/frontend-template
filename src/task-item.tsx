import React from 'react'
import type { Task } from './lib/tasks.js'
import { TaskItemLabel } from './task-item-label.js'

type TaskItemProps = Readonly<{
  onToggle: (event: Readonly<React.ChangeEvent<HTMLInputElement>>) => void
  task: Task
}>

const TaskItem = ({ onToggle, task }: TaskItemProps): React.JSX.Element => (
  <li className='task-row'>
    <TaskItemLabel onToggle={onToggle} task={task} />
  </li>
)

export { TaskItem, type TaskItemProps }
