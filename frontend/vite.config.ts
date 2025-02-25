// vite.config.ts
import react from "@vitejs/plugin-react"
import path from "path"
import type { ConfigEnv, UserConfig } from 'vite'
import { defineConfig, loadEnv } from "vite"

export default ({ mode }: ConfigEnv): UserConfig => {
  // Load env file based on `mode` in the current directory
  const env = loadEnv(mode, process.cwd())
  
  return defineConfig({
    server: {
      proxy: {
        "/api": env.VITE_API_ENDPOINT
      }
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  })
}