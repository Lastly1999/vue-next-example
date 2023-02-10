import { fileURLToPath, URL } from "node:url"

import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import Unocss from "unocss/vite"
import { presetUno, presetAttributify, presetIcons } from "unocss"
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers"

const readEnvConfig = (mode: string) => {
  return loadEnv(mode, __dirname)
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = readEnvConfig(mode)

  return {
    plugins: [
      vue(),
      vueJsx(),
      Unocss({
        presets: [presetUno(), presetAttributify(), presetIcons()],
      }),
      AutoImport({
        resolvers: [AntDesignVueResolver()],
      }),
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
    ],
    server: {
      cors: true,
      open: true,
      proxy: {
        [env.VITE_APP_BASE_PROXY_URL]: {
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  }
})
