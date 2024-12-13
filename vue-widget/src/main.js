import { createApp } from 'vue'
import { createPinia } from 'pinia'
import MyWidget from './App.vue'

let app

export function mount(container, props) {
  const pinia = createPinia()

  if (app) {
    app.unmount()
  }

  app = createApp(MyWidget, { tasks: props.tasks })
  app.use(pinia)
  app.mount(container)
}

export function unmount(container) {
  if (app) {
    app.unmount()
    container.innerHTML = ''
    app = null
  }
}
