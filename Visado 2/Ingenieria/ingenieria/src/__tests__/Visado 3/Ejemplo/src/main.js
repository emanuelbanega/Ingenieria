import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createAuth0 } from '@auth0/auth0-vue';


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(
    createAuth0({
      domain: "dev-6mrr42sp8ur65gmt.us.auth0.com",
      clientId: "dbxsmZI1kFzNTeHyrlUy7pmgqvFKbNVT",
      authorizationParams: {
        redirect_uri: "http://127.0.0.1:5173/"
      }
    })
);

app.mount('#app')
