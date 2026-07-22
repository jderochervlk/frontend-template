import { HttpApiBuilder } from '@effect/platform'
import { layerContext } from '@effect/platform-node/NodeHttpServer'
import { Layer } from 'effect'

import { apiLive } from './api.js'

type ApiWebHandler = Readonly<{
  dispose: () => Promise<void>
  handler: (request: Request) => Promise<Response>
}>

const apiWebLayer = Layer.mergeAll(apiLive, layerContext)

const makeApiWebHandler = (): ApiWebHandler => HttpApiBuilder.toWebHandler(apiWebLayer)

export { type ApiWebHandler, makeApiWebHandler }
