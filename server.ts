import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'

// build on startup
await Bun.build({
  entrypoints: ['./src/index.tsx'],
  outdir: './public/js',
  minify: false, // faster build for dev
  naming: "app.js",
});
console.log("Build complete!");

const app = new Hono()

app.use('/*', serveStatic({ root: './public' }))
app.use('/js/*', serveStatic({ root: './public/js' }))

export default {
  port: 3000,
  fetch: app.fetch,
}
