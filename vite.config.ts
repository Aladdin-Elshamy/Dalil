// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'; // Import path module if using aliases

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Example path alias setup (matches tsconfig.json)
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})