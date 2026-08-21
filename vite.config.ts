import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  const isDevelopmentServer = command === 'serve' && mode === 'development'

  return {
    base: isDevelopmentServer ? '/' : '/PaginaClienteJabones/',
    plugins: [react()],
  }
})
