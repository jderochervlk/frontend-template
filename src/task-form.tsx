import React from 'react'
import { taskCopy } from './lib/task-copy.js'

type TaskFormProps = Readonly<{
  draft: string
  onChange: (event: Readonly<React.ChangeEvent<HTMLInputElement>>) => void
  onSubmit: (event: Readonly<React.SyntheticEvent<HTMLFormElement>>) => void
}>

const TaskForm = ({ draft, onChange, onSubmit }: TaskFormProps): React.JSX.Element => (
  <form className='task-form' onSubmit={onSubmit}>
    <input
      aria-label='Task title'
      className='task-form__input'
      maxLength={120}
      name='title'
      onChange={onChange}
      placeholder='Add a task'
      value={draft}
    />
    <button className='task-form__button' type='submit'>
      {taskCopy.add}
    </button>
  </form>
)

export { TaskForm, type TaskFormProps }
