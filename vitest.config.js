import { defineConfig } from 'vitest/config'
import { resolve } from 'path'
import { createVuePlugin } from 'vite-plugin-vue'
import graphql from '@rollup/plugin-graphql'

export default defineConfig({
  plugins: [createVuePlugin(/* options */), graphql()],
  test: {
    include: ['tests/**/?(*.)+(spec|test).+(ts|tsx|js)'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.{idea,git,cache,output,temp}/**',
    ],
    globals: true,
    environment: 'jsdom',
    alias: [{ find: /^vue$/, replacement: 'vue/dist/vue.runtime.common.js' }],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
      '~': resolve(__dirname, './'),
    },
  },
})
