import React from 'react'
import { taskCopy } from './lib/task-copy.js'
import type { Task } from './lib/tasks.js'
import { TaskItem } from './TaskItem.js'

type TaskListProps = Readonly<{
  onToggle: (event: Readonly<React.ChangeEvent<HTMLInputElement>>) => void
  tasks: readonly Task[]
}>

const TaskList = ({ onToggle, tasks }: TaskListProps): React.JSX.Element => {
  if (tasks.length === 0) {
    return (
      <ul aria-label='Tasks' className='task-list'>
        <li className='empty-state'>{taskCopy.noTasks}</li>
      </ul>
    )
  }

  return (
    <ul aria-label='Tasks' className='task-list'>
      {tasks.map((task) => (
        <TaskItem key={task.id} onToggle={onToggle} task={task} />
      ))}
    </ul>
  )
}

export { TaskList, type TaskListProps }
