import type { TaskLoadResult } from './task-storage.js'
import {
  addTask,
  clearCompletedTasks,
  countCompletedTasks,
  createTask,
  toggleTask,
} from './task.js'
import type { Task, TaskId } from './task.js'

type TaskBoardState = Readonly<{
  draft: string
  tasks: readonly Task[]
}>

type CompletedTasksCleared = Readonly<{ _tag: 'CompletedTasksCleared' }>
type DraftChanged = Readonly<{ _tag: 'DraftChanged'; value: string }>
type TaskBoardReset = Readonly<{ _tag: 'TaskBoardReset' }>
type TaskSubmitted = Readonly<{ _tag: 'TaskSubmitted'; id: string }>
type TaskToggled = Readonly<{ _tag: 'TaskToggled'; id: TaskId }>

type TaskDraftAction = DraftChanged | TaskSubmitted
type TaskListAction = CompletedTasksCleared | TaskBoardReset | TaskToggled
type TaskBoardAction = TaskDraftAction | TaskListAction

const initializeTaskBoard = (result: TaskLoadResult): TaskBoardState => {
  const { _tag: resultTag } = result
  return { draft: '', tasks: resultTag === 'TasksLoaded' ? result.tasks : [] }
}

const submitTask = (state: TaskBoardState, id: string): TaskBoardState => {
  const result = createTask({ id, status: 'ActiveTask', title: state.draft })

  const { _tag: resultTag } = result
  if (resultTag !== 'TaskCreated') {
    return state
  }

  return { draft: '', tasks: addTask(state.tasks, result.task) }
}

const isTaskDraftAction = (action: TaskBoardAction): action is TaskDraftAction => {
  const { _tag: actionTag } = action
  return actionTag === 'DraftChanged' || actionTag === 'TaskSubmitted'
}

const reduceTaskDraft = (state: TaskBoardState, action: TaskDraftAction): TaskBoardState => {
  const { _tag: actionTag } = action

  if (actionTag === 'DraftChanged') {
    return { draft: action.value, tasks: state.tasks }
  }

  return submitTask(state, action.id)
}

const reduceTaskList = (state: TaskBoardState, action: TaskListAction): TaskBoardState => {
  const { _tag: actionTag } = action

  if (actionTag === 'TaskToggled') {
    return { draft: state.draft, tasks: toggleTask(state.tasks, action.id) }
  }

  if (actionTag === 'CompletedTasksCleared') {
    return { draft: state.draft, tasks: clearCompletedTasks(state.tasks) }
  }

  if (actionTag === 'TaskBoardReset') {
    return { draft: state.draft, tasks: [] }
  }

  const exhaustiveAction: never = action
  return exhaustiveAction
}

const taskBoardReducer = (state: TaskBoardState, action: TaskBoardAction): TaskBoardState =>
  isTaskDraftAction(action) ? reduceTaskDraft(state, action) : reduceTaskList(state, action)

const getCompletedCount = (state: TaskBoardState): number => countCompletedTasks(state.tasks)

const getActiveCount = (state: TaskBoardState): number =>
  state.tasks.length - getCompletedCount(state)

export {
  getActiveCount,
  getCompletedCount,
  initializeTaskBoard,
  type TaskBoardAction,
  taskBoardReducer,
  type TaskBoardState,
}
