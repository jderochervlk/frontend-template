const TASK_TITLE_MAX_LENGTH = 120

type TaskId = Readonly<{
  _tag: 'TaskId'
  value: string
}>

type TaskTitle = Readonly<{
  _tag: 'TaskTitle'
  value: string
}>

type ActiveTask = Readonly<{
  _tag: 'ActiveTask'
  id: TaskId
  title: TaskTitle
}>

type CompletedTask = Readonly<{
  _tag: 'CompletedTask'
  id: TaskId
  title: TaskTitle
}>

type Task = ActiveTask | CompletedTask
type TaskStatus = Task['_tag']

type TaskCreationInput = Readonly<{
  id: string
  status: TaskStatus
  title: string
}>

type TaskCreated = Readonly<{
  _tag: 'TaskCreated'
  task: Task
}>

type InvalidTaskId = Readonly<{
  _tag: 'InvalidTaskId'
  value: string
}>

type InvalidTaskTitle = Readonly<{
  _tag: 'InvalidTaskTitle'
  reason: 'Empty' | 'TooLong'
  value: string
}>

type TaskCreationResult = InvalidTaskId | InvalidTaskTitle | TaskCreated

type ValidTaskInput = Readonly<{
  id: TaskId
  status: TaskStatus
  title: TaskTitle
}>

const createTaskId = (value: string): InvalidTaskId | TaskId => {
  const normalizedValue = value.trim()

  if (normalizedValue === '') {
    return { _tag: 'InvalidTaskId', value }
  }

  return { _tag: 'TaskId', value: normalizedValue }
}

const createTaskTitle = (value: string): InvalidTaskTitle | TaskTitle => {
  const normalizedValue = value.trim()

  if (normalizedValue === '') {
    return { _tag: 'InvalidTaskTitle', reason: 'Empty', value }
  }

  if (normalizedValue.length > TASK_TITLE_MAX_LENGTH) {
    return { _tag: 'InvalidTaskTitle', reason: 'TooLong', value }
  }

  return { _tag: 'TaskTitle', value: normalizedValue }
}

const createValidTask = (input: ValidTaskInput): Task => {
  if (input.status === 'ActiveTask') {
    return { _tag: 'ActiveTask', id: input.id, title: input.title }
  }

  return { _tag: 'CompletedTask', id: input.id, title: input.title }
}

const createTask = (input: TaskCreationInput): TaskCreationResult => {
  const id = createTaskId(input.id)
  const { _tag: idTag } = id
  if (idTag === 'InvalidTaskId') {
    return id
  }

  const title = createTaskTitle(input.title)
  const { _tag: titleTag } = title
  if (titleTag === 'InvalidTaskTitle') {
    return title
  }

  return { _tag: 'TaskCreated', task: createValidTask({ id, status: input.status, title }) }
}

const addTask = (tasks: readonly Task[], task: Task): readonly Task[] => [task, ...tasks]

const toggleTaskState = (task: Task): Task => {
  const { _tag: taskTag } = task
  if (taskTag === 'ActiveTask') {
    return { _tag: 'CompletedTask', id: task.id, title: task.title }
  }

  return { _tag: 'ActiveTask', id: task.id, title: task.title }
}

const toggleTask = (tasks: readonly Task[], id: TaskId): readonly Task[] =>
  tasks.map((task) => (task.id.value === id.value ? toggleTaskState(task) : task))

const clearCompletedTasks = (tasks: readonly Task[]): readonly Task[] =>
  tasks.filter(({ _tag: taskTag }) => taskTag === 'ActiveTask')

const countCompletedTasks = (tasks: readonly Task[]): number =>
  tasks.filter(({ _tag: taskTag }) => taskTag === 'CompletedTask').length

const isTaskCompleted = ({ _tag: taskTag }: Task): boolean => taskTag === 'CompletedTask'

export {
  addTask,
  clearCompletedTasks,
  countCompletedTasks,
  createTask,
  isTaskCompleted,
  TASK_TITLE_MAX_LENGTH,
  type Task,
  type TaskCreationInput,
  type TaskCreationResult,
  type TaskId,
  toggleTask,
}
