import React from 'react'

import type { Task, TaskId } from './task.js'
import { TaskItemLabel } from './TaskItemLabel.js'

type TaskItemProps = Readonly<{
  onToggle: (id: TaskId) => void
  task: Task
}>

const TaskItem = ({ onToggle, task }: TaskItemProps): React.JSX.Element => (
  <li className='task-row'>
    <TaskItemLabel onToggle={onToggle} task={task} />
  </li>
)

export { TaskItem, type TaskItemProps }
