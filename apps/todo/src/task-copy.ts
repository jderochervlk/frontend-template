const taskCopy = {
  add: 'Add',
  clearCompleted: 'Clear completed',
  noTasks: 'No tasks yet.',
  reset: 'Reset',
  starterApp: 'Starter app',
  taskBoard: 'Task board',
  taskInputLabel: 'Task title',
  taskInputPlaceholder: 'Add a task',
  taskListLabel: 'Tasks',
} as const

type TaskStatusCopyInput = Readonly<{
  activeCount: number
  completedCount: number
}>

const getTaskStatusCopy = (input: TaskStatusCopyInput): string =>
  `${input.activeCount} open, ${input.completedCount} done`

export { getTaskStatusCopy, taskCopy }
