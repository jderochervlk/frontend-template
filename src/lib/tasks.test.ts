import { describe, expect, it } from 'vitest';
import { addTask, clearCompletedTasks, toggleTask } from './tasks.js';
import type { Task } from './tasks.js';


const baseTasks: Task[] = [
  { completed: false, id: '1', title: 'Ship scaffold' },
  { completed: true, id: '2', title: 'Check linting' },
]

describe('task helpers', () => {
  it('adds a new task to the front of the list', () => {expect.hasAssertions();
    const tasks = addTask(baseTasks, 'Write tests')

    expect(tasks[0]?.title).toBe('Write tests')
    expect(tasks).toHaveLength(3)
  })

  it('toggles task completion', () => {expect.hasAssertions();
    const tasks = toggleTask(baseTasks, '1')

    expect(tasks[0]?.completed).toBe(true)
    expect(tasks[1]?.completed).toBe(true)
  })

  it('removes completed tasks', () => {expect.hasAssertions();
    const tasks = clearCompletedTasks(baseTasks)

    expect(tasks).toStrictEqual([{ completed: false, id: '1', title: 'Ship scaffold' }])
  })
})
