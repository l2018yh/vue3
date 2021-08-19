import { resolve } from "path" //配置路径别名
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx"
import styleImport from "vite-plugin-style-import"

// https://vitejs.dev/config/
export default ({ mode }) => // vite配置文件中环境变量可以以如下方式取到
  defineConfig({
    plugins: [
      vue(),
      vueJsx(),
      styleImport({
        libs: [
          {
            libraryName: "element-plus",
            esModule: true,
            ensureStyleFile: true,
            resolveStyle: (name) => {
              return `element-plus/lib/theme-chalk/${name}.css`
            },
            resolveComponent: (name) => {
              return `element-plus/lib/${name}`
            }
          }
        ]
      })
    ],
  // base: mode === "development" ? "/" : "./",  //环境打包路径配置，避免生产环境打包出现白屏
  //自定义端口
  // server: {
  //   port:5000
  // }
  resolve: {
    alias: {
      "@": resolve(__dirname, "/src")
    }
  }
})
