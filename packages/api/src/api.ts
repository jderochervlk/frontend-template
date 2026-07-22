import { HttpApi, HttpApiBuilder, HttpApiEndpoint, HttpApiGroup } from '@effect/platform'
import { Effect, Layer } from 'effect'
import { Literal as literal, Struct as struct } from 'effect/Schema'

const healthResponseSchema = struct({
  status: literal('ok'),
})

const healthResponse = {
  status: 'ok',
} as const

const healthEndpoint = HttpApiEndpoint.get('getHealth', '/health').addSuccess(healthResponseSchema)

const healthGroup = HttpApiGroup.make('health').add(healthEndpoint)

const api = HttpApi.make('codexApi').add(healthGroup)

const healthHandlers = HttpApiBuilder.group(api, 'health', (handlers) =>
  handlers.handle(
    'getHealth',
    (): Effect.Effect<typeof healthResponse> => Effect.succeed(healthResponse),
  ),
)

const apiLive = HttpApiBuilder.api(api).pipe(Layer.provide(healthHandlers))

export { api, apiLive }
