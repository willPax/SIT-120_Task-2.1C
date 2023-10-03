import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//import App2 from './App2.vue'


const app = createApp(App)

app.use(router)

app.mount('#app')

// const app2 = createApp(App2)

// app2.use(router)

// app2.mount('#app2')

// import crApp from './crApp.vue'

// const crapp = createApp(crApp)

// crapp.use(router)

// crapp.mount('#crapp')




