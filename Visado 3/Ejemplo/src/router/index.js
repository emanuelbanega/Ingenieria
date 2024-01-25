import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import GuardarView from '../views/GuardarView.vue'
import ModificarView from '../views/ModificarView.vue'
import DetalleView from '../views/DetalleView.vue'
import CorridasView from '../views/CorridasView.vue'
import RealizarBusquedaView from '../views/RealizarBusquedaView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/guardar',
      name: 'guardar',
      component: GuardarView,
    },
    {
      path: '/modificar/:id',
      name: 'modificar',
      component: ModificarView,
    },
    {
      path: '/detalle/:id',
      name: 'detalle',
      component: DetalleView,
    },
    {
      path: '/corrida/:id',
      name: 'corrida',
      component: CorridasView,
    },
    {
      path: '/busqueda/:id',
      name: 'busqueda',
      component: RealizarBusquedaView,
    }
  ]
})

export default router
