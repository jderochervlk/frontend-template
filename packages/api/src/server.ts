import { createServer } from 'node:http'

import { HttpApiBuilder, HttpServer } from '@effect/platform'
import { layer as nodeHttpServerLayer } from '@effect/platform-node/NodeHttpServer'
import { runMain as executeMain } from '@effect/platform-node/NodeRuntime'
import type { ServeError } from '@effect/platform/HttpServerError'
import { Config, Effect, Layer } from 'effect'
import type { ConfigError } from 'effect/ConfigError'

import { apiLive } from './api.js'

type ServerConfig = Readonly<{
  host: string
  port: number
}>

const serverConfig: Config.Config<ServerConfig> = Config.all({
  host: Config.string('HOST').pipe(Config.withDefault('127.0.0.1')),
  port: Config.integer('PORT').pipe(Config.withDefault(3000)),
})

const makeServerLayer = (config: ServerConfig): Layer.Layer<never, ServeError> =>
  HttpApiBuilder.serve().pipe(
    Layer.provide(apiLive),
    HttpServer.withLogAddress,
    Layer.provide(nodeHttpServerLayer(createServer, config)),
  )

const serverProgram: Effect.Effect<never, ConfigError | ServeError> = serverConfig.pipe(
  Effect.flatMap((config) => Layer.launch(makeServerLayer(config))),
)

const main = (): void => {
  executeMain(serverProgram)
}

if (process.argv.length > 1) {
  main()
}
