type Task = Readonly<{
  id: string
  title: string
  completed: boolean
}>

const makeId = (): string => crypto.randomUUID()

const addTask = (tasks: readonly Task[], title: string): Task[] => [
  {
    completed: false,
    id: makeId(),
    title,
  },
  ...tasks,
]

const toggleTask = (tasks: readonly Task[], id: string): Task[] =>
  tasks.map((task) => {
    if (task.id === id) {
      return {
        completed: !task.completed,
        id: task.id,
        title: task.title,
      }
    }

    return task
  })

const clearCompletedTasks = (tasks: readonly Task[]): Task[] =>
  tasks.filter((task) => !task.completed)

export { addTask, clearCompletedTasks, type Task, toggleTask }
