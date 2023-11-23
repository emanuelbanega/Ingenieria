<script setup>
import WebSiteList from '../components/WebSiteList.vue'
import axios from 'axios'
</script>

<template>
  <div class="container">
    <h1 id="titulo">{{ items.length == 0 ? "No hay sitios registrados" : "Your sites" }}</h1>
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
      isAuthenticated: this.$auth0.isAuthenticated,
    }
  },
  methods: {
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
  margin-top: 20px;
}

#titulo {
    text-align: left;
    width: 100%;
    margin-left: 20px;
    color: white;
    text-shadow: 4px 4px 4px black;
}
</style>