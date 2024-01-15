<template>
    <h1 v-if="this.items == null">Cargando...</h1>
    <ul v-if="this.items != null">
        <li v-for="item in items">
            <p>Fecha: {{item.date}}</p>
            <p>Estado: {{item.state}}</p>
            <p>Contenido: {{item.content }}</p>
        </li>
    </ul>
</template>
<script>
import axios from 'axios'
export default {
    async created() {
        const { data } = await axios.get(this.url + this.$route.params.id)
        this.items = data
    },
    data() {
        return {
            url: 'http://[::1]:3000/corridas/sitio/',
            items: null,
        }
    }
}
</script>