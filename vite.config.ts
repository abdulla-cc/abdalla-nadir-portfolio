import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base matches the GitHub Pages URL: https://abdulla-cc.github.io/abdalla-nadir-portfolio/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/abdalla-nadir-portfolio/',
})
