<script setup>
import WebSiteList from '../components/WebSiteList.vue'
import axios from 'axios'
</script>

<template>
  <div class="container">
    <button @click="logout">Logout</button>
    <WebSiteList :items="items" :borrar="borrar" :modificar="modificarSitio" />
    <button class="btn" @click="guardarSitio">Agregar Sitio</button>
  </div>
</template>

<script>
export default {
  async created() {
    const result = await axios.get('http://[::1]:3000/sitios')
    const sitios = result.data
    this.items = sitios
  },
  data() {
    return {
      url: 'http://[::1]:3000/sitios/',
      items: [],
    }
  },
  methods: {
    logout() {
      this.$auth0.logout({
        logoutParams: {
          returnTo: "http://localhost:5173/login"
        }
      });
    },
    guardarSitio() {
      this.$router.push('/guardar');
    },
    borrar(id) {
      axios.delete(this.url + id).then(response => {
        console.log('Solicitud DELETE exitosa');
        console.log('Respuesta del servidor:', response.data);
        this.items = this.items.filter((item) => {
          return item.id != id
        })
      }).catch(error => {
        console.error('Error en la solicitud DELETE:', error);
      });
    },
    modificarSitio(id) {
      this.$router.push('/modificar/' + id)
    }
  }
}
</script>

<style>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.btn {
  background-color: rgb(0, 153, 255);
  width: 200px;
  height: 50px;
  color: white;
  font-weight: bolder;
  border: 1px solid black;
  font-family: Arial, Helvetica, sans-serif;
}
</style>