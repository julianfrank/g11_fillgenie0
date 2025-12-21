import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'

const app = new Hono()

app.use('/*', serveStatic({ root: './public' }))
app.use('/js/*', serveStatic({ root: './public/js' }))

export default {
  port: 3000,
  fetch: app.fetch,
}
