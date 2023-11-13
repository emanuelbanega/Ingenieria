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
      domain: "dev-a3zjrjqo5pdi2knp.us.auth0.com",
      clientId: "HVlzv9Wb0ucPuNQRqjyqXBqlEyDBPpY9",
      authorizationParams: {
        redirect_uri: "http://localhost:5173/"
      }
    })
);

app.mount('#app')
