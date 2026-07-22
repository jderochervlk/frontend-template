import React from 'react'
import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import { App } from '../App.js'
import { taskCopy } from '../task-copy.js'
import { STORAGE_KEY } from '../task-storage.js'

const ACTIVE_STORED_TASKS = '[{"completed":false,"id":"stored-task","title":"Stored task"}]'

test('task workflow starts empty with unavailable task actions', async () => {
  localStorage.clear()
  const screen = await render(React.createElement(App))

  await expect.element(screen.getByText(taskCopy.noTasks)).toBeVisible()
  await expect.element(screen.getByRole('button', { name: taskCopy.clearCompleted })).toBeDisabled()
  await expect.element(screen.getByRole('button', { name: taskCopy.reset })).toBeDisabled()
})

test('task workflow ignores blank submissions', async () => {
  localStorage.clear()
  const screen = await render(React.createElement(App))
  const input = screen.getByLabelText(taskCopy.taskInputLabel)

  await input.fill('   ')
  await screen.getByRole('button', { name: taskCopy.add }).click()

  await expect.element(screen.getByText(taskCopy.noTasks)).toBeVisible()
})

test('task workflow adds and persists a trimmed task', async () => {
  localStorage.clear()
  const screen = await render(React.createElement(App))
  const input = screen.getByLabelText(taskCopy.taskInputLabel)

  await input.fill(' Write browser test ')
  await screen.getByRole('button', { name: taskCopy.add }).click()

  await expect.element(screen.getByText('Write browser test')).toBeVisible()
  await expect.element(screen.getByText('1 open, 0 done')).toBeVisible()
  await expect.element(input).toHaveValue('')
  expect(localStorage.getItem(STORAGE_KEY)).toContain('Write browser test')
})

test('task workflow completes and clears a stored task', async () => {
  localStorage.setItem(STORAGE_KEY, ACTIVE_STORED_TASKS)
  const screen = await render(React.createElement(App))
  const clearButton = screen.getByRole('button', { name: taskCopy.clearCompleted })

  await screen.getByRole('checkbox', { name: 'Stored task' }).click()
  await expect.element(screen.getByText('0 open, 1 done')).toBeVisible()
  await expect.element(clearButton).toBeEnabled()

  await clearButton.click()

  await expect.element(screen.getByText(taskCopy.noTasks)).toBeVisible()
  expect(localStorage.getItem(STORAGE_KEY)).toBe('[]')
})

test('task workflow resets stored active tasks', async () => {
  localStorage.setItem(STORAGE_KEY, ACTIVE_STORED_TASKS)
  const screen = await render(React.createElement(App))
  const resetButton = screen.getByRole('button', { name: taskCopy.reset })

  await expect.element(resetButton).toBeEnabled()
  await resetButton.click()

  await expect.element(screen.getByText(taskCopy.noTasks)).toBeVisible()
})
