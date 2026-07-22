import { expect, onTestFinished, test } from 'vitest'

import { makeApiWebHandler } from '../api-handler.js'

test('get /health returns the schema-defined healthy response', async () => {
  const api = makeApiWebHandler()
  onTestFinished(async () => {
    await api.dispose()
  })

  const response = await api.handler(new Request('http://localhost/health'))

  expect(response.status).toBe(200)
  expect(response.headers.get('content-type')).toBe('application/json')
  await expect(response.text()).resolves.toBe('{"status":"ok"}')
})

test('unknown routes return not found without failing the handler', async () => {
  const api = makeApiWebHandler()
  onTestFinished(async () => {
    await api.dispose()
  })

  const response = await api.handler(new Request('http://localhost/unknown'))

  expect(response.status).toBe(404)
})
