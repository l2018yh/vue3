
import App from './App.jsx'
import store from '@/store'
import router from "@/router"
import { createApp } from 'vue'
import "element-plus/lib/theme-chalk/index.css"


const app = createApp(App)
app.use(router).use(store).mount("#app");
