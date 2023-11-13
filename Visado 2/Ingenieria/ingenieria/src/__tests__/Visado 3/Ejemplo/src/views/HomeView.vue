<script setup>
import WebSiteList from '../components/WebSiteList.vue'
import WebSiteForm from '../components/WebSiteForm.vue'
</script>

<template>
  <div class="container">
    <button @click="logout">Logout</button>
    <WebSiteList :items="items" :borrar="borrar" :modificar="habilitarModificacion" />
    <WebSiteForm v-if="puedoAgregar" :action="guardar" :object="item" :cancelar="cancelarAgregar"/>
    <WebSiteForm v-if="itemToModify != null" :action="modificar" :object="itemToModify" :cancelar="cancelarModificar"/>
    <button class="btn" v-if="!puedoAgregar" @click="habilitarAgregar">Agregar Sitio</button>
  </div>

</template>

<script>
export default {
  data() {
    return {
      puedoAgregar:false,
      items: [
        {
          id: "1",
          nombre: "youtube",
          url: "www.youtube.com",
          niveles: 2,
          frecuencia: 2,
          extractor: "fucntion ext(){}"
        }
      ],
      item: {
        id: "",
        nombre: "",
        url: "",
        niveles: 1,
        frecuencia: 1,
        extractor: "fucntion ext(){}"
      },
      itemToModify: null
    }
  },
  methods: {
    logout() {
        this.$auth0.logout({ 
          logoutParams: { 
            returnTo: "http://127.0.0.1:5173/login"
          } 
        });
    },
    cancelarAgregar(){
      this.puedoAgregar = false
    },
    cancelarModificar(){
      this.itemToModify = null
    },
    habilitarAgregar(){
      this.puedoAgregar = true
    },
    guardar() {
      const newSite = {
        id: this.items.length + 1,
        ...this.item
      }
      this.items.push(newSite)
      this.puedoAgregar = false
    },
    borrar(id) {
      this.items = this.items.filter(item => item.id != id)
    },
    habilitarModificacion(item) {
      this.itemToModify = { ...item }
    },
    modificar() {
      let index;
      this.items.forEach((item, i) => {
        if (item.id == this.itemToModify.id) {
          index = i
        }
      })
      this.items[index] = this.itemToModify
      this.itemToModify = null
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