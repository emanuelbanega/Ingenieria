<template>
    <form>
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
        <button @click="guardar">Guardar</button>
        <button @click="cancel">Cancelar</button>
    </form>
</template>

<script>
export default {
    created(){
        console.log(this.object)
    },
    props: ["action","object","cancelar"],
    methods: {
        guardar(e) {
            e.preventDefault()
            this.action()
        },
        cancel(e){
            e.preventDefault()
            this.cancelar()
        }
    },
    data() {
        return {
            item:this.object
        }
    }
}
</script>

<style>
form {
    width: 300px;
    padding: 16px;
    border-radius: 10px;
    margin: auto;
    background-color: #ccc;
}
form label {
    width: 72px;
    font-weight: bold;
    display: inline-block;
}
form input[type="text"],
form input[type="number"]{
    width: 180px;
    padding: 3px 10px;
    border: 1px solid #f6f6f6;
    border-radius: 3px;
    background-color: #f6f6f6;
    margin: 8px 0;
    display: inline-block;
}
button {
    cursor: pointer;
}
</style>