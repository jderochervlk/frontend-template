export type Task = Readonly<{
  id: string
  title: string
  completed: boolean
}>

function makeId() {
  return crypto.randomUUID()
}

export function addTask(tasks: readonly Task[], title: string): Task[] {
  return [
    {
      completed: false,
      id: makeId(),
      title,
    },
    ...tasks,
  ]
}

export function toggleTask(tasks: readonly Task[], id: string): Task[] {
  return tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
}

export function clearCompletedTasks(tasks: readonly Task[]): Task[] {
  return tasks.filter((task) => !task.completed)
}
