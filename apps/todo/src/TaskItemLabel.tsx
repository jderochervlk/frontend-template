import React from 'react'

import { isTaskCompleted } from './task.js'
import type { Task, TaskId } from './task.js'

type TaskItemLabelProps = Readonly<{
  onToggle: (id: TaskId) => void
  task: Task
}>

const createToggleHandler =
  (input: TaskItemLabelProps): ((event: Readonly<React.ChangeEvent<HTMLInputElement>>) => void) =>
  (): void => {
    input.onToggle(input.task.id)
  }

const TaskItemLabel = ({ onToggle, task }: TaskItemLabelProps): React.JSX.Element => (
  <label>
    <input
      checked={isTaskCompleted(task)}
      onChange={createToggleHandler({ onToggle, task })}
      type='checkbox'
    />
    <span data-completed={isTaskCompleted(task)}>{task.title.value}</span>
  </label>
)

export { TaskItemLabel, type TaskItemLabelProps }
