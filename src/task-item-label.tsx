import React from 'react'
import type { Task } from './lib/tasks.js'

type TaskItemLabelProps = Readonly<{
  onToggle: (event: Readonly<React.ChangeEvent<HTMLInputElement>>) => void
  task: Task
}>

const TaskItemLabel = ({ onToggle, task }: TaskItemLabelProps): React.JSX.Element => (
  <label>
    <input checked={task.completed} onChange={onToggle} type='checkbox' value={task.id} />
    <span data-completed={task.completed}>{task.title}</span>
  </label>
)

export { TaskItemLabel, type TaskItemLabelProps }
