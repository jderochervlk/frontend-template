import React from 'react'

import { taskCopy } from './task-copy.js'
import { TASK_TITLE_MAX_LENGTH } from './task.js'

type TaskFormProps = Readonly<{
  draft: string
  onDraftChange: (value: string) => void
  onSubmit: () => void
}>

const createDraftChangeHandler =
  (
    onDraftChange: TaskFormProps['onDraftChange'],
  ): ((event: Readonly<React.ChangeEvent<HTMLInputElement>>) => void) =>
  (event: Readonly<React.ChangeEvent<HTMLInputElement>>): void => {
    onDraftChange(event.target.value)
  }

const createSubmitHandler =
  (
    onSubmit: TaskFormProps['onSubmit'],
  ): ((event: Readonly<React.SyntheticEvent<HTMLFormElement>>) => void) =>
  (event: Readonly<React.SyntheticEvent<HTMLFormElement>>): void => {
    event.preventDefault()
    onSubmit()
  }

const TaskForm = ({ draft, onDraftChange, onSubmit }: TaskFormProps): React.JSX.Element => (
  <form className='task-form' onSubmit={createSubmitHandler(onSubmit)}>
    <input
      aria-label={taskCopy.taskInputLabel}
      className='task-form__input'
      maxLength={TASK_TITLE_MAX_LENGTH}
      name='title'
      onChange={createDraftChangeHandler(onDraftChange)}
      placeholder={taskCopy.taskInputPlaceholder}
      value={draft}
    />
    <button className='task-form__button' type='submit'>
      {taskCopy.add}
    </button>
  </form>
)

export { TaskForm, type TaskFormProps }
