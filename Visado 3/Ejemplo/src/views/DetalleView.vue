<template>
    <h1 v-if="this.item == null">Cargando...</h1>
    <div v-if="this.item != null">
        <label>Nombre:</label>
        <input name="name" type="text" id="name" v-model="item.name" />
        <label>URL:</label>
        <input name="url" type="text" id="url" v-model="item.url">
        <label>Niveles:</label>
        <input name="levels" type="number" id="levels" v-model="item.levels">
        <label>Frecuencia:</label>
        <input name="frequency" type="number" id="frequency" v-model="item.frequency">
        <label>Extractor:</label>
        <input name="extractor" type="text" id="extractor" v-model="item.extractor">
    </div>
</template>
<script>
import axios from 'axios'
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
    }
}
</script>