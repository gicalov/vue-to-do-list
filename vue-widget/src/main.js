import { createApp } from 'vue'
import { createPinia } from 'pinia'
import MyWidget from './App.vue'

const app = createApp(MyWidget)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')

export function mount(container) {
  const app = createApp(MyWidget)
  const pinia = createPinia()
  app.use(pinia)
  app.mount(container)
}

export function unmount(container) {
  const app = container.__vue_app__
  if (app) {
    app.unmount()
    container.innerHTML = ''
  }
}
