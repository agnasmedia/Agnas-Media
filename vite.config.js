/* eslint-env node */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { handleContactHttpRequest } from './server/sendContactEmail.js'

function contactApiPlugin(env) {
  Object.assign(process.env, env)

  const attach = (server) => {
    server.middlewares.use((req, res, next) => {
      if (!req.url?.startsWith('/api/contact')) {
        next()
        return
      }
      handleContactHttpRequest(req, res)
    })
  }

  return {
    name: 'contact-api',
    configureServer: attach,
    configurePreviewServer: attach,
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), contactApiPlugin(env)],
  }
})
