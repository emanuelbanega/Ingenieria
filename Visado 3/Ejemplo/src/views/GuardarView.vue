<script setup>
import WebSiteForm from '../components/WebSiteForm.vue'
import axios from 'axios'
</script>

<template>
    <WebSiteForm :action="guardar" :object="item" :cancelar="cancelar" />
</template>

<script>
export default {
  data() {
    return {
      url: 'http://[::1]:3000/sitios/',
      item: {
        name: "",
        url: "",
        levels: 1,
        frequency: 1,
        extractor: "function ext(){}"
      }
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
    cancelar() {
      this.$router.push('/')
    },
    guardar() {
      axios.post(this.url, this.item).then(response => {
        console.log('Solicitud POST exitosa');
        console.log('Respuesta del servidor:', response.data);
        this.$router.push('/')
      }).catch(error => {
        console.error('Error en la solicitud POST:', error);
      });
    },
  }
}
</script>