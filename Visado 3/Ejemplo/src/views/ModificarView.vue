<script setup>
import WebSiteForm from '../components/WebSiteForm.vue'
import axios from 'axios'
</script>

<template>
    <h1 v-if="this.item == null">Cargando...</h1>
    <WebSiteForm v-if="this.item != null" :action="modificar" :object="item" :cancelar="cancelar" />
</template>

<script>
export default {
    async created() {
        const { data } = await axios.get(this.url + this.$route.params.id)
        this.item = data
    },
    data() {
        return {
            url: 'http://[::1]:3000/sitios/',
            item: null,
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
        modificar() {
            axios.put(this.url + this.item.id, this.item).then(response => {
                console.log('Solicitud PUT exitosa');
                console.log('Respuesta del servidor:', response.data);
                this.$router.push('/')
            }).catch(error => {
                console.error('Error en la solicitud PUT:', error);
            });
        }
    }
}
</script>