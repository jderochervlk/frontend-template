const taskCopy = Object.freeze({
  add: 'Add',
  clearCompleted: 'Clear completed',
  done: ' done',
  noTasks: 'No tasks yet.',
  open: ' open, ',
  reset: 'Reset',
  starterApp: 'Starter app',
  taskBoard: 'Task board',
})

type TaskCopy = Readonly<typeof taskCopy>

export { taskCopy, type TaskCopy }
