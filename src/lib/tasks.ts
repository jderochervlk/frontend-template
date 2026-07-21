export type Task = Readonly<{
  id: string
  title: string
  completed: boolean
}>

const makeId = (): string => crypto.randomUUID()

export const addTask = (tasks: readonly Task[], title: string): Task[] => {
  return [
    {
      completed: false,
      id: makeId(),
      title,
    },
    ...tasks,
  ]
}

export const toggleTask = (tasks: readonly Task[], id: string): Task[] => {
  return tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
}

export const clearCompletedTasks = (tasks: readonly Task[]): Task[] => {
  return tasks.filter((task) => !task.completed)
}
