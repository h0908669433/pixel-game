import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/pixel-game/', // 修正 GitHub Pages 404 資源載入問題
  build: {
    cssMinify: 'esbuild', // 避免 lightningcss 解析 nes.css 時因語法不嚴謹報錯
  }
})
