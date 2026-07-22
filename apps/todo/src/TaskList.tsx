import React from 'react'

import { taskCopy } from './task-copy.js'
import type { Task, TaskId } from './task.js'
import { TaskItem } from './TaskItem.js'

type TaskListProps = Readonly<{
  onToggle: (id: TaskId) => void
  tasks: readonly Task[]
}>

const TaskList = ({ onToggle, tasks }: TaskListProps): React.JSX.Element => {
  if (tasks.length === 0) {
    return (
      <ul aria-label={taskCopy.taskListLabel} className='task-list'>
        <li className='empty-state'>{taskCopy.noTasks}</li>
      </ul>
    )
  }

  return (
    <ul aria-label={taskCopy.taskListLabel} className='task-list'>
      {tasks.map((task) => (
        <TaskItem key={task.id.value} onToggle={onToggle} task={task} />
      ))}
    </ul>
  )
}

export { TaskList, type TaskListProps }
